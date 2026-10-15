-- ==========================================================================
-- MHR — 02-storage.sql
-- Bucket de imagens + políticas do Supabase Storage.
-- Rode DEPOIS de 01-schema.sql.
--
-- Convenção de caminho:  <site_slug>/<nome-do-arquivo>
--   ex.: mhrengenharia/servico-01.jpg
-- O primeiro segmento do caminho identifica o site, então as políticas usam
-- a função is_site_member() — um cliente não escreve na pasta de outro.
-- ==========================================================================

-- --------------------------------------------------------------------------
-- 1. Bucket público para leitura (escrita sempre autenticada)
-- --------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-images',
  'site-images',
  true,
  5242880, -- 5 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/x-icon']
)
on conflict (id) do update
  set public             = true,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- --------------------------------------------------------------------------
-- 2. Leitura
--    O bucket é público: as imagens são servidas pela URL pública
--    (/storage/v1/object/public/...) SEM passar por RLS — é assim que o site
--    exibe as fotos. A listagem/consulta pelo SDK fica restrita aos membros do
--    site, para que ninguém consiga enumerar os arquivos de outro cliente.
-- --------------------------------------------------------------------------
drop policy if exists "site_images_read" on storage.objects;
create policy "site_images_read" on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'site-images'
    and public.is_site_member(split_part(name, '/', 1))
  );

-- --------------------------------------------------------------------------
-- 3. Escrita/edição/exclusão apenas para membros do site (pasta = site_slug)
-- --------------------------------------------------------------------------
drop policy if exists "site_images_insert" on storage.objects;
create policy "site_images_insert" on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'site-images'
    and public.is_site_member(split_part(name, '/', 1))
  );

drop policy if exists "site_images_update" on storage.objects;
create policy "site_images_update" on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'site-images'
    and public.is_site_member(split_part(name, '/', 1))
  )
  with check (
    bucket_id = 'site-images'
    and public.is_site_member(split_part(name, '/', 1))
  );

drop policy if exists "site_images_delete" on storage.objects;
create policy "site_images_delete" on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'site-images'
    and public.is_site_member(split_part(name, '/', 1))
  );
