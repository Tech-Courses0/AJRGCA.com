-- Run once against the Neon/Postgres store: psql "$DATABASE_URL" -f scripts/init-db.sql

-- Simple audit log for contact enquiries (consultation requests use `bookings` below,
-- which needs a status field the enquiry form doesn't).
create table if not exists submissions (
  id serial primary key,
  created_at timestamptz not null default now(),
  form_type text not null check (form_type in ('contact', 'consultation')),
  name text not null,
  organisation text,
  email text not null,
  phone text,
  message text,
  raw jsonb not null,
  resend_message_id text
);

-- Consultation request -> owner approval/counter -> client accept/decline flow.
-- owner_token / client_token are unguessable single-purpose links mailed out;
-- the token itself is the auth (no login system), so treat them as secrets.
create table if not exists bookings (
  id serial primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'pending'
    check (status in ('pending', 'countered', 'confirmed', 'rejected', 'declined')),

  name text not null,
  organisation text,
  email text not null,
  phone text not null,
  business_type text,
  service_area text,
  mode text,
  message text,

  requested_date text,
  requested_time text,

  proposed_date text,
  proposed_time text,
  proposed_note text,

  final_date text,
  final_time text,
  meet_link text,

  owner_token text not null unique,
  client_token text not null unique,
  raw jsonb not null
);

-- Single-row table: this site has one owner, one Google account connected.
create table if not exists google_tokens (
  id int primary key check (id = 1),
  refresh_token text not null,
  connected_at timestamptz not null default now()
);

-- Visual editor content store. Two rows: 'draft' (what the editor reads/writes,
-- autosaved on every edit) and 'live' (what the public site reads). Publishing
-- copies draft -> live. If this table/row is empty, the app falls back to the
-- defaults built from data/*.ts + config/site.ts (see lib/content.ts) — so the
-- site works with zero DB config, same as everything else here.
create table if not exists site_content (
  id text primary key check (id in ('draft', 'live')),
  data jsonb not null,
  updated_at timestamptz not null default now()
);
