/* ==========================================================================
   MHR — Contador de visitas (eventos REAIS, opcional e não bloqueante)
   --------------------------------------------------------------------------
   REGISTRA: visualizações de página (page views) das páginas PÚBLICAS do site.

     - NÃO são "visitantes únicos": a métrica é contagem de visualizações.
     - Não há números iniciais, nem valores fictícios, nem incremento aleatório.
     - A contagem começa a existir a partir do momento em que este arquivo é
       publicado E a migração `supabase/05-views.sql` é aplicada. Antes disso,
       não há nada para exibir (o painel mostra "sem dados").

   POLÍTICA DE CONTAGEM (documentada também em supabase/05-views.sql):
     - Cada carregamento de uma página pública conta 1 visualização.
     - Recarregar a MESMA página na MESMA sessão do navegador não conta de
       novo: o navegador guarda, por sessão (sessionStorage), quais caminhos
       já foram enviados; o servidor ainda deduplica a mesma sessão+caminho
       numa janela de 30 minutos (defesa extra).
     - Sessão = uma aba/janela do navegador (sessionStorage). Abrir de novo
       depois de fechar conta como nova visualização.
     - Páginas do painel (/admin/) NÃO são contadas.

   PRIVACIDADE: envia apenas o slug do site, o caminho da página e um
   identificador de sessão aleatório (sem cookies, sem IP, sem dados pessoais).

   RESILIÊNCIA: tudo é "fire-and-forget". Se o serviço estiver fora do ar,
   lento ou desabilitado, o carregamento do site NÃO é afetado.
   ========================================================================== */
(function (MHR) {
  'use strict';

  var cfg = (MHR && MHR.supabase) || {};
  var MAX_PER_SESSION = 40; /* trava simples contra abuso acidental */

  function enabled() {
    return (
      cfg.enabled === true &&
      typeof cfg.url === 'string' &&
      cfg.url.length > 0 &&
      typeof cfg.anonKey === 'string' &&
      cfg.anonKey.length > 0 &&
      typeof cfg.siteSlug === 'string' &&
      cfg.siteSlug.length > 0
    );
  }

  /* Caminho normalizado: sem query/hash; "/index.html" -> "/" */
  function currentPath() {
    var path = String(location.pathname || '/');
    if (path.length > 1) path = path.replace(/\/+$/, '') || '/';
    if (path === '/index.html') path = '/';
    return path;
  }

  function uuid() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return window.crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      var v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function sessionId() {
    try {
      var key = 'mhr.view.session';
      var id = window.sessionStorage.getItem(key);
      if (!id) {
        id = uuid();
        window.sessionStorage.setItem(key, id);
      }
      return id;
    } catch (e) {
      return uuid(); /* sessionStorage indisponível (modo restrito) */
    }
  }

  function alreadySent(path) {
    try {
      return window.sessionStorage.getItem('mhr.view.sent') === path ||
        (window.sessionStorage.getItem('mhr.view.sent.' + path) === '1');
    } catch (e) {
      return false;
    }
  }

  function markSent(path) {
    try {
      window.sessionStorage.setItem('mhr.view.sent.' + path, '1');
      var count = parseInt(window.sessionStorage.getItem('mhr.view.count') || '0', 10) + 1;
      window.sessionStorage.setItem('mhr.view.count', String(count));
      return count;
    } catch (e) {
      return 1;
    }
  }

  function track() {
    try {
      if (!enabled()) return;
      var path = currentPath();
      /* O painel nunca é contado como visita pública. */
      if (/^\/admin(\/|$)/.test(path) || /(^|\/)admin(\/|$)/.test(path)) return;
      if (alreadySent(path)) return;

      if (markSent(path) > MAX_PER_SESSION) return;

      var base = String(cfg.url).replace(/\/+$/, '');
      var url = base + '/rest/v1/rpc/track_view';
      var body = JSON.stringify({
        p_site: cfg.siteSlug,
        p_path: path,
        p_session: sessionId(),
      });

      var headers = { apikey: cfg.anonKey, 'Content-Type': 'application/json' };
      if (/^eyJ/.test(cfg.anonKey)) headers.Authorization = 'Bearer ' + cfg.anonKey;

      fetch(url, { method: 'POST', headers: headers, body: body, keepalive: true }).catch(function () {
        /* silencioso: métrica não pode afetar o site */
      });
    } catch (e) {
      /* nunca propaga erro para o carregamento da página */
    }
  }

  MHR.views = { track: track };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', track);
  } else {
    track();
  }
})((window.MHR = window.MHR || {}));
