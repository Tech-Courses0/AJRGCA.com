import { NextResponse } from 'next/server'
import { getGoogleAuthUrl } from '@/lib/google-calendar'

// One-time owner action to link the firm's Google account so confirmed video
// calls get a real Meet link. Gated by a shared secret (no user accounts on
// this site) — set ADMIN_SECRET in Vercel and visit /api/google/connect?key=...
export async function GET(req: Request) {
  const url = new URL(req.url)
  const key = url.searchParams.get('key')

  if (!process.env.ADMIN_SECRET || key !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 })
  }

  const redirectUri = `${url.origin}/api/google/callback`
  const authUrl = getGoogleAuthUrl(redirectUri)
  return NextResponse.redirect(authUrl)
}
