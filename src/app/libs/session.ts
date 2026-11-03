import 'server-only';
import type { SessionUser } from '@/app/types/type';

// Fetch session identity from Express; no auth implementation or database lives here.
export async function getSession(headers: Headers): Promise<{ user: SessionUser } | null> {
     const apiURL = (process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/$/, '');
     const response = await fetch(apiURL + '/auth/get-session', {
          headers: { cookie: headers.get('cookie') || '' },
          cache: 'no-store',
          signal: AbortSignal.timeout(10000),
     });
     if (!response.ok) throw new Error('Authentication service unavailable.');
     return response.json();
}
