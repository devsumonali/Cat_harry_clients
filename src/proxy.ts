import { NextResponse, type NextRequest } from 'next/server';
import { getSession } from '@/app/libs/session';

export async function proxy(request: NextRequest) {
     const session = await getSession(request.headers);
     if (!session) {
          const loginURL = new URL('/login', request.url);
          loginURL.searchParams.set('callbackURL', request.nextUrl.pathname + request.nextUrl.search);
          return NextResponse.redirect(loginURL);
     }
     return NextResponse.next();
}

export const config = {
     matcher: ['/dashboard/:path*', '/add-studio', '/my-listings', '/my-bookings', '/studios/edit/:path*'],
};
