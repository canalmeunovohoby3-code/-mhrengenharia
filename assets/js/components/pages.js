/* ==========================================================================
   MHR — Conteúdo de página (aplica os textos editáveis do painel)
   --------------------------------------------------------------------------
   Procura elementos marcados com `data-copy` / `data-copy-list` e escreve
   neles o valor correspondente de `MHR.pageContent` (padrão local, já
   sobrescrito pelo que veio do Supabase, quando disponível).

   - `data-copy="pagina.grupo.campo"`          -> texto simples (textContent)
   - `data-copy-list="pagina.grupo.campo"`     -> lista; cada item vira um
       elemento filho. Atributos opcionais:
         data-copy-tag="li|span"   (padrão: li)
         data-copy-class="classe"  (classe aplicada a cada item)

   SEGURANÇA: usa textContent (nunca innerHTML), então nada do painel é
   interpretado como HTML. Se um valor não existir, o elemento permanece com
   o texto que já está no HTML (reserva) — o site nunca fica em branco.
   ========================================================================== */
(function (MHR) {
  'use strict';

  function getPath(obj, path) {
    return path.split('.').reduce(function (acc, key) {
      return acc == null ? undefined : acc[key];
    }, obj);
  }

  function applyText() {
    var nodes = document.querySelectorAll('[data-copy]');
    Array.prototype.forEach.call(nodes, function (node) {
      var value = getPath(MHR.pageContent || {}, node.getAttribute('data-copy') || '');
      if (typeof value === 'string' && value.length) {
        node.textContent = value;
      }
    });
  }

  function applyList() {
    var nodes = document.querySelectorAll('[data-copy-list]');
    Array.prototype.forEach.call(nodes, function (node) {
      var value = getPath(MHR.pageContent || {}, node.getAttribute('data-copy-list') || '');
      if (!Array.isArray(value) || !value.length) return;

      var tag = (node.getAttribute('data-copy-tag') || 'li').toLowerCase();
      var cls = node.getAttribute('data-copy-class') || '';
      var frag = document.createDocumentFragment();

      value.forEach(function (text) {
        var item = document.createElement(tag);
        if (cls) item.className = cls;
        item.textContent = String(text);
        frag.appendChild(item);
      });

      node.textContent = '';
      node.appendChild(frag);
    });
  }

  function render() {
    applyText();
    applyList();
  }

  MHR.components = MHR.components || {};
  MHR.components.pages = { render: render };
})((window.MHR = window.MHR || {}));
