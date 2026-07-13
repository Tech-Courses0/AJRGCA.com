import { randomBytes } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { getGoogleAuthUrl, getGoogleCalendarStatus } from '@/lib/google-calendar'

const OAUTH_STATE_COOKIE = 'ajrg_google_oauth_state'

export async function GET(req: NextRequest) {
  const status = await getGoogleCalendarStatus()
  if (!status.credentialsConfigured || !status.databaseConfigured || status.error) {
    return NextResponse.redirect(new URL('/admin/calendar?google=not-configured', req.nextUrl.origin))
  }

  const state = randomBytes(32).toString('base64url')
  const redirectUri = `${req.nextUrl.origin}/api/google/callback`
  const response = NextResponse.redirect(getGoogleAuthUrl(redirectUri, state))
  response.cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 10 * 60,
  })
  return response
}
