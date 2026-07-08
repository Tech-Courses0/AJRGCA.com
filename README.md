# AJRG and Associates — AJRGCA.com

Next.js marketing site for AJRG and Associates, Chartered Accountants, with a
built-in **visual CMS editor** so the firm can edit the live site inline.
Design system: **"Royal Minimalist"** (Deep Navy · Regal Purple · Gold ·
Lavender-Grey), Playfair Display + Inter, Tailwind CSS, Lucide icons.

## Editing content

All site content — text, contact details, team, services, articles, photos,
colours — is edited in the browser at **`/admin/editor`** (log in at
`/admin/login`). Edits autosave to a draft; **Publish** pushes them live with no
redeploy. See:

- **[docs/CLIENT-CHECKLIST.md](./docs/CLIENT-CHECKLIST.md)** — what the owner
  fills in the editor + the few launch tasks that live outside it.
- **[docs/VISUAL-EDITOR.md](./docs/VISUAL-EDITOR.md)** — full editor
  architecture, gotchas, and a portable spec to rebuild it in another site.
- **[docs/PRODUCT.md](./docs/PRODUCT.md)** — product/brand notes.

## Content architecture (short version)

`config/site.ts` + `data/*` seed `defaultContent()` (`lib/content.ts`), stored as
**draft/live** rows in Postgres (`site_content`). Public pages are
`force-dynamic` and render from `getLiveContent()` passed as props, so a Publish
shows immediately. The editor renders the same components inside `EditorProvider`.

## Project structure

- `app/` — routes (App Router). `app/admin/editor` is the visual editor;
  `app/api/admin/*` are its gated endpoints.
- `components/` — `layout/`, `sections/`, `ui/`, and `editable/` (the editor
  primitives: `EditableText`, `EditableImage`, `EditableRepeater`, …).
- `config/site.ts` — build-time seed for firm facts (now owner-editable at runtime).
- `data/` — services, industries, partners, articles, compliance calendar.
- `lib/` — `content.ts` (persistence), `db.ts`, `objectPath.ts`, `icons.ts`,
  `themes.ts`.
- `proxy.ts` — middleware gating `/admin/editor` + `/api/admin/*`.
- `scripts/init-db.sql` — run once against `DATABASE_URL`.

## Local dev

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev
```

## Deploy

Node runtime required (Postgres reads, dynamic rendering). Currently on **Vercel**
(auto-deploys production on push to `main`); a VPS with `next start` behind
`pm2`/systemd works identically. Set the env vars from `.env.example`, run
`scripts/init-db.sql` once, and see the deploy checklist in
[docs/VISUAL-EDITOR.md](./docs/VISUAL-EDITOR.md).

### Custom domain
Point `ajrgca.com` at the host (Vercel: Settings → Domains + registrar DNS; VPS:
A record → server IP), then serve over HTTPS (the editor cookie is `Secure`).
