import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

const publicRoutes = ['/auth/login', '/auth/signup'];
const protectedRoutes = ['/dashboard', '/creator', '/campaigns', '/poster-studio', '/social-manager', '/marketing-assistant', '/admin'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (token && publicRoutes.includes(pathname)) {
    const payload = await verifyToken(token);
    if (payload) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|.*\\..*|api).*)'],
};
