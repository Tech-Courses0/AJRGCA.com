import { NextResponse } from 'next/server'
import { discardDraft } from '@/lib/content'

export async function POST() {
  await discardDraft()
  return NextResponse.json({ ok: true })
}
