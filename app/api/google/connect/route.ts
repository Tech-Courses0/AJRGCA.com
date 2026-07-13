import { NextResponse } from 'next/server'
// Kept as a friendly redirect for old documentation/bookmarks. Calendar
// linking now lives behind the normal editor login at /admin/calendar.
export async function GET(req: Request) {
  const url = new URL(req.url)
  return NextResponse.redirect(new URL('/admin/calendar', url.origin))
}
