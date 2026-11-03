import { NextResponse, type NextRequest } from 'next/server';
import { auth } from '@/app/libs/auth';

export async function proxy(request: NextRequest) {
     const session = await auth.api.getSession({ headers: request.headers });
     if (!session) {
          const loginURL = new URL('/login', request.url);
          loginURL.searchParams.set('callbackURL', request.nextUrl.pathname + request.nextUrl.search);
          return NextResponse.redirect(loginURL);
     }
     return NextResponse.next();
}

export const config = {
     matcher: ['/dashboard/:path*'],
};
