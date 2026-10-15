/* ==========================================================================
   MHR — Faixa institucional (assinatura corporativa / diferenciais)
   ========================================================================== */
(function (MHR) {
  'use strict';

  var dom = MHR.dom;
  var icon = MHR.icons.get;

  /* Valores padrão (usados quando não há dados vindos do painel) */
  var DEFAULT_PILLARS = [
    {
      icon: 'layers',
      title: 'Engenharia Industrial',
      text: 'Soluções completas para operações industriais.',
    },
    {
      icon: 'users',
      title: 'Equipe Técnica',
      text: 'Profissionais especializados em diferentes disciplinas.',
    },
    {
      icon: 'badge',
      title: 'Responsabilidade Técnica',
      text: 'Atuação com responsabilidade técnica e CREA/ART quando aplicável.',
    },
    {
      icon: 'shield',
      title: 'Segurança',
      text: 'Compromisso com normas e boas práticas de segurança.',
    },
  ];

  /* Editáveis pelo painel: MHR.site.pillars (fallback = DEFAULT_PILLARS) */
  function list() {
    var remote = MHR.site && MHR.site.pillars;
    return Array.isArray(remote) && remote.length ? remote : DEFAULT_PILLARS;
  }

  function render() {
    var mount = dom.qs('[data-pillars]');
    if (!mount) return;
    var pillars = list();
    mount.innerHTML =
      '<div class="container container--wide">' +
      '<div class="pillars__grid">' +
      pillars
        .map(function (pillar) {
          return (
            '<article class="pillar reveal">' +
            '<span class="pillar__icon">' +
            icon(pillar.icon) +
            '</span>' +
            '<h3 class="pillar__title">' +
            dom.esc(pillar.title) +
            '</h3>' +
            '<p class="pillar__text">' +
            dom.esc(pillar.text) +
            '</p>' +
            '</article>'
          );
        })
        .join('') +
      '</div>' +
      '</div>';
  }

  MHR.components = MHR.components || {};
  MHR.components.pillars = { render: render };
})((window.MHR = window.MHR || {}));
