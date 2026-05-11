import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Middleware
 * Currently a placeholder for future route protection.
 * In a real production app, you might check for a session cookie here.
 */
export function proxy(request: NextRequest) {
  // Example: Redirect to login if accessing /submit without a token
  // const token = request.cookies.get('authToken');
  // if (!token && request.nextUrl.pathname.startsWith('/submit')) {
  //   return NextResponse.redirect(new URL('/?auth=login', request.url));
  // }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
