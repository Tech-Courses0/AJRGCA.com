# AJRG and Associates — AJRGCA.com

> 🧑‍💼 **Non-technical and just want to edit content** (text, contact details, team,
> services, articles)? Read **[HOW-TO-EDIT-THIS-WEBSITE.md](./HOW-TO-EDIT-THIS-WEBSITE.md)** instead — it's in plain English. The notes below are for developers.

Next.js 15 marketing site for AJRG and Associates, Chartered Accountants.
Design system: **"Royal Minimalist"** (Deep Navy · Regal Purple · Gold · Lavender-Grey canvas),
Playfair Display + Inter, Tailwind CSS, Framer Motion, Lucide icons.

## Project structure

- `app/` — routes (App Router). `app/insights/[slug]` is the Knowledge Center (ISR).
- `components/` — `layout/` (Navbar mega menu, Footer), `sections/` (BentoGrid, ComplianceCalendar, CTASection), `ui/`.
- `config/site.ts` — single source of truth for firm facts (FRN, registered office, disclaimers). ⚠️ contains `TODO` placeholders for statutory identifiers — fill these before launch.
- `data/` — services, industries, partners, articles, compliance calendar.
- `lib/icons.ts` — string-key → Lucide icon map (keeps server data serializable).
- `types/` — shared TypeScript types.

## Local preview

```bash
npm install
npm run dev -- --port 3001
```

## Deploy (Vercel)

This site uses **Incremental Static Regeneration (ISR)** for the Knowledge Center,
which requires a Node runtime — deploy to **Vercel** (not a static host).

1. Push the repository to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects Next.js. No config needed.
3. Knowledge Center articles revalidate hourly (`revalidate = 3600`); edits to `data/articles.ts` go live without a full redeploy.

### Custom domain

1. In the Vercel project: **Settings → Domains → Add** `ajrgca.com`.
2. At your registrar, point DNS to Vercel:
   - `A` record for the apex (`@`) → Vercel's IP, **or** an `ALIAS`/`ANAME` to `cname.vercel-dns.com`.
   - `CNAME` for `www` → `cname.vercel-dns.com`.
3. HTTPS is provisioned automatically.

> The legacy `CNAME.example` and GitHub Pages references have been retired in favour of Vercel.

## Before launch — checklist

- [ ] Fill statutory `TODO`s in `config/site.ts` (FRN, registered office, PIN).
- [ ] Fill ICAI membership numbers in `data/index.ts` (partner `icaiNote`).
- [ ] Add `public/og-image.png` (1200×630) and `public/favicon.ico`.
- [ ] Review all copy against ICAI advertising guidelines.
