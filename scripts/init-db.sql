-- Run once against the Neon/Postgres store: psql "$DATABASE_URL" -f scripts/init-db.sql
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
