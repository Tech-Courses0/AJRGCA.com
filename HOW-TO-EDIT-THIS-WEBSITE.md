# 📖 How to Edit This Website — Plain-English Guide

This is the website for **AJRG and Associates** (ajrgca.com).
This guide is written for a **non-technical person**. You do **not** need to be a
programmer to change the text, contact details, team, services, or articles.

> 💡 **Golden rule:** You almost never need to touch anything except the files
> listed in the table below. If a folder isn't in the table, you can ignore it.

---

## 🧭 "I want to change ___ " → open this file

| I want to change... | Open this file | What you'll edit |
|---|---|---|
| **Phone, email, office address, firm name, legal disclaimer** | `config/site.ts` | One file controls these everywhere on the site. Change it once, it updates the footer, contact page, and page headers automatically. |
| **The list of services we offer** | `data/services.ts` | Add/edit/remove a service block. |
| **Industries we serve + client testimonials** | `data/index.ts` | Industries are at the top, testimonials lower down. |
| **Team members / partners (names, roles, bios)** | `data/team.ts` | Each person is one block. Photos go in the `public/` folder. |
| **Knowledge Center / blog articles** | `data/articles.ts` | Copy an existing article block and edit the text to add a new one. |
| **Compliance calendar due dates** | `data/calendar.ts` | The list of tax/GST/MCA deadlines shown on the site. |
| **Wording on a specific page** (About, Approach, Contact, etc.) | `app/<page-name>/page.tsx` | e.g. the About page text lives in `app/about/page.tsx`. The folder name matches the page's web address. |
| **The home page** | `app/page.tsx` | The main landing page. |
| **Logo, favicon, photos, images** | `public/` folder | Drop image files here; reference them by filename. |

### Where each page lives
The `app/` folder has one sub-folder per page, and **the folder name is the page's web address**:

| Folder | Lives on the web at | What it is |
|---|---|---|
| `app/about` | ajrgca.com/about | About the firm |
| `app/services` | ajrgca.com/services | Services |
| `app/industries` | ajrgca.com/industries | Industries served |
| `app/approach` | ajrgca.com/approach | How we work |
| `app/insights` | ajrgca.com/insights | Knowledge Center (articles) |
| `app/contact` | ajrgca.com/contact | Contact form |
| `app/book` | ajrgca.com/book | Book a consultation |
| `app/privacy-policy`, `app/terms`, `app/disclaimer`, `app/cookies` | …/privacy-policy etc. | Legal pages |

> ⚠️ **Do not rename the folders inside `app/`** — the folder name *is* the web
> address. Renaming `app/services` to anything else changes (and breaks) the link.

---

## 🚫 Folders & files you can safely IGNORE

You will never need to open these. They are machinery, not content:

| Name | What it is |
|---|---|
| `node_modules/` | Downloaded code libraries. Huge, auto-generated. Never edit. |
| `.next/` | The built/compiled site. Auto-generated. Never edit. |
| `components/` | The reusable building blocks (buttons, cards, the navbar/footer). Editing these needs a developer. |
| `lib/`, `types/` | Internal plumbing for developers. |
| `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.js`, `postcss.config.js`, `tailwind.config.ts`, `next-env.d.ts` | Technical configuration. Leave them alone. |
| `_reference/` | Your source documents (pitch deck, ICAI doc) — kept for reference only, not part of the live site. |

---

## 👀 How to preview your changes before they go live

1. Open a terminal in this folder.
2. Run:
   ```bash
   npm install      # only the first time
   npm run dev
   ```
3. Open **http://localhost:3000** in your browser. Edits you save appear instantly.
4. Press `Ctrl + C` in the terminal to stop the preview.

---

## 🚀 How changes go live (to the real website)

The site is hosted on **Vercel**. When the project's code is pushed to GitHub,
Vercel automatically rebuilds and publishes the site within a minute or two.
(Knowledge Center articles refresh on their own roughly once an hour.)

If you're unsure how to push changes, ask your developer — this is the one step
that's safer with a technical hand.

---

## ↩️ Made a mistake? You can always undo

Every change is tracked by **git** (version history). Nothing you edit is
permanent until pushed, and even then the previous version is recoverable. If
something looks broken, don't panic — the old version is saved.

---

## ✅ Before the site goes live — checklist

A few **real legal values** still need to be filled in (they're intentionally
left blank so nothing fake is published). Search for `TODO` in these files:

- `config/site.ts` — Firm Registration Number (FRN) and office PIN codes.
- `data/team.ts` — confirm partner names/bios and add **real** photographs.
- `public/` — add the social-share image (`og-image.png`, 1200×630).
- Review all wording against **ICAI advertising guidelines** (informational, not
  promotional).

See `TODO.txt` for the detailed pre-launch list and `README.md` for the
developer/deployment notes.
