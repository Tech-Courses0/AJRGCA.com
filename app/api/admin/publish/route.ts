import { NextResponse } from 'next/server'
import { publishContent } from '@/lib/content'

export async function POST() {
  await publishContent()
  return NextResponse.json({ ok: true })
}
