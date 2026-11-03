'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiHeart } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { authClient } from '@/app/libs/auth-client';
import { dashboardAction, getSavedStudioIds } from '@/app/libs/api';
import type { SaveStudioProps } from '@/app/types/type';

// Share one request between all visible cards for the same account.
const requests = new Map<string, Promise<string[]>>();
export function refreshSavedStudios(userId: string) {
     requests.delete(userId);
     window.dispatchEvent(new Event('saved-studios-updated'));
}
function load(userId: string) {
     if (!requests.has(userId)) requests.set(userId, getSavedStudioIds().catch((error) => { requests.delete(userId); throw error; }));
     return requests.get(userId)!;
}
export default function SaveStudioButton({ studioId }: SaveStudioProps) {
     const { data: session, isPending } = authClient.useSession();
     const userId = session?.user.id;
     const [saved, setSaved] = useState(false);
     const [busy, setBusy] = useState(false);
     const router = useRouter();
     useEffect(() => {
          let active = true;
          const refresh = () => {
               if (userId) void load(userId).then((ids) => { if (active) setSaved(ids.includes(studioId)); }).catch(() => {});
          };
          refresh();
          window.addEventListener('saved-studios-updated', refresh);
          return () => { active = false; window.removeEventListener('saved-studios-updated', refresh); };
     }, [studioId, userId]);
     return <button type="button" aria-label={saved && userId ? 'Remove saved studio' : 'Save studio'} aria-pressed={!!userId && saved} disabled={busy || isPending} className="absolute right-2 top-2 z-10 flex size-8 items-center justify-center rounded-full bg-white text-[#b92d00] shadow-sm disabled:opacity-50" onClick={async () => {
          if (!session) { router.push(`/login?callbackURL=${encodeURIComponent(`/studios/${studioId}`)}`); return; }
          if (busy) return;
          setBusy(true);
          try {
               const ids = await load(session.user.id);
               const exists = ids.includes(studioId);
               await dashboardAction(exists ? 'unsaveStudio' : 'saveStudio', studioId);
               refreshSavedStudios(session.user.id);
               toast.success(exists ? 'Studio removed from saved spaces.' : 'Studio saved.');
          } catch (cause) { toast.error(cause instanceof Error ? cause.message : 'Unable to save studio.'); }
          finally { setBusy(false); }
     }}><FiHeart size={16} className={saved && userId ? 'fill-current' : ''} /></button>;
}
