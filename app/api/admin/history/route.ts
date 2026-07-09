import { NextResponse } from 'next/server'
import { listContentHistory } from '@/lib/content'

export async function GET() {
  const history = await listContentHistory(5)
  return NextResponse.json({ history })
}
