# AJRG & Associates — Launch Checklist (final)

The website is built. **Almost everything the old questionnaire asked for is now
editable by you directly** in the visual editor at `/admin/editor` — no need to
send us values. This checklist has two parts: what you fill in the editor, and
the handful of real tasks that live outside it.

---

## A. Fill / verify in the editor (`/admin/editor`)

Log in, edit inline, click **Publish**. All of these are now self-serve:

- **Firm legal details** (Settings panel): FRN, both office addresses + PIN
  codes, official email, cities.
- **Contact**: public phone number(s), WhatsApp number, LinkedIn / social links.
- **The two partners** (About page): ICAI membership numbers, FCA vs ACA titles,
  whether to mention Digibuks, and Rishu's Registered Valuer / IP / SEBI RIA
  registrations (show numbers, or "on request only").
- **Team & mentors** (About page): fix any name/title, add or remove people
  (double-check Junaid's full name and Kapil's designation).
- **Photos**: upload real partner / team / office photos to replace the
  placeholders (click any image in the editor). *See task B4 about where
  uploaded images are stored.*
- **Services / stats**: confirm the service list + descriptions, and the
  "4 Cities / 10 Practice Areas / 4 Domains / 2 Partners" figures.
- **Knowledge-centre articles** (Insights): approve, edit, or replace the 3 draft
  articles (Fractional CFO, Insolvency/IBC, Business Succession) and set each
  author + publish date.
- **Wording**: the deck's promotional phrases were toned down to stay within
  ICAI advertising rules — review the softened text and adjust if needed.

---

## B. Real remaining tasks (NOT solvable by editing)

1. **Legal review** — Privacy Policy, Terms, Disclaimer, Cookie Policy are
   first drafts, **not** final legal text. A partner or lawyer must review and
   approve (you can edit the text in the editor once finalised).
2. **DPDP Grievance Officer** — the DPDP Act, 2023 requires a named Data
   Protection / Grievance contact in the Privacy Policy. Decide **who** (name +
   email/phone), then enter it via the editor.
3. **Email delivery (Resend)** — to send from `contact@ajrgca.com`, the domain
   must be verified in Resend (add the DNS records at the registrar). Until then
   delivery is limited. One-time DNS step.
4. **Image storage in production** — uploaded images need a persistent store.
   On a serverless host (Vercel), set `BLOB_READ_WRITE_TOKEN` (Vercel Blob),
   otherwise uploads are ephemeral. On a VPS with a persistent disk, the
   `public/uploads/` fallback works as-is.
5. **Domain + hosting** — point `ajrgca.com` (currently on the preciousnet
   registrar/host) to the final server, and set up hosting. *(Migration to the
   client VPS is the planned final step.)*
6. **Google Calendar (optional)** — in the site editor, choose **Calendar**, then
   connect the firm's Google account. Confirmed consultations are added to the
   primary calendar; video calls also receive a Google Meet link.

---

## C. Environment variables (for whoever deploys)

Set these in the host (Vercel env / VPS `.env`):

```
EDITOR_USERNAME          editor login
EDITOR_SECRET            editor password (also the auth cookie value)
DATABASE_URL             Postgres (Neon or self-hosted) — run scripts/init-db.sql once
RESEND_API_KEY           email delivery (optional locally)
CONTACT_TO_EMAIL         inbox for form submissions
BLOB_READ_WRITE_TOKEN    image uploads in prod (see B4)
GOOGLE_CLIENT_ID/SECRET  Meet booking (optional)
```

Env changes require a redeploy (Vercel) or process restart (VPS) to load.
See `docs/VISUAL-EDITOR.md` for the full editor architecture and deploy checklist.
