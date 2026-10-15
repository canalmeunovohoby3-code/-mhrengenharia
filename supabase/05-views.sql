-- ==========================================================================
-- MHR — 05-views.sql
-- Contador de VISUALIZAÇÕES DE PÁGINA (page views) — eventos reais.
-- Rode este arquivo DEPOIS de 01-schema.sql.  É idempotente.
--
-- MÉTRICA: "visualizações de página". NÃO é contagem de visitantes únicos.
--   - Cada carregamento de uma página pública conta 1 visualização.
--   - O painel (/admin/) NÃO é contado.
--   - Sem números iniciais, sem valores fictícios, sem incremento aleatório.
--   - A contagem só existe a partir da aplicação deste arquivo.
--
-- POLÍTICA (implementada em track_view):
--   * deduplicação: mesma sessão + mesmo caminho dentro de 30 minutos = 1;
--   * o navegador também evita reenvio na mesma sessão (sessionStorage);
--   * limite brando por sessão (24h) para reduzir abuso trivial;
--   * caminhos técnicos (admin/assets/supabase/tools) são ignorados;
--   * só aceita um site que já exista em public.content.
--
-- SEGURANÇA:
--   * escrita apenas pela função SECURITY DEFINER track_view (nada de INSERT
--     genérico para anon/authenticated);
--   * leitura das métricas agregadas apenas por membros do site (RPC
--     views_summary exige is_site_member);
--   * a tabela crua não é legível pelo público (RLS sem política para anon).
-- Nenhuma credencial é incluída. Nada apaga dados existentes.
-- ==========================================================================

-- --------------------------------------------------------------------------
-- 1. Tabela de eventos
-- --------------------------------------------------------------------------
create table if not exists public.page_views (
  id         bigserial   primary key,
  site_slug  text        not null,
  path       text        not null,
  session_id uuid        not null,
  viewed_at  timestamptz not null default now()
);

comment on table public.page_views is
  'Eventos de visualização de página. Métrica = page views (não visitantes únicos).';

create index if not exists page_views_site_time_idx
  on public.page_views (site_slug, viewed_at desc);

create index if not exists page_views_dedupe_idx
  on public.page_views (site_slug, session_id, path, viewed_at desc);

-- --------------------------------------------------------------------------
-- 2. RLS: leitura crua apenas por membros do site; escrita só pela RPC
-- --------------------------------------------------------------------------
alter table public.page_views enable row level security;

drop policy if exists views_select_members on public.page_views;
create policy views_select_members on public.page_views
  for select
  to authenticated
  using (public.is_site_member(site_slug));

grant select on public.page_views to authenticated;

-- --------------------------------------------------------------------------
-- 3. RPC pública de registro (chamada pelo site com a chave anon)
-- --------------------------------------------------------------------------
create or replace function public.track_view(p_site text, p_path text, p_session uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_path   text;
  v_recent integer;
begin
  if p_site is null or length(p_site) = 0 or length(p_site) > 100 then
    return jsonb_build_object('ok', false, 'reason', 'invalid_site');
  end if;
  if p_session is null then
    return jsonb_build_object('ok', false, 'reason', 'invalid_session');
  end if;

  -- Só registra para um site que exista de fato em public.content.
  if not exists (select 1 from public.content c where c.site_slug = p_site) then
    return jsonb_build_object('ok', false, 'reason', 'unknown_site');
  end if;

  v_path := coalesce(nullif(trim(p_path), ''), '/');
  v_path := split_part(v_path, '?', 1);
  v_path := split_part(v_path, '#', 1);
  if v_path !~ '^/' then v_path := '/' || v_path; end if;
  if length(v_path) > 200 then v_path := left(v_path, 200); end if;

  if v_path ~* '^/(admin|assets|supabase|tools)(/|$)' then
    return jsonb_build_object('ok', false, 'reason', 'ignored_path');
  end if;

  -- Deduplicação: mesma sessão + mesmo caminho na última meia hora.
  if exists (
    select 1 from public.page_views v
    where v.site_slug = p_site
      and v.session_id = p_session
      and v.path = v_path
      and v.viewed_at > now() - interval '30 minutes'
  ) then
    return jsonb_build_object('ok', true, 'counted', false);
  end if;

  -- Limite brando por sessão nas últimas 24h (anti-abuso trivial).
  select count(*) into v_recent
  from public.page_views v
  where v.site_slug = p_site
    and v.session_id = p_session
    and v.viewed_at > now() - interval '24 hours';

  if v_recent >= 500 then
    return jsonb_build_object('ok', false, 'reason', 'rate_limited');
  end if;

  insert into public.page_views (site_slug, path, session_id)
  values (p_site, v_path, p_session);

  return jsonb_build_object('ok', true, 'counted', true);
end;
$$;

grant execute on function public.track_view(text, text, uuid) to anon, authenticated;

-- --------------------------------------------------------------------------
-- 4. RPC de estatísticas (somente membros do site)
-- --------------------------------------------------------------------------
create or replace function public.views_summary(p_site text, p_days integer default 30)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_days   integer;
  v_result jsonb;
begin
  if not public.is_site_member(p_site) then
    raise exception 'not a member of site %', p_site using errcode = '42501';
  end if;

  v_days := least(greatest(coalesce(p_days, 30), 1), 365);

  select jsonb_build_object(
    'site_slug', p_site,
    'metric', 'page_views',
    'period_days', v_days,
    'total', count(*),
    'today', count(*) filter (where v.viewed_at >= date_trunc('day', now())),
    'last_7', count(*) filter (where v.viewed_at >= now() - interval '7 days'),
    'last_30', count(*) filter (where v.viewed_at >= now() - interval '30 days'),
    'first_view', min(v.viewed_at),
    'last_view', max(v.viewed_at),
    'by_path', coalesce((
      select jsonb_agg(t order by t.views desc)
      from (
        select v2.path, count(*) as views
        from public.page_views v2
        where v2.site_slug = p_site
          and v2.viewed_at >= now() - (v_days || ' days')::interval
        group by v2.path
      ) t
    ), '[]'::jsonb),
    'by_day', coalesce((
      select jsonb_agg(d order by d.day)
      from (
        select to_char(v2.viewed_at::date, 'YYYY-MM-DD') as day, count(*) as views
        from public.page_views v2
        where v2.site_slug = p_site
          and v2.viewed_at >= now() - (v_days || ' days')::interval
        group by v2.viewed_at::date
      ) d
    ), '[]'::jsonb)
  ) into v_result
  from public.page_views v
  where v.site_slug = p_site
    and v.viewed_at >= now() - (v_days || ' days')::interval;

  return v_result;
end;
$$;

grant execute on function public.views_summary(text, integer) to authenticated;
