import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC = ['/', '/api', '/api/auth', '/api/stripe-webhook', '/pricing', '/payment-success', '/favicon.ico', '/_next', '/robots.txt'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (PUBLIC.some(p => pathname.startsWith(p))) return NextResponse.next();
  const token = req.cookies.get('__Secure-next-auth.session-token') || req.cookies.get('next-auth.session-token');
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ['/dashboard/:path*', '/downloads/:path*'] };
