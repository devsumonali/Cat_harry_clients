'use client';

import { useEffect, useRef } from 'react';
import { authClient } from '@/app/libs/auth-client';

export async function syncJwtSession() {
     const response = await fetch('/api/auth/jwt', {
          method: 'POST',
          credentials: 'include',
          cache: 'no-store',
     });
     if (!response.ok) throw new Error('Unable to secure your session. Please try again.');
}

export async function clearJwtSession() {
     try {
          await fetch('/api/auth/jwt', { method: 'DELETE', credentials: 'include' });
     } catch {}
}

export default function JwtSessionSync() {
     const { data: session } = authClient.useSession();
     const syncedUserId = useRef<string | null>(null);

     useEffect(() => {
          if (!session?.user?.id || syncedUserId.current === session.user.id) return;
          const refresh = () => void syncJwtSession()
               .then(() => {
                    syncedUserId.current = session.user.id;
               })
               .catch(() => {
                    syncedUserId.current = null;
               });
          refresh();
          const renewal = window.setInterval(refresh, 7 * 60 * 60 * 1000);
          return () => window.clearInterval(renewal);
     }, [session?.user?.id]);

     return null;
}
