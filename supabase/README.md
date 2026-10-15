# Painel administrativo — configuração do Supabase

Este diretório contém o SQL que prepara o Supabase para o painel do cliente
(`/admin/`) e para o carregamento remoto do site.

> **Nada aqui contém credenciais.** As chaves são preenchidas por você, no passo 4.

## Passo 1 — Criar o projeto no Supabase

1. Acesse <https://supabase.com> e faça login.
2. **New project** → nome sugerido `mhr-site`, defina a senha do banco, região
   **South America (São Paulo)** e crie.
3. Depois de pronto, guarde (em **Project Settings → API**):
   - **Project URL** → ex.: `https://xxxxxxxxxxxx.supabase.co`
   - **anon public key** (a `service_role` **não** é usada no site)

## Passo 2 — Rodar o SQL (SQL Editor → New query → colar → Run)

Na **ordem**:

| Ordem | Arquivo | O que faz |
| --- | --- | --- |
| 1º | `supabase/01-schema.sql` | Tabelas `content` e `site_members`, RLS e funções |
| 2º | `supabase/02-storage.sql` | Bucket `site-images` + políticas do Storage |
| 3º | `supabase/03-seed.sql` | **Dados iniciais** (idênticos ao site atual) |

O `03-seed.sql` é gerado por `node tools/export-content.mjs` — rode de novo
sempre que quiser reexportar os dados locais como ponto de partida.

## Passo 3 — Criar o usuário do cliente e autorizá-lo

1. **Authentication → Users → Add user** → informe o **e-mail** e uma **senha**
   do cliente (ele pode trocar depois em "Forgot password").
2. Copie o **UUID** do usuário criado (coluna *UID*).
3. No **SQL Editor**, rode (trocando o e-mail):

```sql
insert into public.site_members (user_id, site_slug)
select id, 'mhrengenharia'
from auth.users
where email = 'email-do-cliente@dominio.com'
on conflict do nothing;
```

> Sem essa linha, o usuário **consegue entrar** no painel mas **não consegue
> salvar** (as políticas RLS bloqueiam). É essa associação que garante que
> ninguém edite dados de outro cliente.

## Passo 4 — Preencher a configuração no site

Abra `assets/js/data/supabase.config.js` e preencha:

| Variável | O que colocar |
| --- | --- |
| `url` | **Project URL** (ex.: `https://xxxxxxxxxxxx.supabase.co`) |
| `anonKey` | **anon public key** |
| `siteSlug` | `mhrengenharia` (não alterar) |
| `bucket` | `site-images` (não alterar) |
| `enabled` | `true` para o site passar a ler do Supabase |

Com `enabled: false` (padrão), **o site continua exatamente como está hoje**,
usando os dados locais — zero risco.

## Passo 5 — Verificar

1. Com `enabled: true`, abra o site e confirme que serviços, segmentos, hero,
   contato etc. aparecem normalmente.
2. Simule queda/erro (ex.: apague a `url` ou fique offline) e recarregue: o
   site deve cair no **fallback local** e continuar completo, sem tela branca.
3. Entre em `/admin/` com o usuário do Passo 3, altere um serviço, salve e
   recarregue o site para ver a alteração.

## Segurança (resumo)

- **`anon key`**: pública por design — é o que o site usa para ler.
- **`service_role`**: **nunca** vai para o navegador nem para o repositório.
- **RLS**: leitura pública; escrita apenas para membros do site
  (`site_members`), separada por `site_slug`.
- **Storage**: leitura pública; escrita apenas autenticada e apenas na pasta
  do próprio site (`mhrengenharia/...`), com limite de 5 MB e tipos de imagem
  permitidos.
- O conteúdo é salvo como **texto/JSON puro** — o site já escapa tudo na
  exibição, então não há injeção de HTML.

## Estrutura das coleções (tabela `content`)

| `key` | Conteúdo |
| --- | --- |
| `site` | Nome, CNPJ, endereço, área, contato, redes, menu, tempos do carrossel |
| `banners` | Slides do hero (imagem, alt, eyebrow, título, texto, CTA) |
| `services` | 9 serviços (título, resumo, escopo, bullets, aplicações, imagem, destaque) |
| `segments` | 4 segmentos (título, resumo, bullets, imagem, CTA) |
| `engineering` | Fluxo, entregáveis e responsabilidade |
| `pillars` | Faixa de diferenciais (4 itens) |
| `footer` | Texto institucional + colunas de links do rodapé |
| `logo` | Arquivos da logo (clara e escura) |

## Arquivos no repositório

```
supabase/
  01-schema.sql     tabelas + RLS
  02-storage.sql    bucket + políticas
  03-seed.sql       dados iniciais (gerado)
  README.md         este guia
tools/
  export-content.mjs   gera o 03-seed.sql a partir dos dados locais
assets/js/data/
  supabase.config.js   url/anonKey/enabled (você preenche)
```
