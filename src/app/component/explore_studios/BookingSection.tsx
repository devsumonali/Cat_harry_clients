'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Dialog from '@/app/component/shared/Dialog';
import BookingPanel from './BookingPanel';
import { authClient } from '@/app/libs/auth-client';
import type { BookingPanelProps } from '@/app/types/type';

export default function BookingSection({ studio }: BookingPanelProps) {
     const [open, setOpen] = useState(false);
     const { data: session, isPending } = authClient.useSession();
     const router = useRouter();
     return <div className="space-y-4 lg:sticky lg:top-24">
          <button type="button" disabled={isPending} className="w-full rounded-full bg-[#bd3100] px-5 py-3.5 text-sm font-medium text-white disabled:opacity-50" onClick={() => {
               if (!session) { router.push(`/login?callbackURL=${encodeURIComponent(`/studios/${studio._id}`)}`); return; }
               setOpen(true);
          }}>Book Workspace Now</button>
          <BookingPanel studio={studio} />
          <Dialog open={open} title="Book this workspace" onClose={() => setOpen(false)}>{open && <BookingPanel studio={studio} />}</Dialog>
     </div>;
}
