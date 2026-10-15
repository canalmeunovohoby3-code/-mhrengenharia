/* ==========================================================================
   MHR — Carregamento remoto do conteúdo (Supabase) com fallback local
   --------------------------------------------------------------------------
   Lê a tabela `content` (uma linha por coleção) e injeta nos mesmos objetos
   que o site já usa (`MHR.site`, `MHR.services`, `MHR.segments`, ...).

   REGRA DE OURO: se QUALQUER coisa falhar — `enabled` desligado, URL/chave
   ausente, offline, RLS, timeout — o site mantém os dados locais de
   `assets/js/data/*.js`. O site nunca fica em branco.

   Depende de: supabase.config.js e dos arquivos de dados locais.
   ========================================================================== */
(function (MHR) {
  'use strict';

  var cfg = MHR.supabase || {};

  /* Coleções que o painel pode gerenciar na tabela `content` */
  var COLLECTIONS = [
    'site',
    'banners',
    'services',
    'segments',
    'engineering',
    'pillars',
    'footer',
    'logo',
    'pages',
  ];

  /* Mescla profunda: preserva chaves locais que o banco não trouxer
     (usado para `site`, `engineering` e `pages`). */
  function deepMerge(base, patch) {
    if (patch == null) return base;
    if (Array.isArray(base) || Array.isArray(patch)) return patch;
    if (typeof base !== 'object' || typeof patch !== 'object') return patch;
    var out = {};
    Object.keys(base).forEach(function (k) { out[k] = base[k]; });
    Object.keys(patch).forEach(function (k) {
      out[k] = k in base ? deepMerge(base[k], patch[k]) : patch[k];
    });
    return out;
  }

  function isEnabled() {
    return (
      cfg.enabled === true &&
      typeof cfg.url === 'string' &&
      cfg.url.length > 0 &&
      typeof cfg.anonKey === 'string' &&
      cfg.anonKey.length > 0
    );
  }

  /* fetch com timeout (Promise.race manual para compatibilidade) */
  function fetchWithTimeout(url, options, ms) {
    return new Promise(function (resolve, reject) {
      var settled = false;
      var timer = setTimeout(function () {
        if (settled) return;
        settled = true;
        reject(new Error('timeout'));
      }, ms || 6000);

      fetch(url, options).then(
        function (res) {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          resolve(res);
        },
        function (err) {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          reject(err);
        }
      );
    });
  }

  /* Aplica uma coleção no formato que os componentes já consomem */
  function applyCollection(key, payload) {
    if (key === 'pillars') {
      MHR.site = MHR.site || {};
      MHR.site.pillars = payload;
      return;
    }
    if (key === 'footer' || key === 'logo') {
      MHR.site = MHR.site || {};
      MHR.site[key] = payload;
      return;
    }
    if (key === 'pages') {
      /* Mescla por página/grupo: o que o painel não enviar continua local */
      MHR.pageContent = deepMerge(MHR.pageContent || {}, payload || {});
      return;
    }
    if (key === 'site' || key === 'engineering') {
      /* Mescla: preserva chaves locais que não existirem no banco */
      MHR[key] = Object.assign({}, MHR[key] || {}, payload || {});
      return;
    }
    /* banners, services, segments: arrays completos */
    MHR[key] = payload;
  }

  function load() {
    if (!isEnabled()) return Promise.resolve(false);

    var base = String(cfg.url).replace(/\/+$/, '');
    var url =
      base +
      '/rest/v1/content?site_slug=eq.' +
      encodeURIComponent(cfg.siteSlug) +
      '&select=key,payload';

    /* A chave pública pode ser a nova (`sb_publishable_...`) ou a antiga
       `anon` (JWT). As chaves novas NÃO são JWT: vão apenas no cabeçalho
       `apikey`. O `Authorization` só é enviado quando a chave é um JWT. */
    var headers = {
      apikey: cfg.anonKey,
      Accept: 'application/json',
    };
    if (/^eyJ/.test(cfg.anonKey)) {
      headers.Authorization = 'Bearer ' + cfg.anonKey;
    }

    var options = { headers: headers };

    return fetchWithTimeout(url, options, cfg.timeout)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (rows) {
        if (!Array.isArray(rows) || !rows.length) return false;
        var applied = 0;
        rows.forEach(function (row) {
          if (!row || typeof row.key !== 'string' || row.payload == null) return;
          if (COLLECTIONS.indexOf(row.key) === -1) return;
          applyCollection(row.key, row.payload);
          applied++;
        });
        return applied > 0;
      })
      .catch(function () {
        /* Offline, URL/chave errada, RLS, timeout... -> mantém o conteúdo local */
        return false;
      });
  }

  MHR.content = { load: load, isEnabled: isEnabled, collections: COLLECTIONS };
})(window.MHR = window.MHR || {});
