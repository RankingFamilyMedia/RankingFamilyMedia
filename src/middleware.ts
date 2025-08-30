
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Protect the /admin route
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const basicAuth = req.headers.get('authorization');

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      // The atob function decodes a base-64 encoded string.
      const [user, pwd] = atob(authValue).split(':');

      const expectedUser = process.env.BASIC_AUTH_USER || 'admin';
      const expectedPwd = process.env.BASIC_AUTH_PASSWORD || 'Jungleyaad25';

      if (user === expectedUser && pwd === expectedPwd) {
        return NextResponse.next();
      }
    }

    // If authentication fails, or is not provided, respond with 401 Unauthorized
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  // Allow other requests to pass through
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
