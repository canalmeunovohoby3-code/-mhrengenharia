/* ==========================================================================
   MHR — Painel administrativo (/admin/)
   --------------------------------------------------------------------------
   Login (Supabase Auth) + edição do conteúdo da tabela `content` + upload de
   imagens (Supabase Storage) + histórico/desfazer + estatísticas de visitas.

   Segurança:
   - usa apenas a chave pública (`sb_publishable_...` ou `anon`);
   - as políticas RLS garantem que este usuário só escreve no site dele;
   - todo texto é inserido no DOM via textContent/value (sem HTML injetado);
   - "Desfazer" restaura o estado anterior salvo (não apenas limpa o formulário)
     e recusa a operação se outra pessoa alterou depois.

   Configuração: ../assets/js/data/supabase.config.js
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
  pages: {
    label: 'Páginas (textos)',
    hint: 'Títulos, textos de apoio e listas de cada página do site. Escolha a página e edite os campos.',
    kind: 'pages',
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
  stats: {
    label: 'Estatísticas',
    hint: 'Visualizações de página registradas de verdade. Contagem começa a partir da publicação do contador.',
    kind: 'stats',
  },
};

/* --- Estado --------------------------------------------------------------- */
const cfg = (window.MHR && window.MHR.supabase) || {};
const ORDER = [
  'services', 'segments', 'banners', 'pillars', 'pages',
  'logo', 'site', 'engineering', 'footer', 'stats',
];

/* Limites de upload — precisam ser iguais aos do bucket (supabase/02-storage.sql) */
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE = /^image\/(jpeg|png|webp|gif|svg\+xml)$/i;

const state = {
  client: null,
  rows: {},        // key -> payload carregado do Supabase
  savedAt: {},     // key -> updated_at do último estado carregado/salvo
  draft: {},       // key -> cópia editável
  undo: {},        // key -> pilha de snapshots anteriores (por sessão)
  key: null,       // coleção ativa
  pagesPage: null, // página ativa dentro da aba "Páginas"
  jsonMode: false,
  jsonInvalid: false,
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

/* Caminho do site -> URL no painel; URL absoluta permanece como está. */
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
    .select('key,payload,updated_at')
    .eq('site_slug', cfg.siteSlug);

  if (error) throw error;
  state.rows = {};
  state.savedAt = {};
  (data || []).forEach((row) => {
    state.rows[row.key] = row.payload;
    state.savedAt[row.key] = row.updated_at || null;
  });
  state.draft = clone(state.rows);

  if (!Object.keys(state.rows).length) {
    fatal('Nenhum conteúdo encontrado. Rode o supabase/03-seed.sql no projeto Supabase.');
  }
}

/* Lê o updated_at atual de uma coleção (para detectar alterações de terceiros) */
async function currentUpdatedAt(key) {
  const { data, error } = await state.client
    .from('content')
    .select('updated_at')
    .eq('site_slug', cfg.siteSlug)
    .eq('key', key)
    .maybeSingle();
  if (error) throw error;
  return data ? data.updated_at : null;
}

async function save() {
  const key = state.key;
  if (!key || !SCHEMA[key] || SCHEMA[key].kind === 'stats') return;
  if (state.jsonInvalid) {
    status('O JSON está inválido. Corrija antes de salvar.', false);
    return;
  }
  const payload = state.draft[key];
  const previous = state.rows[key]; // estado previamente salvo (ou undefined)

  status('Salvando…');
  const { data, error } = await state.client
    .from('content')
    .upsert({ site_slug: cfg.siteSlug, key, payload }, { onConflict: 'site_slug,key' })
    .select('updated_at');

  if (error) {
    if (await handleAuthError(error)) return;
    status('Não foi possível salvar: ' + error.message, false);
    return;
  }

  /* Guarda o estado anterior para permitir Desfazer nesta sessão. */
  if (previous !== undefined) {
    state.undo[key] = state.undo[key] || [];
    state.undo[key].push({ payload: clone(previous), at: state.savedAt[key] || null });
  }

  state.rows[key] = clone(payload);
  state.savedAt[key] = (data && data[0] && data[0].updated_at) || null;
  status('Alterações salvas. O site já reflete no próximo carregamento.', true);
}

/* --- Desfazer (restaura o estado anterior salvo) -------------------------- */
async function undoLast() {
  const key = state.key;
  if (!key || !SCHEMA[key] || SCHEMA[key].kind === 'stats') return;

  const stack = state.undo[key] || [];
  if (!stack.length) {
    status(
      'Não há alteração desta sessão para desfazer. Abra "Histórico" para restaurar uma versão anterior salva.',
      false
    );
    return;
  }

  let current;
  try {
    current = await currentUpdatedAt(key);
  } catch (e) {
    status('Não foi possível verificar o estado atual: ' + (e.message || e), false);
    return;
  }

  const savedAt = state.savedAt[key];
  if (savedAt && current && current !== savedAt) {
    status(
      'Não é possível desfazer: esta coleção foi alterada depois do seu último salvamento (provavelmente por outra pessoa). Recarregue o painel antes de tentar novamente.',
      false
    );
    return;
  }

  const entry = stack[stack.length - 1];
  const when = entry.at ? new Date(entry.at).toLocaleString('pt-BR') : 'versão anterior';
  if (!window.confirm('Desfazer a última alteração e restaurar a versão salva em ' + when + '?')) return;

  status('Desfazendo…');
  const { data, error } = await state.client
    .from('content')
    .upsert({ site_slug: cfg.siteSlug, key, payload: entry.payload }, { onConflict: 'site_slug,key' })
    .select('updated_at');

  if (error) {
    if (await handleAuthError(error)) return;
    status('Não foi possível desfazer: ' + error.message, false);
    return;
  }

  stack.pop();
  state.rows[key] = clone(entry.payload);
  state.savedAt[key] = (data && data[0] && data[0].updated_at) || null;
  state.draft[key] = clone(entry.payload);
  renderTabs();
  renderEditor();
  status('Alteração desfeita. A versão anterior foi restaurada.', true);
}

/* --- Histórico (versões anteriores salvas) -------------------------------- */
function modal(open) {
  const box = $('[data-adm-modal]');
  if (box) box.hidden = !open;
}
function modalBody() { return $('[data-adm-modal-body]'); }

async function openHistory() {
  const key = state.key;
  if (!key || !SCHEMA[key]) return;
  modal(true);
  const body = modalBody();
  body.textContent = '';
  body.appendChild(el('p', { class: 'adm-help', text: 'Carregando histórico de "' + SCHEMA[key].label + '"…' }));

  const { data, error } = await state.client
    .from('content_history')
    .select('id,payload,created_at,created_by')
    .eq('site_slug', cfg.siteSlug)
    .eq('key', key)
    .order('created_at', { ascending: false })
    .limit(20);

  body.textContent = '';

  if (error) {
    body.appendChild(el('p', { class: 'adm-status is-error', text:
      'Histórico indisponível: aplique o arquivo supabase/04-history.sql no Supabase para habilitar versões anteriores e o desfazer permanente. (' + error.message + ')' }));
    return;
  }
  if (!data || !data.length) {
    body.appendChild(el('p', { class: 'adm-help', text: 'Nenhuma versão anterior registrada para esta coleção.' }));
    return;
  }

  const list = el('div', { class: 'adm-history' });
  data.forEach((row) => {
    const when = new Date(row.created_at).toLocaleString('pt-BR');
    const who = row.created_by ? String(row.created_by).slice(0, 8) : '—';
    const btn = el('button', { class: 'adm-btn adm-btn--ghost adm-mini', type: 'button', text: 'Restaurar esta versão' });
    btn.addEventListener('click', () => undoFromHistory(row.id, when));
    list.appendChild(el('div', { class: 'adm-history__row' }, [
      el('div', { class: 'adm-history__meta' }, [
        el('strong', { text: when }),
        el('span', { class: 'adm-help', text: ' · usuário ' + who }),
      ]),
      btn,
    ]));
  });
  body.appendChild(el('p', { class: 'adm-help', text: 'Restaurar uma versão anterior substitui o conteúdo atual desta coleção e é registrado no histórico.' }));
  body.appendChild(list);
}

async function undoFromHistory(historyId, when) {
  if (!window.confirm('Restaurar a versão de ' + when + '? O conteúdo atual desta coleção será substituído.')) return;
  const { error } = await state.client.rpc('content_undo', {
    p_site: cfg.siteSlug,
    p_history_id: historyId,
  });
  if (error) {
    if (await handleAuthError(error)) return;
    status('Não foi possível restaurar: ' + error.message, false);
    return;
  }
  try { await loadAll(); } catch (e) { /* mantém o que já existe */ }
  modal(false);
  renderTabs();
  renderEditor();
  status('Versão anterior restaurada com sucesso.', true);
}

/* --- Upload de imagens ---------------------------------------------------- */
async function uploadImage(file, hint) {
  if (!ALLOWED_IMAGE.test(file.type || '')) {
    throw new Error('Formato não permitido. Use JPG, PNG, WEBP, GIF ou SVG.');
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error('Imagem muito grande (' + (file.size / 1048576).toFixed(1) + ' MB). O máximo é 5 MB.');
  }

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

    const file = el('input', { type: 'file', accept: 'image/png,image/jpeg,image/webp,image/gif,image/svg+xml' });
    file.addEventListener('change', async () => {
      const f = file.files && file.files[0];
      if (!f) return;
      try {
        status('Enviando imagem…');
        const url = await uploadImage(f, field.k);
        /* só troca a URL depois do upload dar certo: a imagem antiga continua
           válida e nenhum arquivo é apagado (URLs antigas não quebram). */
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
        el('div', { class: 'adm-image__row' }, [file, el('span', { class: 'adm-help', text: 'JPG, PNG, WEBP, GIF ou SVG — até 5 MB. Ou cole a URL acima.' })]),
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
      if (!window.confirm('Remover este item? Esta ação só é definitiva após salvar; use "Desfazer" para voltar.')) return;
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

/* --- Render: conteúdo de páginas ------------------------------------------ */
function renderPages(container) {
  const schema = (window.MHR && MHR.pagesSchema) || [];
  if (!schema.length) {
    container.appendChild(el('p', { class: 'adm-help', text: 'Esquema de páginas indisponível (assets/js/data/pages.js).' }));
    return;
  }
  if (!state.draft.pages) {
    state.draft.pages = clone((window.MHR && MHR.pageContent) || {});
  }
  const content = state.draft.pages;

  if (!state.pagesPage || !schema.some((s) => s.page === state.pagesPage)) {
    state.pagesPage = schema[0].page;
  }

  const nav = el('div', { class: 'adm-tabs adm-tabs--sub' });
  schema.forEach((page) => {
    const btn = el('button', {
      class: 'adm-tab' + (page.page === state.pagesPage ? ' is-active' : ''),
      type: 'button',
      text: page.label,
    });
    btn.addEventListener('click', () => { state.pagesPage = page.page; renderEditor(); });
    nav.appendChild(btn);
  });
  container.appendChild(nav);

  const spec = schema.find((s) => s.page === state.pagesPage);
  const obj = content[spec.page] || (content[spec.page] = {});

  spec.groups.forEach((group) => {
    const grid = el('div', { class: 'adm-grid' });
    group.fields.forEach((field) => {
      grid.appendChild(fieldControl(field, getPath(obj, field.k), (v) => setPath(obj, field.k, v)));
    });
    container.appendChild(el('fieldset', { class: 'adm-group' }, [
      el('legend', { class: 'adm-group__title', text: group.title }),
      grid,
    ]));
  });
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

/* --- Render: estatísticas ------------------------------------------------- */
function renderStats(container) {
  container.appendChild(el('p', { class: 'adm-help', text:
    'Métrica: visualizações de página (page views) — não é contagem de visitantes únicos. Cada carregamento de uma página pública conta 1; recarregar a mesma página na mesma sessão não conta de novo; o painel não é contado.' }));
  const box = el('div', { class: 'adm-stats' });
  box.appendChild(el('p', { class: 'adm-help', text: 'Carregando…' }));
  container.appendChild(box);

  state.client
    .rpc('views_summary', { p_site: cfg.siteSlug, p_days: 30 })
    .then(({ data, error }) => {
      box.textContent = '';
      if (error) {
        box.appendChild(el('p', { class: 'adm-status is-error', text:
          'Estatísticas indisponíveis: aplique o arquivo supabase/05-views.sql no Supabase para habilitar o contador. (' + error.message + ')' }));
        return;
      }
      const s = data || {};
      const total = Number(s.total || 0);
      if (!total) {
        box.appendChild(el('p', { class: 'adm-help', text:
          'Ainda não há visualizações registradas. A contagem começa a partir da publicação do contador (aplicação do 05-views.sql) — não há dados retroativos.' }));
        return;
      }
      const fmt = (n) => Number(n || 0).toLocaleString('pt-BR');
      const cards = el('div', { class: 'adm-stats__cards' });
      [
        ['Total (30 dias)', fmt(s.total)],
        ['Hoje', fmt(s.today)],
        ['Últimos 7 dias', fmt(s.last_7)],
        ['Últimos 30 dias', fmt(s.last_30)],
      ].forEach(([label, value]) => {
        cards.appendChild(el('div', { class: 'adm-stat' }, [
          el('span', { class: 'adm-stat__value', text: value }),
          el('span', { class: 'adm-stat__label', text: label }),
        ]));
      });
      box.appendChild(cards);

      if (s.first_view) {
        box.appendChild(el('p', { class: 'adm-help', text:
          'Primeira visualização registrada em ' + new Date(s.first_view).toLocaleString('pt-BR') +
          '. Última em ' + (s.last_view ? new Date(s.last_view).toLocaleString('pt-BR') : '—') + '.' }));
      }

      if (Array.isArray(s.by_path) && s.by_path.length) {
        box.appendChild(el('h3', { class: 'adm-subtitle', text: 'Páginas mais vistas (30 dias)' }));
        const list = el('div', { class: 'adm-history' });
        s.by_path.slice(0, 15).forEach((row) => {
          list.appendChild(el('div', { class: 'adm-history__row' }, [
            el('span', { class: 'adm-history__meta', text: row.path }),
            el('strong', { text: fmt(row.views) }),
          ]));
        });
        box.appendChild(list);
      }
    });
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

  /* Salvar/Desfazer/Histórico não fazem sentido na aba de estatísticas */
  const isStats = spec.kind === 'stats';
  if ($('[data-adm-save]')) $('[data-adm-save]').hidden = isStats;
  if ($('[data-adm-undo]')) $('[data-adm-undo]').hidden = isStats;
  if ($('[data-adm-history]')) $('[data-adm-history]').hidden = isStats;
  if ($('[data-adm-reload]')) $('[data-adm-reload]').hidden = isStats;

  if (spec.kind === 'stats') { renderStats(container); return; }
  if (spec.kind === 'pages') { renderPages(container); return; }
  if (state.jsonMode || spec.kind === 'json') { renderJson(key, spec, container); return; }
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
  const canToggle = spec.kind !== 'json' && spec.kind !== 'pages' && spec.kind !== 'stats';
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
  const actions = $('.adm-panel__actions');
  if (actions && !$('[data-adm-json]')) {
    const toggle = el('button', { class: 'adm-btn adm-btn--ghost', type: 'button', 'data-adm-json': '' });
    toggle.addEventListener('click', () => { state.jsonMode = !state.jsonMode; updateJsonToggle(); renderEditor(); });
    actions.insertBefore(toggle, $('[data-adm-reload]'));
  }

  $('[data-adm-reload]').addEventListener('click', () => {
    state.draft = clone(state.rows);
    renderTabs();
    renderEditor();
    status('Alterações descartadas.', true);
  });
  $('[data-adm-save]').addEventListener('click', save);
  $('[data-adm-undo]').addEventListener('click', undoLast);
  $('[data-adm-history]').addEventListener('click', openHistory);
  $('[data-adm-modal-close]').addEventListener('click', () => modal(false));
  $('[data-adm-modal]').addEventListener('click', (e) => { if (e.target === $('[data-adm-modal]')) modal(false); });
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
