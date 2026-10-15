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
       ex.: 'https://xxxxxxxxxxxxxxxx.supabase.co' */
    url: '',

    /* Project Settings → API → anon public */
    anonKey: '',

    /* Identificador deste site na tabela `content` (não alterar) */
    siteSlug: 'mhrengenharia',

    /* Bucket de imagens (não alterar) */
    bucket: 'site-images',

    /* false = usa os dados locais (site atual, sem rede)
       true  = carrega o conteúdo do Supabase (com fallback local em caso de erro) */
    enabled: false,

    /* Tempo máximo (ms) da busca antes de cair no fallback local */
    timeout: 6000,
  };
})(window.MHR = window.MHR || {});
