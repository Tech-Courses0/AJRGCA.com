import { NextRequest, NextResponse } from 'next/server'

const COOKIE = 'ajrg_admin'
const PUBLIC_API_PATHS = ['/api/admin/login', '/api/admin/logout']

/**
 * Gates the visual editor and its API routes behind a shared secret — this
 * site has one owner and no user table, so a single EDITOR_SECRET cookie is
 * the whole auth model. (Separate from ADMIN_SECRET, which gates the one-off
 * /api/google/connect flow; keeping them distinct means rotating the editor
 * password never touches the Google connection.)
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isEditor = pathname.startsWith('/admin/editor')
  const isProtectedApi = pathname.startsWith('/api/admin/') && !PUBLIC_API_PATHS.some((p) => pathname.startsWith(p))

  if (!isEditor && !isProtectedApi) return NextResponse.next()

  const secret = process.env.EDITOR_SECRET
  const cookie = req.cookies.get(COOKIE)?.value
  if (secret && cookie === secret) return NextResponse.next()

  if (isProtectedApi) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.redirect(new URL('/admin/login', req.url))
}

export const config = {
  matcher: ['/admin/editor/:path*', '/api/admin/:path*'],
}
