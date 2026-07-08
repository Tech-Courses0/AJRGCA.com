# Visual CMS Editor — Build Guide

A portable spec for the in-place visual editor used on ajrgca.com. Hand this
file to Claude in another Next.js project and say: **"Build the visual editor
described in this doc for this site."** It documents the architecture, the exact
file layout, every gotcha, and the invariants that make it work.

The editor lets a single non-technical owner edit the live site inline —
click any text, image, list, icon, colour, or global setting — with autosave,
undo/redo, draft-vs-live separation, and one-click Publish. No page builder, no
per-field admin forms: the public components ARE the editor surface.

---

## 1. Core idea

Every public component receives its data as a `content` prop and renders
editable primitives (`<EditableText>`, `<EditableImage>`, …) instead of raw
strings. Those primitives do two things depending on context:

- **Public site** (no editor provider): render the plain `value` prop. Zero
  overhead, zero editor code shipped in the interactive path.
- **Inside `/admin/editor`** (wrapped in `<EditorProvider>`): render an
  editable control bound to a **dot-path** into the content tree
  (e.g. `"hero.subtitle"`, `"services.2.title"`). Edits update in-memory state,
  autosave to a **draft** row, and Publish copies draft → **live**.

The switch is a single hook, `useEditor()`, which returns `isEditing: false`
when there's no provider. This is the linchpin — the same component works on
both the public page and inside the editor with no branching at the call site.

---

## 2. Data flow (memorise this)

```
config/site.ts + data/*.ts        ← build-time defaults (hardcoded seed)
        │
        ▼
lib/content.ts  defaultContent()  ← assembles the full SiteContent seed
        │
        ▼
Postgres table site_content       ← two rows: id='draft', id='live'
   (JSONB `data` column)              stored value is deepMerge'd over
        │                              defaultContent() on read, so the schema
        │                              can grow without re-seeding old rows
        ├── getLiveContent() ──► public pages (props)   [force-dynamic]
        └── getDraftContent() ─► /admin/editor (props → EditorProvider)
```

- **Public pages** call `getLiveContent()` in the server component and pass the
  result down as props. They MUST be `export const dynamic = 'force-dynamic'`
  so a Publish shows up immediately without a redeploy. (Static rendering would
  bake content in at build time — the #1 "why don't my edits show" trap.)
- **The editor page** calls `getDraftContent()` and hands it to `<EditorShell>`
  → `<EditorProvider initialContent=…>`.
- Reads are cheap enough (one JSONB row) that no cache layer is used. Don't add
  one unless traffic demands it — cache invalidation on Publish is complexity
  you don't need.

### deepMerge / overlay rule
On read, the stored row is `deepMerge(defaultContent(), storedRow)`:
- plain objects merge key-by-key (new schema fields fall back to defaults),
- **arrays and primitives from the stored row replace wholesale** (so the
  owner's deletes/reorders/edits stick and never element-merge with defaults).

This is what lets you ship new content fields later without a migration.

---

## 3. Persistence & content model

### DB (Postgres; Neon on Vercel, any Postgres on a VPS)
```sql
create table if not exists site_content (
  id text primary key check (id in ('draft', 'live')),
  data jsonb not null,
  updated_at timestamptz not null default now()
);
```
`lib/db.ts` returns `null` when `DATABASE_URL` is unset so the whole site still
renders from `defaultContent()` with zero DB config. Writes throw a clear error
in that case.

### lib/content.ts — the whole persistence surface
```
defaultContent(): SiteContent          // build the seed from config + data/*
readRow(id): deepMerge(default, stored) // overlay stored over defaults
getLiveContent()   → live row  ?? defaultContent()
getDraftContent()  → draft row ?? live row ?? defaultContent()
saveDraftContent(content)              // upsert draft
publishContent()                       // copy draft → live
discardDraft()                         // copy live → draft (throw away edits)
```

### types/content.ts — `SiteContent`
One big typed tree: `site` (global settings), `theme`, `nav`, `footer`, plus a
key per page/section (`hero`, `services`, `industries`, `pages`, `layout`, …).
The `site` object is the "global settings" surface edited via the Settings
panel, not inline. Keep it a plain-data mirror (no functions) so it serialises
to JSONB.

---

## 4. Auth (single-owner, no user table)

Two env vars, a cookie, and middleware. No accounts, no DB users.

```
EDITOR_USERNAME   the login username
EDITOR_SECRET     the password AND the cookie value (they're the same string)
```

- `app/api/admin/login/route.ts` (**POST**): checks `{username, secret}` against
  the two env vars; on match sets cookie `ajrg_admin=<EDITOR_SECRET>`
  (`HttpOnly; Secure in prod; SameSite=Lax; Path=/; Max-Age=30d`). Includes a
  tiny in-memory IP rate-limiter (8 tries / 15 min) — fine for a single-owner
  site; move to KV if it ever runs multi-instance.
- `proxy.ts` (Next.js middleware — **filename is `proxy.ts` on Next 15.5+/16**,
  `middleware.ts` on older; exports the gate + a `config.matcher`): gates
  `/admin/editor/*` and `/api/admin/*` (except `login`/`logout`). Passes when
  `cookie === EDITOR_SECRET`, else 401 for API and 307→`/admin/login` for pages.
- `app/api/admin/logout/route.ts` (**POST — never GET**): deletes the cookie.

> ### ⚠️ THE GOTCHA THAT COST HOURS — logout MUST be POST
> If logout is a `GET` and the Exit control is a Next.js `<Link href=…>`,
> **Next.js prefetches the link in production** → rendering the editor silently
> fires logout → the session cookie is deleted before the first edit → every
> save returns 401 "Save failed". It works perfectly in `next dev` because dev
> disables Link prefetch — a textbook works-local-breaks-prod trap.
>
> **Rule:** any state-mutating endpoint (logout especially) is a `POST`
> triggered by an `onClick` fetch, never a prefetchable `GET` `<Link>`.

Keep this editor secret separate from any other admin secret (e.g. a Google/
OAuth connect key) so rotating the editor password never breaks other flows.

---

## 5. API routes (all under `app/api/admin/`, all gated by proxy)

| Route | Method | Does |
|---|---|---|
| `login`   | POST | set `ajrg_admin` cookie |
| `logout`  | POST | delete cookie |
| `content` | GET  | return draft content |
| `content` | PATCH| `saveDraftContent(body)` (autosave target) |
| `publish` | POST | `publishContent()` (draft → live) |
| `discard` | POST | `discardDraft()` (live → draft) |
| `upload`  | POST | image upload → Vercel Blob, or `public/uploads/` fallback when no `BLOB_READ_WRITE_TOKEN`. Validates type (jpg/png/webp/gif/svg) + 5 MB cap. |

Routes carry no auth logic of their own — the proxy is the single gate.

---

## 6. Client state — `EditorContext.tsx`

`EditorProvider` holds the whole content tree as an **undo/redo history array**
+ index. `useEditor()` exposes:

```ts
isEditing, content, getValue(path), setValue(path, value),
undo, redo, canUndo, canRedo,
saveStatus,                       // 'idle'|'saving'|'saved'|'error'
publish, publishing, published,
discardDraft
```

- `setValue(path, value)` → `setPath(content, path, value)` (immutable, see
  `lib/objectPath.ts` — a ~30-line dot-path get/set, no lodash), pushes onto
  history, and schedules a **debounced autosave** (800 ms) that PATCHes
  `/api/admin/content`. `res.ok ? 'saved' : 'error'` drives the toolbar label.
- **`useEditor()` returns `isEditing: false` and no-op fns outside a provider.**
  This is deliberate: the same `<EditableText>` renders on the public site.

`lib/objectPath.ts` provides `getPath`, `setPath` (immutable), and `deepMerge`.

---

## 7. Editable primitives — `components/editable/`

Each primitive: on public site render plain `value`; in editor render a bound
control. All take a `path` (dot-path) + a `value` (current/fallback).

| Component | Edits | Notes |
|---|---|---|
| `EditableText`     | single-line string | `contentEditable`; optional `hrefPath` shows a link chip + warned URL editor |
| `EditableRichText` | HTML string | bold/italic/lists toolbar; sanitised |
| `EditableImage`    | image URL | click → upload via `/api/admin/upload` |
| `EditableRepeater` | arrays | add / reorder / duplicate / delete list items |
| `IconField`        | icon key | popover grid of a curated lucide set |
| `SettingsPanel`    | `site.*` globals | firm name, FRN, offices, phone, email, legal text, socials |
| `ThemePanel`       | `theme` | preset palette + per-token colour overrides |
| `EditorToolbar`    | — | page tabs, undo/redo, save status, Theme/Settings, Discard, **Exit (POST)**, Publish |
| `EditorDrawer`     | — | slide-over host for the Theme/Settings panels |
| `EditorContext`    | — | provider + `useEditor()` |

### The critical `contentEditable` invariant (do NOT regress)
`EditableText`/`EditableRichText` set their text **once, imperatively** via a ref
callback (`node.textContent = …`), and never hand the content back to React as
children or `dangerouslySetInnerHTML`. Reason: if React owns the text, every
re-render (e.g. the toolbar updating save status) rewrites the text node and
**collapses the live selection/caret** mid-edit. Also: keep the element
**always** `contentEditable` in edit mode — never toggle it on a focused element
(toggling blurs it to `<body>` and kills selection + the dirty outline). Emit
exactly one outline colour at a time (dirty = blue, else transparent+hover);
two `outline-*` utilities at equal specificity let Tailwind's last-emitted win
and the border silently never paints.

---

## 8. Editor shell — `app/admin/editor/`

```
page.tsx        server component: getDraftContent() → <EditorShell initialContent=…>
EditorShell.tsx 'use client': <EditorProvider> + <EditorToolbar> + the selected
                page view + Theme/Settings drawers.
```
- Page tabs switch which public "page view" renders inside the provider (Home,
  About, Services, …). Each page view is the SAME component the public route
  uses, fed `content`.
- `onClickCapture` on the wrapper calls `e.preventDefault()` for any `<a href>` —
  inside the editor, clicking a link must NOT navigate; you edit in place and
  switch pages via toolbar tabs.

---

## 9. Theme + icons (optional but included)

- `lib/themes.ts`: curated palette presets. `theme.presetId` selects one;
  `theme.tokens` holds per-token overrides. Resolved = preset + overrides,
  applied as CSS custom properties (`--accent`, `--ink`, …) via a
  `ThemeStyleLive` component in the editor and the normal stylesheet publicly.
- `lib/icons.ts`: a single `iconMap` (curated lucide keys) + `FALLBACK_ICON` +
  `getIcon(key?)` that tolerates unknown/missing keys. `IconField` renders the
  grid; public components call `getIcon(content-stored-key)`.

---

## 10. Build order (what Claude should do to replicate)

1. **Content model**: define `types/content.ts` (`SiteContent`) + `config/site.ts`
   + `data/*` seeds + `lib/content.ts` (`defaultContent`, read/write, publish,
   discard) + `lib/db.ts` + the `site_content` SQL.
2. **Make public pages prop-driven + `force-dynamic`**, reading `getLiveContent()`.
3. **`lib/objectPath.ts`** (getPath/setPath/deepMerge).
4. **`EditorContext.tsx`** (provider, history, debounced autosave, publish/discard).
5. **Primitives** (`EditableText` first — it sets the contentEditable pattern).
6. **API routes** (`login` POST, `logout` POST, `content` GET/PATCH, `publish`,
   `discard`, `upload`).
7. **`proxy.ts`** middleware gate + matcher.
8. **Editor shell** (`page.tsx` + `EditorShell.tsx`) + toolbar/drawers/panels.
9. **Env**: `EDITOR_USERNAME`, `EDITOR_SECRET`, `DATABASE_URL`, optional
   `BLOB_READ_WRITE_TOKEN`. Run the `site_content` DDL once against the DB.

## 11. Deploy checklist (don't get burned again)
- [ ] All public pages `force-dynamic` (else Publish needs a redeploy).
- [ ] `site_content` table created in the target DB.
- [ ] `EDITOR_USERNAME` + `EDITOR_SECRET` set in the deploy env **and** the
      running build was deployed *after* they were added (env changes need a
      redeploy/restart to load).
- [ ] Logout is **POST**; Exit is an `onClick` fetch, not a `<Link>`.
- [ ] `DATABASE_URL` set; `BLOB_READ_WRITE_TOKEN` set if you want cloud image
      uploads (else images land in `public/uploads/`).
- [ ] Cookie is `Secure` in prod → the site must be served over HTTPS.

---

### One-line prompt to reuse this
> "Add the visual CMS editor from `docs/VISUAL-EDITOR.md` to this site: prop-drive
> the public components from `getLiveContent()` (force-dynamic), add the
> draft/live `site_content` store, the `EditorProvider` + editable primitives,
> the gated `/admin/editor` + `/api/admin/*` routes, and the `EDITOR_USERNAME`/
> `EDITOR_SECRET` auth. Logout is POST. Match the invariants in that doc."
