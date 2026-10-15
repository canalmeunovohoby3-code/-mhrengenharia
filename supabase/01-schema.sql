-- ==========================================================================
-- MHR — 01-schema.sql
-- Tabelas + políticas de segurança (RLS) do conteúdo editável.
-- Rode este arquivo ANTES de 02-storage.sql e 03-seed.sql.
--
-- Modelo: uma linha por COLEÇÃO (services, segments, banners, engineering,
-- site, pillars, footer, logo). O `payload` é exatamente o formato que o site
-- já usa hoje, então o site não precisa de nenhuma conversão.
--
-- Multi-cliente: cada linha é identificada por `site_slug`. A escrita só é
-- permitida a usuários que estejam cadastrados em `site_members` para aquele
-- site — ou seja, um cliente nunca edita dados de outro.
-- ==========================================================================

-- --------------------------------------------------------------------------
-- 1. Conteúdo
-- --------------------------------------------------------------------------
create table if not exists public.content (
  site_slug  text        not null,
  key        text        not null,
  payload    jsonb       not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid        default auth.uid(),
  primary key (site_slug, key)
);

comment on table public.content is 'Conteúdo editável do site (uma linha por coleção).';

create index if not exists content_key_idx on public.content (key);

-- --------------------------------------------------------------------------
-- 2. Quem pode editar cada site (associação usuário -> site)
-- --------------------------------------------------------------------------
create table if not exists public.site_members (
  user_id    uuid        not null references auth.users (id) on delete cascade,
  site_slug  text        not null,
  created_at timestamptz not null default now(),
  primary key (user_id, site_slug)
);

comment on table public.site_members is 'Usuários autorizados a editar cada site.';

-- --------------------------------------------------------------------------
-- 3. Função auxiliar: o usuário logado é membro deste site?
--    SECURITY DEFINER evita recursão de RLS ao consultar site_members.
-- --------------------------------------------------------------------------
create or replace function public.is_site_member(p_site text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.site_members m
    where m.user_id = auth.uid()
      and m.site_slug = p_site
  );
$$;

-- --------------------------------------------------------------------------
-- 4. updated_at / updated_by automáticos
-- --------------------------------------------------------------------------
create or replace function public.touch_content()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end;
$$;

drop trigger if exists content_touch on public.content;
create trigger content_touch
  before insert or update on public.content
  for each row execute function public.touch_content();

-- --------------------------------------------------------------------------
-- 5. RLS
-- --------------------------------------------------------------------------
alter table public.content      enable row level security;
alter table public.site_members enable row level security;

-- Leitura: pública (o site público busca o conteúdo com a chave anon).
drop policy if exists content_select_public on public.content;
create policy content_select_public on public.content
  for select
  to anon, authenticated
  using (true);

-- Escrita: apenas membros do site correspondente.
drop policy if exists content_write_members on public.content;
create policy content_write_members on public.content
  for all
  to authenticated
  using (public.is_site_member(site_slug))
  with check (public.is_site_member(site_slug));

-- site_members: cada usuário vê apenas a própria associação.
-- (A inclusão de membros é feita por você, no SQL Editor, com privilégio de admin.)
drop policy if exists members_select_self on public.site_members;
create policy members_select_self on public.site_members
  for select
  to authenticated
  using (user_id = auth.uid());

-- --------------------------------------------------------------------------
-- 6. Permissões (o PostgREST usa os papéis anon/authenticated)
-- --------------------------------------------------------------------------
grant select on public.content to anon, authenticated;
grant insert, update, delete on public.content to authenticated;
grant select on public.site_members to authenticated;
grant execute on function public.is_site_member(text) to anon, authenticated;
