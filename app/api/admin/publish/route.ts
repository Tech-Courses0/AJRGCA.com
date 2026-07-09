import { NextResponse } from 'next/server'
import { publishContent } from '@/lib/content'

export async function POST(req: Request) {
  const { message } = await req.json().catch(() => ({ message: '' }))
  if (typeof message !== 'string' || !message.trim()) {
    return NextResponse.json({ error: 'A change message is required.' }, { status: 400 })
  }
  await publishContent(message.trim())
  return NextResponse.json({ ok: true })
}
