import { NextResponse } from 'next/server'
import { revertToOriginal } from '@/lib/content'

export async function POST() {
  await revertToOriginal()
  return NextResponse.json({ ok: true })
}
