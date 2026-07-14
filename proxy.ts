import { NextRequest, NextResponse } from 'next/server'
import { isEditorSession } from './lib/editor-auth'

const COOKIE = 'ajrg_admin'
const PUBLIC_API_PATHS = ['/api/admin/login', '/api/admin/logout']

/**
 * Gates the visual editor, calendar integration, and their API routes behind a shared secret — this
 * site has one owner and no user table, so a single EDITOR_SECRET cookie is
 * the whole auth model. Rotating the editor password never changes the stored
 * Google refresh token.
 */
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isEditor = pathname.startsWith('/admin/editor')
  const isCalendarAdmin = pathname.startsWith('/admin/calendar')
  const isProtectedApi = pathname.startsWith('/api/admin/') && !PUBLIC_API_PATHS.some((p) => pathname.startsWith(p))

  if (!isEditor && !isCalendarAdmin && !isProtectedApi) return NextResponse.next()

  const secret = process.env.EDITOR_SECRET
  const cookie = req.cookies.get(COOKIE)?.value
  if (await isEditorSession(cookie, secret)) return NextResponse.next()

  if (isProtectedApi) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.redirect(new URL('/admin/login', req.url))
}

export const config = {
  matcher: ['/admin/editor/:path*', '/admin/calendar/:path*', '/api/admin/:path*'],
}
