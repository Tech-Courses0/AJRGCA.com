import { NextRequest, NextResponse } from 'next/server'
import { getDraftContent, saveDraftContent } from '@/lib/content'

export async function GET() {
  const content = await getDraftContent()
  return NextResponse.json(content)
}

export async function PATCH(req: NextRequest) {
  const content = await req.json()
  await saveDraftContent(content)
  return NextResponse.json({ ok: true })
}
