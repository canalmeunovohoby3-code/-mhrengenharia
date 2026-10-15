/* ==========================================================================
   MHR — Configuração do Supabase  (PREENCHA AQUI)
   --------------------------------------------------------------------------
   A chave `anon` é PÚBLICA por design — é ela que o site usa para LER o
   conteúdo. A chave `service_role` NUNCA deve ser colocada aqui (nem em
   qualquer arquivo do site): quem a tiver pode ignorar todas as políticas.

   Enquanto `enabled` for `false`, o site continua exatamente como está hoje,
   usando os dados locais de `assets/js/data/*.js` (fallback).

   Passo a passo completo: supabase/README.md
   ========================================================================== */
(function (MHR) {
  'use strict';

  MHR.supabase = {
    /* Project Settings → API → Project URL
       (termina em .supabase.co — NÃO inclua /rest/v1/) */
    url: 'https://jxfwpstrornifwsoynay.supabase.co',

    /* Chave PÚBLICA do projeto. Aceita os dois formatos:
         - nova:      sb_publishable_...
         - antiga:    anon (um JWT, começa com "eyJ")
       A chave secreta (sb_secret_... / service_role) NUNCA entra aqui. */
    anonKey: 'sb_publishable_FnIpYXa59Lkil7Yd3RD__w_cQ3hmr8O',

    /* Identificador deste site na tabela `content` (não alterar) */
    siteSlug: 'mhrengenharia',

    /* Bucket de imagens (não alterar) */
    bucket: 'site-images',

    /* false = usa os dados locais (site atual, sem rede)
       true  = carrega o conteúdo do Supabase (com fallback local em caso de erro)

       Está LIGADO: o conteúdo do Supabase foi conferido item a item e é
       idêntico ao site atual, então ligar não muda nada visualmente — apenas
       passa a refletir o que o cliente salvar no painel. Em qualquer falha
       (offline, timeout, RLS, tabela ausente) o site volta sozinho para os
       dados locais de assets/js/data/*.js (nunca fica em branco). */
    enabled: true,

    /* Tempo máximo (ms) da busca antes de cair no fallback local */
    timeout: 3000,
  };
})(window.MHR = window.MHR || {});
