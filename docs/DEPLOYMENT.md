# Deployment runbook

The application requires Node.js 20.9 or newer and a reachable Postgres
database. The same codebase runs on Vercel or a conventional Linux VPS.

## Production prerequisites

1. Configure the variables documented in `.env.example`. At minimum, set
   `DATABASE_URL`, `EDITOR_USERNAME`, `EDITOR_SECRET`, `CONTACT_TO_EMAIL`, and
   `ADMIN_SECRET`.
2. Run `scripts/init-db.sql` once against the production database.
3. Configure persistent uploads:
   - Vercel: attach Vercel Blob and set `BLOB_READ_WRITE_TOKEN`.
   - VPS: create `public/uploads` and make it writable by the service user.
4. Use HTTPS. The production editor session cookie is intentionally `Secure`.
5. For Gmail/Calendar, enable the Gmail and Calendar APIs and authorize the
   exact public `/api/google/callback` URL in Google Cloud. Google can be
   connected after deployment from the visual editor.

Until Google is connected, enquiries are still written to Postgres before an
email attempt, but the public form reports that delivery failed. Resend only
works as a fallback after its sender domain is verified.

## Vercel

The project builds with the standard Next.js preset:

```bash
npm ci
npm run build
```

Set all production variables in Project Settings, deploy, and use the stable
`*.vercel.app` alias until the custom domain and DNS are ready. When changing
OAuth credentials, redeploy before reconnecting Google so the serverless
functions receive the new variables.

## VPS initial setup

Clone the repository to `/srv/ajrgca`, create a root-owned environment file at
`/etc/ajrgca.env`, and install dependencies/build as the service user:

```bash
cd /srv/ajrgca
npm ci
npm run build
sudo install -d -o www-data -g www-data public/uploads
```

Example `/etc/systemd/system/ajrgca.service`:

```ini
[Unit]
Description=AJRGCA Next.js website
After=network.target

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=/srv/ajrgca
Environment=NODE_ENV=production
Environment=PORT=3000
EnvironmentFile=/etc/ajrgca.env
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Put Nginx or Caddy in front of `127.0.0.1:3000`, enable HTTPS, then start the
service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now ajrgca
```

## VPS updates

Use the same controlled sequence for every update:

```bash
cd /srv/ajrgca
git pull --ff-only
npm ci
npm run build
sudo systemctl restart ajrgca
sudo systemctl --no-pager --full status ajrgca
```

If the build fails, do not restart; the currently running build remains online.
Database content and uploaded files are outside Git and are not replaced by
this update sequence.

## Post-deploy checks

- `/`, `/contact`, `/book`, and `/admin/login` return HTTP 200.
- `/admin/editor` redirects unauthenticated users to login.
- Invalid `/api/contact` payloads return HTTP 400.
- The editor can save a draft and publish live content.
- After Google is connected, submit one labelled test enquiry and confirm both
  email delivery and a row in `submissions`.
- For a video booking, confirm that Calendar creates the event and Meet link.
