# Kushal Poudel Portfolio

Frontend-only React portfolio built with Vite, Tailwind CSS and Framer Motion.

## What changed

- Public portfolio content now lives in `src/data/portfolioData.js`.
- The live site does **not** require Laravel, a database, Google OAuth, or `VITE_API_URL`.
- Project and blog detail pages are client-side React routes.
- The contact form opens the visitor's email app with a pre-filled message instead of posting to an API.
- The old backend/admin source can remain separate for future use; it is not part of the public runtime.

## Run locally

```bash
npm install
npm run dev
```

No `.env` file is required for the public portfolio.

## Production build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

Import this folder as the project root. Vercel should detect Vite automatically.

- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: none required

`vercel.json` already includes SPA rewrites for project and blog detail routes.
