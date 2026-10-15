/* ==========================================================================
   MHR — Logo
   --------------------------------------------------------------------------
   A logo definitiva está em assets/img/media/:

     logo.svg       lettering claro (silver/branco) — para fundos escuros
     logo-dark.svg  lettering escuro (grafite)      — para o header claro

   `brand({ light: true })` usa a variante clara (footer e menu mobile, ambos
   sobre fundo escuro). Sem `light`, usa a variante escura (header claro).
   ========================================================================== */
(function (MHR) {
  'use strict';

  var DEFAULT_LIGHT = 'assets/img/media/logo.svg';
  var DEFAULT_DARK = 'assets/img/media/logo-dark.svg';

  /* Editável pelo painel: MHR.site.logo = { light, dark }
     (fallback = os arquivos padrão acima) */
  function logoPath(light) {
    var cfg = (MHR.site && MHR.site.logo) || {};
    var value = light ? cfg.light : cfg.dark;
    if (typeof value === 'string' && value) return value;
    return light ? DEFAULT_LIGHT : DEFAULT_DARK;
  }

  function brand(options) {
    var opts = options || {};
    var site = MHR.site;
    var src = logoPath(!!opts.light);

    return (
      '<a class="brand' +
      (opts.light ? ' brand--light' : '') +
      '" href="' +
      MHR.dom.esc(opts.href || 'index.html') +
      '" aria-label="' +
      MHR.dom.esc(site.name) +
      '">' +
      '<img class="brand__logo" src="' +
      src +
      '" alt="" width="265" height="105" decoding="async">' +
      '</a>'
    );
  }

  MHR.components = MHR.components || {};
  MHR.components.logo = { brand: brand };
})((window.MHR = window.MHR || {}));
