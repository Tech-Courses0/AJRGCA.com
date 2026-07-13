import { NextResponse } from 'next/server'
import { disconnectGoogleCalendar } from '@/lib/google-calendar'

export async function POST() {
  try {
    await disconnectGoogleCalendar()
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Could not disconnect Google Calendar.' },
      { status: 500 }
    )
  }
}
