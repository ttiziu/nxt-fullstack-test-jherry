import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware para proteger rutas
 * Verifica que el usuario tenga un token antes de acceder al dashboard
 */
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;

  // Si no hay token y el usuario intenta acceder al dashboard, redirigir a login
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Si hay token y el usuario intenta acceder a login, redirigir al dashboard
  if (token && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configurar en qué rutas se aplica el middleware
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};

