import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Check if the hostname is exactly doctordoorstep.com (without www)
  if (url.hostname === 'doctordoorstep.com') {
    url.hostname = 'www.doctordoorstep.com';
    url.protocol = 'https:'; // ensure https while redirecting
    return NextResponse.redirect(url, 301); // Permanent redirect
  }
  
  return NextResponse.next();
}

export const config = {
  // Apply middleware to all routes except api, _next/static, _next/image, and favicon.ico
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
