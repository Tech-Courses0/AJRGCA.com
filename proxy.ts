import { NextRequest, NextResponse } from 'next/server'

const COOKIE = 'ajrg_admin'
const PUBLIC_API_PATHS = ['/api/admin/login', '/api/admin/logout']

/**
 * Gates the visual editor and its API routes behind the same shared-secret
 * convention already used for /api/google/connect (see .env.example) — this
 * site has one owner and no user table, so a single ADMIN_SECRET cookie is
 * the whole auth model.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isEditor = pathname.startsWith('/admin/editor')
  const isProtectedApi = pathname.startsWith('/api/admin/') && !PUBLIC_API_PATHS.some((p) => pathname.startsWith(p))

  if (!isEditor && !isProtectedApi) return NextResponse.next()

  const secret = process.env.ADMIN_SECRET
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
