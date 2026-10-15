/* ==========================================================================
   MHR — ponto de entrada
   --------------------------------------------------------------------------
   Cada componente só renderiza se o marcador correspondente existir na
   página. Assim o mesmo bundle atende todas as páginas sem custo extra.
   ========================================================================== */
(function (MHR) {
  'use strict';

  var c = MHR.components;

  /* Um componente com problema (ex.: conteúdo incompleto vindo do painel) não
     pode derrubar o restante da página: cada bloco é renderizado isolado. */
  function safe(label, fn) {
    try {
      fn();
    } catch (error) {
      if (window.console && typeof console.warn === 'function') {
        console.warn('[MHR] falha ao renderizar ' + label, error);
      }
    }
  }

  function boot() {
    safe('header', function () {
      c.header.render();
      c.header.init();
    });

    safe('footer', function () {
      c.footer.render();
      c.footer.init();
    });

    safe('pillars', function () {
      c.pillars.render();
    });

    safe('carousel', function () {
      c.carousel.render();
      c.carousel.init();
    });

    safe('services', function () {
      c.services.renderPreview();
      c.services.renderDetail();
    });

    safe('segments', function () {
      c.segments.render();
      c.segments.renderDetail();
    });

    safe('engineering', function () {
      c.engineering.renderFlow();
      c.engineering.renderDeliverables();
      c.engineering.renderResponsibility();
    });

    safe('contact', function () {
      c.contact.render();
      c.contact.renderFormOptions();
      c.contact.initForm();
    });

    safe('reveal', function () {
      MHR.reveal.init();
    });
  }

  function start() {
    /* Se o carregamento remoto (Supabase) existir, espera ele terminar antes de
       renderizar. Em qualquer falha — ou se estiver desabilitado — o loader
       mantém os dados locais, então o site nunca fica em branco. */
    var ready =
      MHR.content && typeof MHR.content.load === 'function'
        ? MHR.content.load()
        : Promise.resolve(false);

    ready.then(boot, boot);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})((window.MHR = window.MHR || {}));
