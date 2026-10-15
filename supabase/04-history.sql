-- ==========================================================================
-- MHR — 04-history.sql
-- Histórico de alterações + "Desfazer" seguro do painel.
-- Rode este arquivo DEPOIS de 01-schema.sql (e antes ou depois de 03-seed.sql;
-- a ordem não importa aqui).  É idempotente: pode rodar mais de uma vez.
--
-- O que faz:
--   * cria a tabela public.content_history (auditoria);
--   * um gatilho guarda o estado ANTERIOR de cada coleção a cada UPDATE em
--     public.content — com data e usuário;
--   * a função public.content_undo(...) restaura um estado anterior,
--     SOMENTE para membros do site (mesma regra RLS do painel);
--   * o histórico só é visível/restaurável por membros do site.
--
-- Nada aqui apaga dados existentes. Nenhuma credencial é incluída.
-- ==========================================================================

-- --------------------------------------------------------------------------
-- 1. Tabela de histórico
-- --------------------------------------------------------------------------
create table if not exists public.content_history (
  id         bigserial   primary key,
  site_slug  text        not null,
  key        text        not null,
  payload    jsonb       not null,
  created_at timestamptz not null default now(),
  created_by uuid
);

comment on table public.content_history is
  'Estado ANTERIOR de cada coleção de conteúdo, gravado a cada alteração (auditoria / desfazer).';

create index if not exists content_history_site_key_idx
  on public.content_history (site_slug, key, created_at desc);

-- --------------------------------------------------------------------------
-- 2. Gatilho: grava o estado anterior antes de cada UPDATE
--    (SECURITY DEFINER: roda como dono da tabela, então grava mesmo com RLS
--     ligado — a RLS continua valendo para quem usa o painel.)
-- --------------------------------------------------------------------------
create or replace function public.record_content_history()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'UPDATE' and old.payload is distinct from new.payload then
    insert into public.content_history (site_slug, key, payload, created_by)
    values (old.site_slug, old.key, old.payload, auth.uid());
  end if;
  return new;
end;
$$;

drop trigger if exists content_history_capture on public.content;
create trigger content_history_capture
  after update on public.content
  for each row execute function public.record_content_history();

-- --------------------------------------------------------------------------
-- 3. RLS: histórico visível apenas a membros do site
--    (sem política de INSERT/UPDATE/DELETE: só o gatilho escreve)
-- --------------------------------------------------------------------------
alter table public.content_history enable row level security;

drop policy if exists history_select_members on public.content_history;
create policy history_select_members on public.content_history
  for select
  to authenticated
  using (public.is_site_member(site_slug));

grant select on public.content_history to authenticated;

-- --------------------------------------------------------------------------
-- 4. RPC de desfazer: restaura o payload de uma entrada do histórico.
--    - exige que o usuário seja membro do site (senão erro 42501);
--    - só restaura entradas do MESMO site;
--    - a própria restauração passa pelo gatilho e fica registrada no histórico.
-- --------------------------------------------------------------------------
create or replace function public.content_undo(p_site text, p_history_id bigint)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_key     text;
  v_payload jsonb;
begin
  if not public.is_site_member(p_site) then
    raise exception 'not a member of site %', p_site using errcode = '42501';
  end if;

  select key, payload into v_key, v_payload
  from public.content_history
  where id = p_history_id and site_slug = p_site;

  if v_key is null then
    raise exception 'history entry % not found for site %', p_history_id, p_site
      using errcode = 'P0002';
  end if;

  insert into public.content (site_slug, key, payload)
  values (p_site, v_key, v_payload)
  on conflict (site_slug, key) do update set payload = excluded.payload;

  return jsonb_build_object(
    'ok', true,
    'key', v_key,
    'restored_history_id', p_history_id
  );
end;
$$;

grant execute on function public.content_undo(text, bigint) to authenticated;
