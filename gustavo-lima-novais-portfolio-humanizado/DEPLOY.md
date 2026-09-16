# Publicação

Este projeto é uma SPA React/Vite e está preparado para hospedagem em serviços com plano gratuito.

## Opção recomendada: Vercel

- Conecte o repositório Git.
- Framework: Vite.
- Build command: `npm run build`.
- Output directory: `dist`.
- Node.js: 20.

`vercel.json` mantém as rotas internas funcionando após atualização direta da página.

## Netlify

- Build command: `npm run build`.
- Publish directory: `dist`.
- Node.js: 20.

`netlify.toml` e `public/_redirects` já estão configurados.

## Cloudflare Pages

- Framework preset: Vite.
- Build command: `npm run build`.
- Output directory: `dist`.
- Node.js: 20.

`public/_redirects` e `public/_headers` serão copiados para o build.

## Antes de publicar

1. Confirme LinkedIn e e-mail em `src/config/profile.ts`.
2. Substitua o currículo em `public/resume/` quando houver nova versão.
3. Não publique screenshots sem anonimização.
4. Rode `npm run build` e valide `npm run start`.
