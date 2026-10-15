/* ==========================================================================
   MHR — export-content
   --------------------------------------------------------------------------
   Gera `supabase/03-seed.sql` a partir dos dados locais atuais
   (`assets/js/data/*.js`). Esse SQL cria os "dados iniciais" no Supabase,
   idênticos ao que o site exibe hoje.

   Uso:  node tools/export-content.mjs

   Observações:
   - Não depende de nada além do Node (sem npm install).
   - Os blocos "diferenciais" (pillars) e "rodapé" (footer) são um snapshot do
     que está embutido hoje em assets/js/components/pillars.js e footer.js,
     porque esse conteúdo ainda não vive em arquivo de dados.
   ========================================================================== */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE_SLUG = 'mhrengenharia';

/* Carrega um arquivo de dados (IIFE que preenche window.MHR.*) */
function loadData(relPath) {
  const win = {};
  const code = readFileSync(join(root, relPath), 'utf8');
  // eslint-disable-next-line no-new-func
  new Function('window', code)(win);
  return win.MHR || {};
}

const dataDir = 'assets/js/data/';
const mhr = {
  ...loadData(dataDir + 'site.js'),
  ...loadData(dataDir + 'banners.js'),
  ...loadData(dataDir + 'services.js'),
  ...loadData(dataDir + 'segments.js'),
  ...loadData(dataDir + 'engineering.js'),
  ...loadData(dataDir + 'pages.js'),
};

/* Snapshot do conteúdo que hoje está nos componentes (fase 3 vai movê-lo para cá) */
const pillars = [
  { icon: 'layers', title: 'Engenharia Industrial', text: 'Soluções completas para operações industriais.' },
  { icon: 'users', title: 'Equipe Técnica', text: 'Profissionais especializados em diferentes disciplinas.' },
  { icon: 'badge', title: 'Responsabilidade Técnica', text: 'Atuação com responsabilidade técnica e CREA/ART quando aplicável.' },
  { icon: 'shield', title: 'Segurança', text: 'Compromisso com normas e boas práticas de segurança.' },
];

const footer = {
  about:
    'A MHR Engenharia atua em montagem e manutenção industrial, com foco em mineração e agroindústria, mobilizando equipes conforme o escopo e os requisitos de cada projeto em todo o território nacional.',
  columns: {
    mhr: [
      { label: 'A Empresa', href: 'a-empresa.html' },
      { label: 'Serviços', href: 'servicos.html' },
      { label: 'Engenharia e HSE', href: 'engenharia.html' },
      { label: 'Atuação Nacional', href: 'atuacao-nacional/' },
    ],
    segments: [
      { label: 'Mineração', href: 'segmentos/montagem-manutencao-industrial-mineracao/' },
      { label: 'Agroindústria', href: 'segmentos/montagem-manutencao-industrial-agroindustria/' },
    ],
    services: [
      { label: 'Montagem Eletromecânica', href: 'servicos.html#montagem-eletromecanica' },
      { label: 'Manutenção Industrial', href: 'servicos.html#manutencao-industrial' },
      { label: 'Paradas de Manutenção', href: 'servicos/paradas-de-manutencao-industrial/' },
      { label: 'Caldeiraria Industrial', href: 'servicos.html#caldeiraria-pesada-fabricacao' },
      { label: 'Soldagem Industrial', href: 'servicos.html#soldagem-industrial' },
      { label: 'Vulcanização de Correias', href: 'servicos.html#vulcanizacao-de-correias' },
    ],
    institutional: [
      { label: 'Segurança e Qualidade', href: 'seguranca-qualidade.html' },
      { label: 'Contato', href: 'contato.html' },
    ],
  },
};

const logo = {
  light: 'assets/img/media/logo.svg',
  dark: 'assets/img/media/logo-dark.svg',
};

/* Uma linha por coleção (o painel edita coleção por coleção) */
const collections = {
  site: mhr.site,
  banners: mhr.banners,
  services: mhr.services,
  segments: mhr.segments,
  engineering: mhr.engineering,
  pillars: pillars,
  footer: footer,
  logo: logo,
  pages: mhr.pageContent,
};

function dollarQuote(json) {
  // Dollar-quote seguro para JSON (escapa eventual ocorrência do delimitador)
  const tag = '$json$';
  return tag + json.split(tag).join('$js0n$') + tag;
}

let sql = '';
sql += '-- ==========================================================================\n';
sql += '-- MHR — dados iniciais (seed)\n';
sql += '-- Gerado por: node tools/export-content.mjs\n';
sql += '-- Rode DEPOIS de 01-schema.sql e 02-storage.sql.\n';
sql += '-- ==========================================================================\n\n';

for (const [key, payload] of Object.entries(collections)) {
  if (payload === undefined) continue;
  const json = JSON.stringify(payload, null, 2);
  sql += `-- ${key}\n`;
  sql += `insert into public.content (site_slug, key, payload)\nvalues ('${SITE_SLUG}', '${key}', ${dollarQuote(json)}::jsonb)\n`;
  /* do nothing: reexecutar o seed NUNCA sobrescreve o que o cliente já editou */
  sql += `on conflict (site_slug, key) do nothing;\n\n`;
}

sql += `-- Fim do seed. Total de coleções: ${Object.keys(collections).length}\n`;

mkdirSync(join(root, 'supabase'), { recursive: true });
writeFileSync(join(root, 'supabase', '03-seed.sql'), sql, 'utf8');

console.log('OK — supabase/03-seed.sql gerado com', Object.keys(collections).length, 'coleções:');
for (const key of Object.keys(collections)) {
  const p = collections[key];
  const info = Array.isArray(p) ? `${p.length} itens` : 'objeto';
  console.log('  -', key, '->', info);
}
