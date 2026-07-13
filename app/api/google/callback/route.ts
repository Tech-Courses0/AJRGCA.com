import { NextRequest, NextResponse } from 'next/server'
import { storeGoogleTokensFromCode } from '@/lib/google-calendar'

const OAUTH_STATE_COOKIE = 'ajrg_google_oauth_state'

export async function GET(req: NextRequest) {
  const url = req.nextUrl
  const code = url.searchParams.get('code')
  const error = url.searchParams.get('error')
  const state = url.searchParams.get('state')
  const expectedState = req.cookies.get(OAUTH_STATE_COOKIE)?.value
  const destination = new URL('/admin/calendar', url.origin)

  if (!state || !expectedState || state !== expectedState) {
    destination.searchParams.set('google', 'invalid-state')
    const response = NextResponse.redirect(destination)
    response.cookies.delete(OAUTH_STATE_COOKIE)
    return response
  }
  if (error) {
    destination.searchParams.set('google', error === 'access_denied' ? 'cancelled' : 'failed')
    const response = NextResponse.redirect(destination)
    response.cookies.delete(OAUTH_STATE_COOKIE)
    return response
  }
  if (!code) {
    destination.searchParams.set('google', 'missing-code')
    const response = NextResponse.redirect(destination)
    response.cookies.delete(OAUTH_STATE_COOKIE)
    return response
  }

  try {
    await storeGoogleTokensFromCode(code, `${url.origin}/api/google/callback`)
    destination.searchParams.set('google', 'connected')
  } catch (err) {
    console.error('[google-calendar] OAuth callback failed:', err)
    destination.searchParams.set('google', 'failed')
  }

  const response = NextResponse.redirect(destination)
  response.cookies.delete(OAUTH_STATE_COOKIE)
  return response
}
