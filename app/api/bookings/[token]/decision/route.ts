import { NextResponse } from 'next/server'
import { applyOwnerDecision } from '@/lib/bookings'

export async function POST(req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  let body: { action: 'approve' | 'counter' | 'reject'; date?: string; time?: string; note?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 })
  }

  if (body.action === 'counter' && (!body.date?.trim() || !body.time?.trim())) {
    return NextResponse.json({ ok: false, error: 'A proposed date and time are required.' }, { status: 400 })
  }

  const origin = new URL(req.url).origin

  try {
    const result =
      body.action === 'counter'
        ? await applyOwnerDecision(token, { action: 'counter', date: body.date!, time: body.time!, note: body.note }, origin)
        : await applyOwnerDecision(token, { action: body.action }, origin)
    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Something went wrong.'
    return NextResponse.json({ ok: false, error: message }, { status: 400 })
  }
}
