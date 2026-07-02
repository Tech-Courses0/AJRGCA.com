import { NextResponse } from 'next/server'
import { applyClientResponse } from '@/lib/bookings'

export async function POST(req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  let body: { accept: boolean }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 })
  }

  const origin = new URL(req.url).origin

  try {
    const result = await applyClientResponse(token, body.accept === true, origin)
    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Something went wrong.'
    return NextResponse.json({ ok: false, error: message }, { status: 400 })
  }
}
