# MHR Manutenção Industrial e Engenharia — Site institucional

Site institucional estático (HTML + CSS + JavaScript puro, sem build) para a
**MHR Manutenção Industrial Ltda** — CNPJ 69.188.438/0001-41 — Varginha/MG.

## Como rodar localmente

```bash
npm run dev      # serve em http://localhost:5173
```

Também funciona abrindo `index.html` diretamente no navegador (nenhum módulo ES
é usado, então não há bloqueio de CORS em `file://`).

## Estrutura

```
index.html                  Página inicial (carrossel + seções institucionais)
a-empresa.html              A Empresa
servicos.html               Serviços (9 disciplinas detalhadas)
segmentos.html              Segmentos atendidos
engenharia.html             Engenharia e planejamento
seguranca-qualidade.html    Segurança e qualidade
contato.html                Contato + formulário + mapa
404.html                    Página não encontrada

segmentos/montagem-manutencao-industrial-mineracao/index.html     Pilar — Mineração
segmentos/montagem-manutencao-industrial-agroindustria/index.html Pilar — Agroindústria
servicos/paradas-de-manutencao-industrial/index.html              Pilar — Paradas de Manutenção
atuacao-nacional/index.html                                       Pilar — Atuação Nacional

> As páginas em subpasta usam `<base href="../../">` (ou `../` no caso de
> `atuacao-nacional/`) para que os caminhos relativos de CSS/JS/imagens e os
> links gerados pelo header/footer continuem resolvendo a partir da raiz do
> site — funciona tanto em domínio raiz quanto em GitHub Pages com subpasta.
favicon.svg                 Favicon
site.webmanifest            Manifest (PWA básico)
robots.txt / sitemap.xml    SEO

assets/css/
  tokens.css                Cores, tipografia, espaçamento, sombras
  base.css                  Reset, tipografia, layout, utilitários, reveal
  components.css            Header, carrossel, cards, footer, formulários
  pages.css                 Blocos específicos de página

assets/js/
  main.js                   Ponto de entrada
  utils/dom.js              Helpers de DOM
  utils/icons.js            Ícones SVG técnicos
  utils/reveal.js           Revelação em scroll (IntersectionObserver)
  data/site.js              Dados institucionais, menu, canais de contato
  data/banners.js           Banners do carrossel
  data/services.js          Serviços
  data/segments.js          Segmentos
  data/engineering.js       Fluxo e entregáveis de engenharia
  components/*.js           Header, footer, carrossel, seções, contato

assets/img/
  banners/                  Banners do carrossel (1920 × 820)
  segments/                 Imagens dos segmentos (1400 × 1050)
  services/                 Imagens dos serviços (1200 × 800)
  projects/                 Fotos originais (mestres) enviadas pelo cliente
  media/                    Imagens editoriais (empresa, engenharia, segurança, CTA)
                            + logo.svg / logo-dark.svg (logo em duas variantes)
  og/                       Imagem para Open Graph (1200 × 630)

tools/generate-placeholders.mjs   Gera todos os placeholders SVG
```

## Trocar os banners do carrossel

As imagens ficam em `assets/img/banners/`. O tamanho recomendado é
**1920 × 820 px** (mesma proporção para todos os banners, para o recorte do
carrossel ficar consistente em qualquer tela).

Situação atual:

| Banner | Arquivo usado   | Foto                                             |
| ------ | --------------- | ------------------------------------------------ |
| 01     | `banner-01.jpg` | equipamento de grande porte — 1920 × 820, 217 KB |
| 02     | `banner-02.jpg` | equipe com EPI — 1920 × 820, 132 KB              |
| 03     | `banner-03.jpg` | capacete e plantas técnicas — 1920 × 820, 189 KB |

**Todos os três banners já usam as fotos definitivas** (538 KB no total). Os
`banner-0X.svg` que sobraram são os placeholders gerados por
`npm run placeholders`, mantidos apenas como reserva — nenhum deles é usado.

Os arquivos `banner-0X-original.png` são os originais recebidos (1,3 a 1,8 MB),
guardados como mestres. O site publica as versões otimizadas em JPEG, ~90% mais
leves.

Ao substituir uma imagem provisória por uma foto:

1. Salve o arquivo em `assets/img/banners/` (evite espaços e maiúsculas no
   nome; JPEG/WebP são melhores que PNG para fotos).
2. Aponte o campo `image` desse banner em `assets/js/data/banners.js`.
3. **Remova a linha `placeholder: true`** desse banner — é ela que exibe o
   aviso "Imagem provisória — XX / YY" sobre a foto.
4. Ajuste o `alt` descrevendo o que a foto mostra.

Para **adicionar** um banner, inclua um novo objeto no array. Nenhuma alteração
de HTML ou CSS é necessária:

```js
{
  image: 'assets/img/banners/banner-04.jpg',
  alt: 'Descrição da imagem (acessibilidade e SEO).',
  eyebrow: 'Rótulo técnico',
  title: 'Título do banner',
  text: 'Texto de apoio.',
  cta: { label: 'Solicitar orçamento', href: 'contato.html' },
  ctaAlt: { label: 'Ver serviços', href: 'servicos.html' }, // opcional
  // placeholder: true,  // só enquanto a imagem for provisória
}
```

> O primeiro banner da lista é o `<h1>` da página inicial (SEO). Os demais usam
> `<h2>`.

## Animação de soletração do título do banner

O título principal de cada banner é revelado **letra por letra**, com a letra
que está entrando destacada em laranja (`#F48009`). A troca de banner não usa
intervalo fixo: acontece quando a soletração termina, somada ao tempo de
leitura.

```
duração do banner = nº de caracteres do título × letterDelay + postTypingDelay
```

Configuração em `assets/js/data/site.js`, bloco `carousel`:

| Campo                  | Padrão  | Para que serve                                                   |
| ---------------------- | ------- | ---------------------------------------------------------------- |
| `letterDelay`          | `55`    | Tempo entre a entrada de cada letra, em ms. Menor = mais rápido.  |
| `postTypingDelay`      | `1700`  | Tempo com o título completo na tela antes de avançar, em ms.      |
| `respectReducedMotion` | `false` | Se `true`, quem tem "reduzir animações" no sistema vê o título completo de uma vez, sem soletração. Se `false`, a soletração acontece para todos. |

Com os valores padrão: título de 50 caracteres ≈ 4,5 s; de 44 caracteres ≈ 4,1 s.

Os títulos continuam vindo de `assets/js/data/banners.js` — o componente não
duplica nenhum texto. Acentos, pontuação e espaços são preservados.

Como o texto ocupa o layout final desde o início (apenas a opacidade das
letras muda), não há reposicionamento de linhas durante a animação, e a
divisão de palavras é a mesma do texto normal.

Trocar de banner pelas setas, indicadores, swipe ou teclado cancela o ciclo
anterior e reinicia a soletração do novo banner do zero. O carrossel segue
funcionando normalmente em qualquer uma das configurações abaixo.

### Por que a soletração "não aparece" em alguns computadores

No **Windows**, desligar *Configurações → Acessibilidade → Efeitos visuais →
Efeitos de animação* faz o Chrome reportar `prefers-reduced-motion: reduce` para
todas as páginas. Com `respectReducedMotion: true`, o site entende isso como
"o usuário não quer animação" e mostra o título completo de uma vez — o
comportamento correto do ponto de vista de acessibilidade, mas que faz o efeito
parecer ausente.

- Para o efeito aparecer **sempre**, mantenha `respectReducedMotion: false`
  (padrão atual). As demais animações da página (revelação no scroll, zoom das
  imagens) continuam sendo desativadas para quem pede menos movimento.
- Para **respeitar integralmente** a preferência do sistema, use
  `respectReducedMotion: true`.

Para testar no Chrome com a preferência desligada sem mexer no sistema:
DevTools → `Ctrl+Shift+P` → *Show Rendering* → em **Emulate CSS media feature
prefers-reduced-motion** escolha `no-preference`.

## Trocar as demais imagens

Substitua os arquivos em `assets/img/` pelas fotos reais mantendo o mesmo nome
de arquivo. Se preferir outro nome/formato, atualize o caminho `image` no
arquivo de dados correspondente.

Regenerar os placeholders:

```bash
npm run placeholders
```

## Serviços: página inicial x página Serviços

As duas áreas usam o **mesmo componente** (`assets/js/components/services.js`),
com a mesma linguagem visual — imagem, índice laranja, título, texto, lista de
escopo e link. O que muda é apenas a quantidade de conteúdo.

| Área           | Blocos                              | Texto   | Itens de escopo | Link                                                        |
| -------------- | ----------------------------------- | ------- | --------------- | ----------------------------------------------------------- |
| Página inicial | só os marcados com `featured: true` | `short` | 3               | "Ver detalhes completos" → serviço na página Serviços        |
| Página Serviços| todos                               | `scope` | 4               | "Solicitar orçamento"                                       |

O rótulo **"Serviço 0X / 09"** é a posição do serviço em `data/services.js` e
é o mesmo nas duas páginas, para o visitante reconhecer o serviço ao clicar em
"Conheça todos os serviços".

Para escolher quais serviços aparecem na página inicial, marque
`featured: true` no serviço desejado em `assets/js/data/services.js`.

### Imagens dos serviços

Tamanho de referência: **1200 × 900 px (4:3)**, que é a proporção usada nos
blocos (a mesma na página inicial e na página Serviços).

| Serviço | Arquivo | Foto |
| ------- | ------- | ---- |
| 01 — Montagem Eletromecânica | `assets/img/services/servico-01.jpg` | montagem de transportador de correia (350 KB) |
| 02 — Montagem Elétrica e Instrumentação | `assets/img/services/servico-02.jpg` | teste de painel elétrico com multímetro (198 KB) |
| 03 — Manutenção Industrial | `assets/img/services/servico-03.jpg` | manutenção em equipamento rotativo, com placas de revestimento (392 KB) |
| 05 — Caldeiraria Pesada e Fabricação | `assets/img/services/servico-05.jpg` | interior de moinho, placas de revestimento e esferas de moagem (297 KB) |
| 06 — Soldagem Industrial | `assets/img/services/servico-06.jpg` | soldador com máscara executando solda, com faíscas (209 KB) |
| 04, 07, 08 e 09 | `servico-04.svg`, `servico-07.svg`, `servico-08.svg`, `servico-09.svg` | ainda são placeholders (gerados por `npm run placeholders`) |

### Origem das fotos (arquivos mestres)

As fotos enviadas ficam numeradas na pasta `projects/`. Correspondência atual:

| Mestre | Onde é usada |
| ------ | ------------ |
| `projects/2.png` | `services/servico-01.jpg` |
| `projects/3.jpg` | `services/servico-02.jpg` (recortada de 2252 × 4003 para 4:3) |
| `projects/4.jpeg` | `services/servico-03.jpg` (copiada sem recompressão) |
| `projects/1.png` | `services/servico-05.jpg` (recortada de 1127 × 1396 para 4:3) |
| `projects/5.jpg` | `services/servico-06.jpg` (recortada de 2304 × 4096 para 4:3) |

Ao trocar um placeholder por uma foto real, preencha também o campo
**`imageAlt`** desse serviço em `data/services.js` descrevendo o que a imagem
mostra. Sem ele, o componente usa "<título> — imagem ilustrativa".

### Moldura técnica das fotos

A classe reutilizável **`.media-frame--tech`** (em `components.css`) desenha a
moldura industrial sobre a foto: filete fino em preto chumbo com filete claro
companheiro, cantoneiras em laranja nos quatro cantos e uma vinheta interna
discreta. É feita só com pseudo-elementos, então **não altera layout, proporção
nem recorte** da imagem — e o zoom do hover acontece dentro da moldura, que
fica fixa.

Onde está aplicada hoje: nos blocos `.service-detail`, ou seja, na **página
Serviços**, na **prévia de serviços da página inicial** e na **página
Segmentos** (que usam o mesmo componente).

Para aplicar em outra foto, basta somar a classe ao elemento que já tem
`media-frame`:

```html
<figure class="media-frame media-frame--zoom media-frame--tech aspect-4x3">
```

## Preencher canais de contato

Edite `assets/js/data/site.js`, no bloco `contact`. Enquanto um canal estiver
como `null`, o site exibe "Aguardando definição" (nenhum dado é inventado).

```js
contact: {
  phone:     { label: '(35) 0000-0000', href: 'tel:+553500000000' },
  whatsapp:  { label: 'WhatsApp', href: 'https://wa.me/553500000000' },
  email:     { label: 'contato@dominio.com.br', href: 'mailto:contato@dominio.com.br' },
  instagram: { label: '@perfil', href: 'https://instagram.com/perfil' },
  linkedin:  { label: 'MHR Industrial', href: 'https://linkedin.com/company/perfil' },
}
```

O botão flutuante de WhatsApp não foi criado de propósito: assim que o número
existir, o mesmo objeto `whatsapp` pode alimentar um botão adicional.

## Logo

A logo definitiva está em `assets/img/media/`, em duas variantes:

| Arquivo | Lettering | Usada em |
| ------- | --------- | -------- |
| `logo.svg` | claro (silver/branco) | fundos escuros: rodapé e menu mobile |
| `logo-dark.svg` | escuro (grafite) | fundo claro: header |

As duas variantes mantêm o **emblema original** (engrenagem, ferramenta e
monograma, em prata e laranja); `logo-dark.svg` altera apenas as formas do
lettering (M, R e a assinatura — o H permanece laranja), para leitura sobre
fundo claro, sem adicionar nenhum fundo atrás da marca.

Como a logo é um SVG transparente e o `base.css` aplica um fundo a toda tag
`img`, o `.brand__logo` restaura `background: none` para não aparecer nenhuma
placa atrás da marca.

O componente `assets/js/components/logo.js` (`brand()`) escolhe a variante
conforme o contexto — o header chama `brand()` (variante escura) e o rodapé e o
menu mobile chamam `brand({ light: true })` (variante clara). Para trocar a
logo, substitua os dois arquivos mantendo os nomes; nenhum HTML precisa mudar.

A altura da logo é definida por CSS em `.brand__logo` (ajustes por contexto em
`.site-header`, `.site-footer` e `.mobile-nav__head`), preservando a proporção
original do arquivo.

## Domínio definitivo

Antes de publicar, substitua `SEU-DOMINIO.com.br` pelo domínio real em:
`robots.txt`, `sitemap.xml` e nas tags `canonical` / `og:url` / `og:image` de
todas as páginas HTML.

## JavaScript

O header, o footer e as seções com conteúdo repetitivo (banners, serviços,
segmentos, entregáveis) são montados por JavaScript a partir dos
arquivos em `assets/js/data/`. Vantagens: um único lugar para editar o conteúdo
e nenhuma duplicação de HTML entre as 8 páginas.

Consequências:

- Com o JavaScript desativado o conteúdo de texto continua visível (as animações
  de entrada não são aplicadas) e a página inicial exibe um banner alternativo
  dentro de `<noscript>`, incluindo o `<h1>`. A navegação do header, porém,
  depende de JavaScript.
- Buscadores (Google) executam JavaScript, então header, footer e seções
  dinâmicas são indexados normalmente.
- O `<h1>` da página inicial vem do primeiro banner em `data/banners.js`. Se o
  título principal mudar, mantenha o `<noscript>` de `index.html` em sincronia.

## Observações

- Não há dados fictícios: clientes, números, certificações, telefone, WhatsApp
  e redes sociais ficam como espaços reservados até a informação real existir.
- As certificações têm área reservada em `seguranca-qualidade.html`.
- O formulário de contato valida os campos no cliente e exibe uma confirmação;
  para envio real, conecte o `submit` em `assets/js/components/contact.js` a um
  endpoint ou serviço de e-mail.
