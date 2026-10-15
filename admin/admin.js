/* ==========================================================================
   MHR — Painel administrativo (/admin/)
   --------------------------------------------------------------------------
   Login (Supabase Auth) + edição do conteúdo da tabela `content` + upload de
   imagens (Supabase Storage).

   Segurança:
   - usa apenas a chave `anon` (a `service_role` nunca aparece aqui);
   - as políticas RLS garantem que este usuário só escreve no site dele;
   - todo texto é inserido no DOM via textContent/value (sem HTML injetado).

   Configuração: preencha ../assets/js/data/supabase.config.js
   Guia completo: ../supabase/README.md
   ========================================================================== */

/* --- Esquema das coleções (o que o painel exibe em cada aba) -------------- */
const SCHEMA = {
  services: {
    label: 'Serviços',
    hint: 'Uma ficha por serviço. "Destaque na Home" define quais aparecem na página inicial (hoje: 5).',
    kind: 'array',
    itemTitle: (it) => it.title || 'Serviço',
    fields: [
      { k: 'title', l: 'Título', t: 'text', full: true },
      { k: 'short', l: 'Resumo (usado na Home)', t: 'textarea', full: true },
      { k: 'scope', l: 'Escopo (usado na página Serviços)', t: 'textarea', full: true },
      { k: 'applications', l: 'Aplicações', t: 'text', full: true },
      { k: 'bullets', l: 'Itens do escopo (um por linha)', t: 'lines', full: true },
      { k: 'image', l: 'Imagem (4:3 — 1200×900)', t: 'image' },
      { k: 'imageAlt', l: 'Descrição da imagem', t: 'text' },
      { k: 'featured', l: 'Destaque na Home', t: 'bool' },
      { k: 'slug', l: 'Slug / âncora (evite alterar)', t: 'text' },
    ],
  },
  segments: {
    label: 'Segmentos',
    hint: 'Cards de "Onde a MHR atua" na Home e blocos da página Segmentos.',
    kind: 'array',
    itemTitle: (it) => it.title || 'Segmento',
    fields: [
      { k: 'title', l: 'Título', t: 'text', full: true },
      { k: 'short', l: 'Resumo', t: 'textarea', full: true },
      { k: 'bullets', l: 'Itens (um por linha)', t: 'lines', full: true },
      { k: 'image', l: 'Imagem (4:3 — 1400×1050)', t: 'image' },
      { k: 'imageAlt', l: 'Descrição da imagem', t: 'text' },
      { k: 'cta.label', l: 'Botão do card (Home) — texto', t: 'text' },
      { k: 'cta.href', l: 'Botão do card (Home) — link', t: 'text' },
      { k: 'slug', l: 'Slug / âncora (evite alterar)', t: 'text' },
    ],
  },
  banners: {
    label: 'Hero (banners)',
    hint: 'Slides do topo da Home. Imagem larga (~1920×820).',
    kind: 'array',
    itemTitle: (it) => it.title || 'Banner',
    fields: [
      { k: 'title', l: 'Título', t: 'text', full: true },
      { k: 'eyebrow', l: 'Rótulo acima do título', t: 'text', full: true },
      { k: 'text', l: 'Texto', t: 'textarea', full: true },
      { k: 'image', l: 'Imagem', t: 'image' },
      { k: 'alt', l: 'Descrição da imagem', t: 'text' },
      { k: 'cta.label', l: 'Botão principal — texto', t: 'text' },
      { k: 'cta.href', l: 'Botão principal — link', t: 'text' },
      { k: 'ctaAlt.label', l: 'Botão secundário — texto', t: 'text' },
      { k: 'ctaAlt.href', l: 'Botão secundário — link', t: 'text' },
    ],
  },
  pillars: {
    label: 'Diferenciais',
    hint: 'Faixa de diferenciais logo abaixo do hero.',
    kind: 'array',
    itemTitle: (it) => it.title || 'Diferencial',
    fields: [
      { k: 'title', l: 'Título', t: 'text', full: true },
      { k: 'text', l: 'Texto', t: 'textarea', full: true },
      { k: 'icon', l: 'Ícone (layers, users, badge, shield)', t: 'text' },
    ],
  },
  logo: {
    label: 'Logotipo',
    hint: 'Duas versões: clara (para fundos escuros) e escura (para o header claro). SVG ou PNG.',
    kind: 'object',
    fields: [
      { k: 'light', l: 'Logo clara (rodapé / menu mobile)', t: 'image', big: true },
      { k: 'dark', l: 'Logo escura (header)', t: 'image', big: true },
    ],
  },
  site: {
    label: 'Marca e contato',
    hint: 'Dados institucionais e canais exibidos no header, rodapé e página de contato.',
    kind: 'object',
    fields: [
      { k: 'name', l: 'Nome', t: 'text', full: true },
      { k: 'description', l: 'Descrição (rodapé/SEO)', t: 'textarea', full: true },
      { k: 'address.street', l: 'Endereço' },
      { k: 'address.district', l: 'Bairro' },
      { k: 'address.city', l: 'Cidade' },
      { k: 'address.state', l: 'UF' },
      { k: 'address.zip', l: 'CEP' },
      { k: 'area.region', l: 'Área de atuação', full: true },
      { k: 'area.note', l: 'Observação da área', full: true },
      { k: 'technical.crea', l: 'Selo técnico (CREA/ART)', full: true },
      { k: 'contact.phone.label', l: 'Telefone (exibido)' },
      { k: 'contact.phone.href', l: 'Telefone (link tel:)' },
      { k: 'contact.whatsapp.label', l: 'WhatsApp (exibido)' },
      { k: 'contact.whatsapp.href', l: 'WhatsApp (link wa.me)' },
      { k: 'contact.email.label', l: 'E-mail (exibido)' },
      { k: 'contact.email.href', l: 'E-mail (link mailto:)' },
      { k: 'contact.instagram.label', l: 'Instagram (exibido)' },
      { k: 'contact.instagram.href', l: 'Instagram (link)' },
      { k: 'contact.linkedin.label', l: 'LinkedIn (exibido)' },
      { k: 'contact.linkedin.href', l: 'LinkedIn (link)' },
      { k: 'mapQuery', l: 'Endereço para o mapa', t: 'text', full: true },
    ],
  },
  engineering: {
    label: 'Engenharia',
    hint: 'Fluxo, entregáveis e responsabilidade (JSON estruturado).',
    kind: 'json',
  },
  footer: {
    label: 'Rodapé',
    hint: 'Texto institucional e colunas de links do rodapé (JSON estruturado).',
    kind: 'json',
  },
};

/* --- Estado --------------------------------------------------------------- */
const cfg = (window.MHR && window.MHR.supabase) || {};
const ORDER = ['services', 'segments', 'banners', 'pillars', 'logo', 'site', 'engineering', 'footer'];

const state = {
  client: null,
  rows: {},      // key -> payload carregado do Supabase
  draft: {},     // key -> cópia editável
  key: null,     // coleção ativa
  jsonMode: false,
  jsonInvalid: false, // evita salvar um JSON que o cliente deixou inválido
};

/* --- Utilidades de DOM (seguras: sem innerHTML com dados) ------------------ */
const $ = (sel, root = document) => root.querySelector(sel);

function el(tag, props, children) {
  const node = document.createElement(tag);
  if (props) {
    Object.keys(props).forEach((k) => {
      const v = props[k];
      if (v == null) return;
      if (k === 'class') node.className = v;
      else if (k === 'text') node.textContent = v;
      else if (k === 'html') node.innerHTML = v; // apenas strings fixas nossas
      else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    });
  }
  (children || []).forEach((c) => { if (c) node.appendChild(c); });
  return node;
}
const clone = (v) => JSON.parse(JSON.stringify(v));

/* O conteúdo pode guardar a imagem como caminho do site (ex.: "assets/img/...")
   ou como URL absoluta (Supabase Storage). No painel (que roda em /admin/), o
   caminho relativo precisa ser resolvido a partir da raiz do site. */
function imageSrc(value) {
  const v = String(value || '');
  if (!v) return '';
  if (/^(https?:|data:|\/\/)/i.test(v)) return v;
  return '../' + v.replace(/^\/+/, '');
}

function getPath(obj, path) {
  return path.split('.').reduce((acc, k) => (acc == null ? undefined : acc[k]), obj);
}
function setPath(obj, path, value) {
  const parts = path.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (typeof cur[parts[i]] !== 'object' || cur[parts[i]] === null) cur[parts[i]] = {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
  return obj;
}

function status(msg, ok) {
  const box = $('[data-adm-status]');
  if (!box) return;
  box.textContent = msg || '';
  box.classList.toggle('is-ok', ok === true);
  box.classList.toggle('is-error', ok === false);
}
function loginStatus(msg, ok) {
  const box = $('[data-adm-login-status]');
  if (!box) return;
  box.textContent = msg || '';
  box.classList.toggle('is-ok', ok === true);
  box.classList.toggle('is-error', ok === false);
}
function fatal(msg) {
  const box = $('[data-adm-fatal]');
  box.textContent = msg;
  box.hidden = false;
}

/* Sessão expirada/ inválida: volta para o login em vez de falhar em silêncio. */
function isAuthError(error) {
  if (!error) return false;
  if (error.status === 401 || error.status === 403) return true;
  const code = String(error.code || '');
  const msg = String(error.message || '');
  return code.indexOf('PGRST301') >= 0 || /jwt|token is expired|invalid.*token/i.test(msg);
}

async function handleAuthError(error) {
  if (!isAuthError(error)) return false;
  try { await state.client.auth.signOut(); } catch (e) { /* ignora */ }
  showLogin();
  loginStatus('Sua sessão expirou. Entre novamente.', false);
  return true;
}

/* --- Configuração --------------------------------------------------------- */
function configReady() {
  return cfg.url && cfg.anonKey && cfg.siteSlug;
}

/* --- Supabase ------------------------------------------------------------- */
async function makeClient() {
  const mod = await import('https://esm.sh/@supabase/supabase-js@2');
  return mod.createClient(cfg.url, cfg.anonKey, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
}

async function loadAll() {
  const { data, error } = await state.client
    .from('content')
    .select('key,payload')
    .eq('site_slug', cfg.siteSlug);

  if (error) throw error;
  state.rows = {};
  (data || []).forEach((row) => { state.rows[row.key] = row.payload; });
  state.draft = clone(state.rows);

  if (!Object.keys(state.rows).length) {
    fatal('Nenhum conteúdo encontrado. Rode o supabase/03-seed.sql no projeto Supabase.');
  }
}

async function save() {
  const key = state.key;
  if (!key) return;
  if (state.jsonInvalid) {
    status('O JSON está inválido. Corrija antes de salvar.', false);
    return;
  }
  const payload = state.draft[key];
  status('Salvando…');
  const { error } = await state.client
    .from('content')
    .upsert({ site_slug: cfg.siteSlug, key, payload }, { onConflict: 'site_slug,key' });

  if (error) {
    if (await handleAuthError(error)) return;
    status('Não foi possível salvar: ' + error.message, false);
    return;
  }
  state.rows[key] = clone(payload);
  status('Alterações salvas. O site já reflete no próximo carregamento.', true);
}

async function uploadImage(file, hint) {
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const safe =
    String(hint || 'imagem')
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40) || 'imagem';
  const path = `${cfg.siteSlug}/${safe}-${Date.now()}.${ext}`;
  const { error } = await state.client.storage
    .from(cfg.bucket || 'site-images')
    .upload(path, file, { upsert: true, cacheControl: '31536000', contentType: file.type });
  if (error) throw error;
  const { data } = state.client.storage.from(cfg.bucket || 'site-images').getPublicUrl(path);
  return data.publicUrl;
}

/* --- Render: campos ------------------------------------------------------- */
function fieldControl(field, value, onChange) {
  const id = 'f_' + Math.random().toString(36).slice(2, 8);

  if (field.t === 'image') {
    const thumb = el('img', {
      class: 'adm-thumb' + (field.big ? ' adm-thumb--logo' : ''),
      src: imageSrc(value), alt: '',
    });
    const input = el('input', { class: 'adm-field__input', type: 'text', value: value || '' });
    input.addEventListener('input', () => { thumb.src = imageSrc(input.value); onChange(input.value); });

    const file = el('input', { type: 'file', accept: 'image/*' });
    file.addEventListener('change', async () => {
      const f = file.files && file.files[0];
      if (!f) return;
      try {
        status('Enviando imagem…');
        const url = await uploadImage(f, field.k);
        input.value = url;
        thumb.src = imageSrc(url);
        onChange(url);
        status('Imagem enviada. Clique em Salvar para publicar.', true);
      } catch (e) {
        status('Falha no upload: ' + (e.message || e), false);
      }
    });

    return el('div', { class: 'adm-field' + (field.full ? ' adm-full' : '') }, [
      el('span', { class: 'adm-field__label', text: field.l }),
      el('div', { class: 'adm-image' }, [
        el('div', { class: 'adm-image__row' }, [thumb, input]),
        el('div', { class: 'adm-image__row' }, [file, el('span', { class: 'adm-help', text: 'ou cole a URL acima' })]),
      ]),
    ]);
  }

  if (field.t === 'bool') {
    const input = el('input', { type: 'checkbox', id });
    input.checked = value === true;
    input.addEventListener('change', () => onChange(input.checked));
    return el('label', { class: 'adm-field adm-field--check' + (field.full ? ' adm-full' : ''), for: id }, [
      input,
      el('span', { class: 'adm-field__label', text: field.l }),
    ]);
  }

  if (field.t === 'textarea' || field.t === 'lines') {
    const ta = el('textarea', { class: 'adm-field__textarea', id });
    ta.value = field.t === 'lines' ? (Array.isArray(value) ? value.join('\n') : '') : (value || '');
    ta.addEventListener('input', () =>
      onChange(field.t === 'lines'
        ? ta.value.split('\n').map((s) => s.trim()).filter(Boolean)
        : ta.value)
    );
    return el('div', { class: 'adm-field' + (field.full ? ' adm-full' : '') }, [
      el('span', { class: 'adm-field__label', text: field.l }),
      ta,
    ]);
  }

  const input = el('input', { class: 'adm-field__input', type: 'text', id, value: value == null ? '' : String(value) });
  input.addEventListener('input', () => onChange(input.value));
  return el('div', { class: 'adm-field' + (field.full ? ' adm-full' : '') }, [
    el('span', { class: 'adm-field__label', text: field.l }),
    input,
  ]);
}

/* --- Render: coleção array ------------------------------------------------ */
function renderArray(key, spec, container) {
  const items = state.draft[key] || (state.draft[key] = []);

  items.forEach((item, index) => {
    const body = el('div', { class: 'adm-item__body adm-grid' });
    spec.fields.forEach((field) => {
      body.appendChild(fieldControl(field, getPath(item, field.k), (v) => setPath(item, field.k, v)));
    });

    const head = el('div', { class: 'adm-item__head' }, [
      el('span', { class: 'adm-item__title', text: `${index + 1}. ` + (spec.itemTitle ? spec.itemTitle(item) : 'Item') }),
    ]);
    const up = el('button', { class: 'adm-btn adm-btn--ghost adm-mini', type: 'button', text: '↑' });
    const down = el('button', { class: 'adm-btn adm-btn--ghost adm-mini', type: 'button', text: '↓' });
    const del = el('button', { class: 'adm-btn adm-btn--ghost adm-mini', type: 'button', text: 'Remover' });

    up.addEventListener('click', (e) => { e.stopPropagation(); if (index > 0) { items.splice(index - 1, 0, items.splice(index, 1)[0]); rerender(); } });
    down.addEventListener('click', (e) => { e.stopPropagation(); if (index < items.length - 1) { items.splice(index + 1, 0, items.splice(index, 1)[0]); rerender(); } });
    del.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!window.confirm('Remover este item?')) return;
      items.splice(index, 1);
      rerender();
    });

    head.appendChild(up); head.appendChild(down); head.appendChild(del);

    const card = el('article', { class: 'adm-item' }, [head, body]);
    head.addEventListener('click', () => { body.hidden = !body.hidden; });
    container.appendChild(card);
  });

  const add = el('button', { class: 'adm-btn adm-btn--ghost', type: 'button', text: '+ Adicionar item' });
  add.addEventListener('click', () => {
    const base = items[0] ? clone(items[0]) : {};
    Object.keys(base).forEach((k) => { base[k] = Array.isArray(base[k]) ? [] : (typeof base[k] === 'boolean' ? false : ''); });
    items.push(base);
    rerender();
  });
  container.appendChild(add);
}

/* --- Render: coleção objeto ----------------------------------------------- */
function renderObject(key, spec, container) {
  const obj = state.draft[key] || (state.draft[key] = {});
  const grid = el('div', { class: 'adm-grid' });
  spec.fields.forEach((field) => {
    grid.appendChild(fieldControl(field, getPath(obj, field.k), (v) => setPath(obj, field.k, v)));
  });
  container.appendChild(grid);
}

/* --- Render: JSON avançado ------------------------------------------------ */
function renderJson(key, spec, container) {
  const ta = el('textarea', { class: 'adm-field__textarea' });
  ta.style.minHeight = '420px';
  ta.style.fontFamily = 'ui-monospace, SFMono-Regular, Menlo, monospace';
  ta.style.fontSize = '0.8125rem';
  ta.value = JSON.stringify(state.draft[key], null, 2);
  ta.addEventListener('input', () => {
    try {
      state.draft[key] = JSON.parse(ta.value);
      state.jsonInvalid = false;
      status('JSON válido.', true);
    } catch (e) {
      state.jsonInvalid = true;
      status('JSON inválido: ' + e.message + ' — corrija antes de salvar.', false);
    }
  });
  container.appendChild(ta);
}

/* --- Render: editor da coleção ativa ------------------------------------- */
function renderEditor() {
  const key = state.key;
  const spec = SCHEMA[key];
  const container = $('[data-adm-editor]');
  container.textContent = '';
  state.jsonInvalid = false;

  $('[data-adm-title]').textContent = spec.label;
  $('[data-adm-hint]').textContent = spec.hint || '';
  status('');

  if (state.jsonMode || spec.kind === 'json') {
    renderJson(key, spec, container);
    return;
  }
  if (spec.kind === 'array') renderArray(key, spec, container);
  else renderObject(key, spec, container);
}

function rerender() { renderEditor(); }

/* --- Render: abas --------------------------------------------------------- */
function renderTabs() {
  const nav = $('[data-adm-tabs]');
  nav.textContent = '';
  ORDER.forEach((key) => {
    if (!SCHEMA[key]) return;
    const btn = el('button', {
      class: 'adm-tab' + (key === state.key ? ' is-active' : ''),
      type: 'button',
      text: SCHEMA[key].label,
    });
    btn.addEventListener('click', () => {
      state.key = key;
      state.jsonMode = false;
      renderTabs();
      renderEditor();
      updateJsonToggle();
    });
    nav.appendChild(btn);
  });
}

function updateJsonToggle() {
  const btn = $('[data-adm-json]');
  if (!btn) return;
  const spec = SCHEMA[state.key] || {};
  const canToggle = spec.kind !== 'json';
  btn.hidden = !canToggle;
  btn.textContent = state.jsonMode ? 'Editor visual' : 'Avançado (JSON)';
}

/* --- Aplicação ------------------------------------------------------------ */
function showLogin() {
  $('[data-adm-login]').hidden = false;
  $('[data-adm-app]').hidden = true;
  $('[data-adm-logout]').hidden = true;
  $('[data-adm-user]').textContent = '';
}

function showApp(user) {
  $('[data-adm-login]').hidden = true;
  $('[data-adm-app]').hidden = false;
  $('[data-adm-logout]').hidden = false;
  $('[data-adm-user]').textContent = user && user.email ? user.email : '';
  if (!state.key) state.key = ORDER[0];
  renderTabs();
  updateJsonToggle();
  renderEditor();
}

async function bootApp() {
  const { data } = await state.client.auth.getSession();
  if (data && data.session) {
    try {
      await loadAll();
      showApp(data.session.user);
    } catch (e) {
      if (!(await handleAuthError(e))) {
        fatal('Falha ao carregar o conteúdo: ' + (e.message || e));
        showLogin();
      }
    }
  } else {
    showLogin();
  }

  state.client.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_OUT') showLogin();
  });
}

async function main() {
  /* Barra de ações extras (avançado em JSON) */
  const actions = $('.adm-panel__actions');
  if (actions && !$('[data-adm-json]')) {
    const toggle = el('button', { class: 'adm-btn adm-btn--ghost', type: 'button', 'data-adm-json': '' });
    toggle.addEventListener('click', () => { state.jsonMode = !state.jsonMode; updateJsonToggle(); renderEditor(); });
    actions.insertBefore(toggle, $('[data-adm-reload]'));
  }

  $('[data-adm-reload]').addEventListener('click', () => { state.draft = clone(state.rows); renderTabs(); renderEditor(); status('Alterações descartadas.', true); });
  $('[data-adm-save]').addEventListener('click', save);
  $('[data-adm-logout]').addEventListener('click', () => state.client.auth.signOut());

  if (!configReady()) {
    fatal('Configuração ausente: preencha url e anonKey em assets/js/data/supabase.config.js (veja supabase/README.md).');
    showLogin();
    return;
  }

  try {
    state.client = await makeClient();
  } catch (e) {
    fatal('Não foi possível carregar o cliente do Supabase (verifique a conexão).');
    showLogin();
    return;
  }

  const form = $('[data-adm-login-form]');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    const password = form.password.value;
    loginStatus('Entrando…');
    const { data, error } = await state.client.auth.signInWithPassword({ email, password });
    if (error) { loginStatus('Não foi possível entrar: ' + error.message, false); return; }
    loginStatus('');
    try {
      await loadAll();
      showApp(data.user);
    } catch (err) {
      if (!(await handleAuthError(err))) {
        loginStatus('Falha ao carregar o conteúdo: ' + (err.message || err), false);
      }
    }
  });

  await bootApp();
}

main();
