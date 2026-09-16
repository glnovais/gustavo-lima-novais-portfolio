# Gustavo Lima Novais — Portfólio de Infraestrutura

Portfólio profissional de Gustavo Lima Novais, Analista de Infraestrutura N2, com foco em infraestrutura corporativa, Active Directory, Windows Server, redes, PowerShell, monitoramento e governança de TI.

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React

## Rodar localmente

Requisitos: Node.js 20 recomendado.

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
```

A saída é gerada em `dist/`.

Para validar o build localmente:

```bash
npm run start
```

## Hospedagem gratuita

O projeto já inclui fallback de rotas SPA para Vercel, Netlify e plataformas compatíveis com `_redirects`.

### Vercel

1. Envie o projeto para um repositório Git.
2. Importe o repositório na Vercel.
3. Framework: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.

O arquivo `vercel.json` já cuida das rotas internas do React Router.

### Netlify

1. Importe o repositório na Netlify.
2. Build command: `npm run build`.
3. Publish directory: `dist`.

O arquivo `netlify.toml` e `public/_redirects` já estão preparados.

### Cloudflare Pages

1. Conecte o repositório ao Cloudflare Pages.
2. Framework preset: Vite.
3. Build command: `npm run build`.
4. Build output directory: `dist`.

O arquivo `public/_redirects` mantém as rotas do portfólio funcionando ao acessar páginas internas diretamente.

## Dados profissionais

Os principais dados ficam centralizados em:

```text
src/config/profile.ts
```

Ali estão nome, cargo, e-mail, LinkedIn, GitHub, localização, foto e currículo.

## Conteúdo

- Experiência: `src/data/experience.ts`
- Projetos/cases: `src/data/projects.ts`
- Skills: `src/data/skills.ts`
- Português: `src/locales/pt-BR.ts`
- Inglês: `src/locales/en-US.ts`
- Espanhol: `src/locales/es-ES.ts`

## Foto e currículo

```text
public/images/gustavo-lima-novais.webp
public/resume/gustavo-lima-novais.pdf
```

## Screenshots de projetos

As pastas abaixo estão prontas para receber imagens revisadas e anonimizadas:

```text
public/projects/active-directory/
public/projects/automation/
public/projects/group-policy/
public/projects/zabbix/
public/projects/glpi/
public/projects/governance/
public/projects/admin-center/
```

Antes de publicar qualquer captura real, oculte identificadores internos, endereços, usuários, grupos, caminhos, credenciais, tokens e detalhes de produção.

## Privacidade

Os diagramas públicos usam identificadores genéricos. Não devem ser publicados dados internos de domínio, IPs de produção, VLANs reais, hostnames, credenciais, caminhos UNC ou topologias que permitam reconhecer a infraestrutura de uma organização.
