# Xpectrum API Docs

Documentation site for the Xpectrum API v1 (`https://api.cloud.xpectrum.dev/v1`).

Built with Next.js (App Router). Pages live under `app/docs/*/page.tsx`; shared UI (code blocks, callouts, tables, sidebar) under `app/components/`.

## Develop

```bash
npm install
npm run dev   # http://localhost:3000
```

## Build

```bash
npm run build
```

## Deploy

The site is hosted on Vercel (xpectrum.dev). Deploys are manual:

```bash
vercel --prod
```
