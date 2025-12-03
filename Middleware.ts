import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/Auth';
import { cookies } from 'next/headers';

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const token = cookies().get('auth-token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*'] };
