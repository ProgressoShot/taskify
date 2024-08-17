import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // 쿠키 확인
  const cookie = cookies().get('Authorization')
  if (!cookie) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/mydashboard/:path*', '/dashboard/:path*', '/mypage/:path*'],
}
