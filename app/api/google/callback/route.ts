import { NextResponse } from 'next/server'
import { storeGoogleTokensFromCode } from '@/lib/google-calendar'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const error = url.searchParams.get('error')

  if (error) {
    return NextResponse.json({ ok: false, error }, { status: 400 })
  }
  if (!code) {
    return NextResponse.json({ ok: false, error: 'Missing authorization code.' }, { status: 400 })
  }

  const redirectUri = `${url.origin}/api/google/callback`

  try {
    await storeGoogleTokensFromCode(code, redirectUri)
    return new NextResponse(
      '<html><body style="font-family: sans-serif; padding: 40px;">Google Calendar connected. You can close this tab.</body></html>',
      { headers: { 'Content-Type': 'text/html' } }
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to connect Google Calendar.'
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
