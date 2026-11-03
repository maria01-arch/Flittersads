import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

// Keeps the session fresh and sends signed-out visitors to /login.
// Every page and API route also checks on the server.
const EXACT = ['/']
const PREFIX = ['/login', '/signup', '/auth', '/terms', '/ad-policy', '/privacy', '/refunds']

export async function middleware(request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) {
    return new NextResponse('Setup needed: add the Supabase environment variables in Vercel, then redeploy.', { status: 503 })
  }

  let response = NextResponse.next({ request })
  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(list) {
        list.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
      },
    },
  })

  const { data } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname
  const open = EXACT.includes(path) || PREFIX.some((p) => path === p || path.startsWith(p + '/'))
  if (!data?.user && !open && !path.startsWith('/api/')) {
    const to = request.nextUrl.clone()
    to.pathname = '/login'
    to.search = ''
    return NextResponse.redirect(to)
  }
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|txt|xml|webmanifest)$).*)'],
}
