/*
 * MHR — Gerador de imagens provisórias (placeholders)
 * ---------------------------------------------------------------------------
 * Gera SVGs técnicos usados enquanto as fotos reais do cliente não chegam.
 * Substitua os arquivos em assets/img/ pelas fotos definitivas mantendo o
 * mesmo nome de arquivo (ou ajuste os caminhos em assets/js/data/*.js).
 *
 * Os placeholders são apenas textura + marca d'água central: assim continuam
 * legíveis e discretos em qualquer recorte (object-fit: cover).
 *
 * Uso:  npm run placeholders      (ou: node tools/generate-placeholders.mjs)
 * ---------------------------------------------------------------------------
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'assets', 'img');

const TOP = '#3a424c';
const BOTTOM = '#20252c';
const ORANGE = '#F48009';

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

function defs() {
  return `<defs>
    <pattern id="g1" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M56 0H0V56" fill="none" stroke="rgba(255,255,255,0.055)" stroke-width="1"/>
    </pattern>
    <pattern id="g2" width="280" height="280" patternUnits="userSpaceOnUse">
      <rect width="280" height="280" fill="url(#g1)"/>
      <path d="M280 0H0V280" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    </pattern>
    <linearGradient id="bg" x1="0" y1="0" x2="0.9" y2="1">
      <stop offset="0" stop-color="${TOP}"/>
      <stop offset="1" stop-color="${BOTTOM}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.78" cy="0.72" r="0.7">
      <stop offset="0" stop-color="${ORANGE}" stop-opacity="0.1"/>
      <stop offset="1" stop-color="${ORANGE}" stop-opacity="0"/>
    </radialGradient>
  </defs>`;
}

function gear(cx, cy, r) {
  let teeth = '';
  const n = 32;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    teeth += `<line x1="${(cx + Math.cos(a) * r * 0.8).toFixed(1)}" y1="${(cy + Math.sin(a) * r * 0.8).toFixed(1)}" x2="${(cx + Math.cos(a) * r * 1.14).toFixed(1)}" y2="${(cy + Math.sin(a) * r * 1.14).toFixed(1)}"/>`;
  }
  return `<g stroke="${ORANGE}" stroke-opacity="0.13" fill="none" stroke-width="1.6">
    <circle cx="${cx}" cy="${cy}" r="${r}"/>
    <circle cx="${cx}" cy="${cy}" r="${(r * 0.6).toFixed(1)}"/>
    <circle cx="${cx}" cy="${cy}" r="${(r * 0.26).toFixed(1)}"/>
    ${teeth}
  </g>`;
}

function frame(w, h) {
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) * 0.46;
  return `<g stroke="${ORANGE}" stroke-opacity="0.12" fill="none" stroke-width="1.6">
    <path d="M${cx} ${cy - r} L${cx + r} ${cy - r * 0.5} L${cx} ${cy} L${cx - r} ${cy - r * 0.5} Z"/>
    <path d="M${cx - r} ${cy - r * 0.5} V${cy + r * 0.5} L${cx} ${cy + r} L${cx + r} ${cy + r * 0.5} V${cy - r * 0.5}"/>
    <path d="M${cx} ${cy} V${cy + r}"/>
  </g>`;
}

function flange(cx, cy, r) {
  let bolts = '';
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    bolts += `<circle cx="${(cx + Math.cos(a) * r * 0.78).toFixed(1)}" cy="${(cy + Math.sin(a) * r * 0.78).toFixed(1)}" r="${(r * 0.075).toFixed(1)}"/>`;
  }
  return `<g stroke="${ORANGE}" stroke-opacity="0.13" fill="none" stroke-width="1.6">
    <circle cx="${cx}" cy="${cy}" r="${r}"/>
    <circle cx="${cx}" cy="${cy}" r="${(r * 0.58).toFixed(1)}"/>
    ${bolts}
  </g>`;
}

function hazard(x, y, w, h) {
  let out = '';
  const count = 9;
  const step = h / count;
  for (let i = 0; i < count; i++) {
    out += `<rect x="${x}" y="${(y + i * step * 2).toFixed(1)}" width="${w}" height="${(step * 0.6).toFixed(1)}" fill="${ORANGE}" fill-opacity="0.1"/>`;
  }
  return out;
}

/*
 * align: 'center' (padrão) ou 'right' (banners — libera a área do texto).
 */
function placeholder({ w, h, label, title, sub, glyph = 'gear', align = 'center', watermark = true, tag = true }) {
  const u = Math.min(w, h) / 100;
  const labelSize = Math.max(18, Math.round(u * 4.6));
  const titleSize = Math.max(14, Math.round(u * 3.1));
  const subSize = Math.max(11, Math.round(u * 2));
  const pad = Math.round(Math.min(w, h) * 0.06);

  const glyphs = {
    gear: gear(w * 0.74, h * 0.66, Math.min(w, h) * 0.42),
    frame: frame(w, h),
    flange: flange(w * 0.74, h * 0.66, Math.min(w, h) * 0.4),
  };

  let watermarkMarkup = '';
  if (watermark) {
    const anchorX = align === 'right' ? Math.round(w * 0.63) : Math.round(w / 2);
    const anchorY = align === 'right' ? Math.round(h * 0.5) : Math.round(h * 0.5);
    const anchor = align === 'right' ? 'start' : 'middle';

    watermarkMarkup = `
  <g transform="translate(${anchorX}, ${anchorY})" text-anchor="${anchor}" opacity="0.42">
    <rect x="${anchor === 'middle' ? -Math.round(u * 1.6) : 0}" y="${-Math.round(labelSize * 4.4)}" width="${Math.round(u * 3.2)}" height="4" fill="${ORANGE}"/>
    ${tag ? `<text y="${-Math.round(labelSize * 2.5)}" fill="${ORANGE}" font-family="Arial, Helvetica, sans-serif" font-size="${subSize}" font-weight="700" letter-spacing="${(subSize * 0.22).toFixed(1)}">IMAGEM PROVISÓRIA</text>` : ''}
    <text y="0" fill="#FFFFFF" fill-opacity="0.72" font-family="Arial, Helvetica, sans-serif" font-size="${labelSize}" font-weight="700" letter-spacing="${(labelSize * 0.02).toFixed(1)}">${esc(label)}</text>
    ${title ? `<text y="${Math.round(titleSize * 1.7)}" fill="#FFFFFF" fill-opacity="0.5" font-family="Arial, Helvetica, sans-serif" font-size="${titleSize}">${esc(title)}</text>` : ''}
    <text y="${Math.round(titleSize * 3.6)}" fill="${ORANGE}" fill-opacity="0.85" font-family="Arial, Helvetica, sans-serif" font-size="${subSize}" font-weight="700" letter-spacing="${(subSize * 0.14).toFixed(1)}">${esc(sub)}</text>
  </g>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(label)} — imagem provisória">
  ${defs()}
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <rect width="${w}" height="${h}" fill="url(#g2)"/>
  ${glyphs[glyph] || glyphs.gear}
  ${hazard(0, h - Math.round(h * 0.045), w, Math.round(h * 0.045))}
  <rect x="${pad}" y="${pad}" width="${Math.round(u * 2.6)}" height="4" fill="${ORANGE}" fill-opacity="0.5"/>
  ${watermarkMarkup}
  <g stroke="rgba(255,255,255,0.16)" stroke-width="1" fill="none">
    <path d="M${pad} ${Math.round(h * 0.5)} h16 M${Math.round(w * 0.5)} ${pad} v16"/>
    <path d="M${w - pad} ${Math.round(h * 0.5)} h-16 M${Math.round(w * 0.5)} ${h - pad} v-16"/>
  </g>
</svg>
`;
}

const specs = [];

/* Banners — 1920 x 820 (a marca d'água fica à direita, livre do texto do hero) */
['BANNER 01', 'BANNER 02', 'BANNER 03'].forEach((label, i) => {
  specs.push({
    file: `banners/banner-0${i + 1}.svg`,
    w: 1920,
    h: 820,
    label,
    title: '',
    sub: 'SUBSTITUIR POR FOTO REAL · 1920 × 820 PX',
    glyph: ['gear', 'frame', 'flange'][i % 3],
    align: 'right',
    tag: false,
  });
});

/* Segmentos — 1400 x 1050 */
['MINERAÇÃO', 'ARMAZÉNS DE GRÃOS', 'BENEFICIAMENTO DE CAFÉ', 'INDÚSTRIA EM GERAL'].forEach((s, i) => {
  specs.push({
    file: `segments/segmento-0${i + 1}.svg`,
    w: 1400,
    h: 1050,
    label: s,
    title: 'Imagem do segmento',
    sub: 'FOTO REAL · 1400 × 1050 PX',
    glyph: ['gear', 'frame', 'flange', 'frame'][i % 4],
  });
});

/* Serviços — 1200 x 800 */
[
  'MONTAGEM ELETROMECÂNICA',
  'MONTAGEM ELÉTRICA E INSTRUMENTAÇÃO',
  'MANUTENÇÃO INDUSTRIAL',
  'PARADAS DE MANUTENÇÃO',
  'CALDEIRARIA E FABRICAÇÃO',
  'SOLDAGEM INDUSTRIAL',
  'VULCANIZAÇÃO DE CORREIAS',
  'ANDAIMES',
  'PLANEJAMENTO E CONTROLE',
].forEach((s, i) => {
  specs.push({
    file: `services/servico-${String(i + 1).padStart(2, '0')}.svg`,
    w: 1200,
    h: 800,
    label: `SERVIÇO ${String(i + 1).padStart(2, '0')}`,
    title: s,
    sub: 'FOTO REAL · 1200 × 800 PX',
    glyph: ['gear', 'frame', 'flange'][i % 3],
  });
});

/* Imagens editoriais */
[
  { file: 'media/empresa-01.svg', w: 1600, h: 1100, label: 'A EMPRESA', title: 'Planta industrial / equipe com EPI', glyph: 'gear' },
  { file: 'media/empresa-02.svg', w: 1200, h: 1200, label: 'ESTRUTURA', title: 'Detalhe técnico', glyph: 'flange' },
  { file: 'media/engenharia-01.svg', w: 1600, h: 1000, label: 'ENGENHARIA', title: 'Planejamento e controle de obras', glyph: 'frame' },
  { file: 'media/seguranca-01.svg', w: 1400, h: 1050, label: 'SEGURANÇA', title: 'Trabalho em altura / EPIs', glyph: 'gear' },
  { file: 'media/qualidade-01.svg', w: 1400, h: 1050, label: 'QUALIDADE', title: 'Inspeção e soldagem', glyph: 'flange' },
  { file: 'media/cta-bg.svg', w: 1920, h: 720, label: 'FUNDO TÉCNICO', title: 'Substituir por foto de obra', glyph: 'frame' },
].forEach((e) => specs.push({ ...e, sub: 'SUBSTITUIR POR FOTO REAL' }));

/* Open Graph */
specs.push({
  file: 'og/og-default.svg',
  w: 1200,
  h: 630,
  label: 'MHR MANUTENÇÃO INDUSTRIAL',
  title: 'Engenharia e manutenção para operações industriais',
  sub: 'VARGINHA / MG · MINAS GERAIS',
  glyph: 'gear',
});

async function main() {
  for (const spec of specs) {
    const path = join(OUT, spec.file);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, placeholder(spec), 'utf8');
  }
  console.log(`OK — ${specs.length} placeholders gerados em assets/img`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
