'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Dialog from '@/app/component/shared/Dialog';
import LoadingState from '@/app/component/shared/LoadingState';
import { authClient } from '@/app/libs/auth-client';
import { dashboardAction, getDashboardData } from '@/app/libs/api';
import { refreshSavedStudios } from '@/app/component/shared/SaveStudioButton';
import type { ConfirmationRequest, DashboardData, DashboardStudio, DashboardViewProps } from '@/app/types/type';

const panel = 'rounded-xl border border-[#eee7e3] bg-white p-5 sm:p-6';
const input = 'w-full rounded-lg border border-[#eee7e3] bg-[#faf8f7] px-3 py-3 text-sm outline-none focus:border-[#c63717]';
const button = 'rounded-full bg-[#b92d00] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#982600] disabled:opacity-50';
const secondary = 'rounded-full border border-[#eee7e3] px-4 py-2 text-sm hover:bg-[#faf8f7] disabled:opacity-50';
const titles = { overview: 'Overview', my_listings: 'My Studio Listings', my_bookings: 'My Bookings', saved_spaces: 'Saved Spaces', messages: 'Messages' };
const label = (value: string) => value.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase());
const money = (value: number) => Number(value).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export default function DashboardView({ section }: DashboardViewProps) {
     const router = useRouter();
     const { data: session } = authClient.useSession();
     const email = session?.user.email;
     const [confirmation, setConfirmation] = useState<ConfirmationRequest | null>(null);
     const [data, setData] = useState<DashboardData | null>(null);
     const [error, setError] = useState('');
     const [busy, setBusy] = useState(false);
     const inFlight = useRef(false);
     const [studioId, setStudioId] = useState('');
     const [recipientId, setRecipientId] = useState('');
     const [recipientName, setRecipientName] = useState('');
     const messageForm = useRef<HTMLFormElement>(null);

     const load = useCallback(() => {
          if (!email) return Promise.resolve();
          return getDashboardData(email, section).then((result) => {
               setData(result);
               setError('');
               window.dispatchEvent(new Event('dashboard-updated'));
          }).catch((cause) => {
               if (cause?.status === 401) router.replace('/login?callbackURL=' + encodeURIComponent('/dashboard/' + section));
               setError(cause instanceof Error ? cause.message : 'Unable to load your dashboard.');
          });
     }, [email, router, section]);

     useEffect(() => { void load(); }, [load]);

     async function mutate(action: string, id: string, values: Record<string, unknown> = {}) {
          if (inFlight.current) return false;
          inFlight.current = true;
          setBusy(true);
          try {
               await dashboardAction(action, id, values);
               if ((action === 'saveStudio' || action === 'unsaveStudio') && session) refreshSavedStudios(session.user.id);
               toast.success(action === 'sendMessage' ? 'Message sent.' : 'Changes saved.');
               await load();
               return true;
          } catch (cause) { toast.error(cause instanceof Error ? cause.message : 'Unable to save changes.'); return false; }
          finally { inFlight.current = false; setBusy(false); }
     }

     async function sendMessage(event: FormEvent<HTMLFormElement>) {
          event.preventDefault();
          const form = event.currentTarget;
          const text = new FormData(form).get('text');
          if (await mutate('sendMessage', studioId, { text, recipientId })) form.reset();
     }

     const studioCard = (studio: DashboardStudio, saved: boolean) => (
          <article key={studio._id} className={panel}>
               <Link href={`/explore_studios/${studio._id}`} className="font-semibold text-[#21140e] hover:text-[#b92d00]">{studio.title}</Link>
               <p className="mt-2 text-sm text-[#81756d]">{studio.city} · {money(Number(studio.hourlyRate))} / hour</p>
               <div className="mt-4 flex flex-wrap gap-2">
                    <Link className={secondary} href={`/explore_studios/${studio._id}`}>View studio</Link>
                    {saved ? <button disabled={busy} className={secondary} onClick={() => void mutate('unsaveStudio', studio._id)}>Remove saved</button> : <>
                         <Link className={secondary} href={`/studios/edit/${studio._id}`}>Edit</Link>
                         <button disabled={busy} className={secondary} onClick={() => setConfirmation({ message: 'Delete this studio? This cannot be undone.', onConfirm: () => { void mutate('deleteStudio', studio._id); } })}>Delete</button>
                    </>}
               </div>
          </article>
     );

     return <div className="space-y-6 text-[#21140e]">
          <header className="flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-3xl font-bold">{titles[section]}</h1><p className="mt-2 text-sm text-[#81756d]">Manage your studios and creative projects.</p></div><button className={secondary} disabled={busy} onClick={() => void load()}>Refresh</button></header>
          {error && <div role="alert" className={`${panel} text-red-700`}>{error} <button className="underline" onClick={() => void load()}>Try again</button></div>}
          {!data && !error && <LoadingState />}
          <Dialog open={!!confirmation} title="Please confirm" onClose={() => setConfirmation(null)}>
               <p className="text-sm leading-6">{confirmation?.message}</p>
               <div className="mt-6 flex justify-end gap-3"><button className={secondary} onClick={() => setConfirmation(null)}>Keep it</button><button className={button} onClick={() => { confirmation?.onConfirm(); setConfirmation(null); }}>Confirm</button></div>
          </Dialog>
          {data && <>
               {(section === 'overview' || section === 'my_listings') && <>
                    {section === 'overview' && <div className="grid gap-4 sm:grid-cols-3">{[
                         ['My bookings', data.bookings.length, '/dashboard/my_bookings'],
                         ['Saved spaces', data.savedSpaces.length, '/dashboard/saved_spaces'],
                         ['Unread messages', data.messages.filter((message) => message.recipientId === data.userId && !message.read).length, '/dashboard/messages'],
                    ].map(([title, count, href]) => <Link key={String(title)} href={String(href)} className={panel}><p className="text-sm text-[#81756d]">{title}</p><p className="mt-3 text-3xl font-bold text-[#b92d00]">{count}</p></Link>)}</div>}
                    <div className="flex items-center justify-between gap-3"><h2 className="text-xl font-semibold">My Studios</h2><Link className={button} href="/dashboard/add_studios">Add Studio</Link></div>
                    {data.studios.length ? <div className="grid gap-4 xl:grid-cols-2">{data.studios.map((studio) => studioCard(studio, false))}</div> : <p className={panel}>You haven’t published a studio yet.</p>}
                    {section === 'overview' && <><h2 className="text-xl font-semibold">Booking Requests for My Studios</h2>
                    {!data.incomingBookings.length && <p className={panel}>No booking requests yet.</p>}
                    {data.incomingBookings.map((booking) => <article key={booking._id} className={panel}><h3 className="font-semibold">{booking.studioTitle}</h3><p className="mt-2 text-sm">{booking.userName} · {booking.bookingDate} · {booking.startTime}–{booking.endTime}</p><p className="mt-2 text-sm text-[#81756d]">{booking.guestCount} guests · {money(booking.totalAmount)} · {label(booking.status)}</p>{booking.status === 'pending' && <div className="mt-4 flex gap-2"><button disabled={busy} className={button} onClick={() => void mutate('confirmBooking', booking._id)}>Confirm</button><button disabled={busy} className={secondary} onClick={() => setConfirmation({ message: 'Reject this booking request?', onConfirm: () => { void mutate('rejectBooking', booking._id); } })}>Reject</button></div>}{booking.status === 'confirmed' && <button disabled={busy} className={`${secondary} mt-4`} onClick={() => setConfirmation({ message: 'Mark this booking as completed?', onConfirm: () => { void mutate('completeBooking', booking._id); } })}>Mark completed</button>}</article>)}</>}
               </>}
               {section === 'my_bookings' && <>
                    {!data.bookings.length && <div className={panel}><p>You haven’t booked a studio yet.</p><Link href="/explore_studios" className="mt-4 inline-block text-[#b92d00] underline">Explore studios</Link></div>}
                    {data.bookings.map((booking) => <article key={booking._id} className={panel}><div className="flex flex-wrap justify-between gap-2"><Link className="font-semibold" href={`/explore_studios/${booking.studioId}`}>{booking.studioTitle}</Link><span className="rounded-full bg-[#fff0e9] px-3 py-1 text-xs text-[#b92d00]">{label(booking.status)}</span></div><p className="mt-3 text-sm">{booking.bookingDate} · {booking.startTime}–{booking.endTime} · {booking.guestCount} guests</p><p className="mt-2 text-sm text-[#81756d]">{booking.totalHours} hours · Total {money(booking.totalAmount)}</p>{booking.status === 'pending' && <button disabled={busy} className={`${secondary} mt-4`} onClick={() => setConfirmation({ message: 'Cancel this pending booking?', onConfirm: () => { void mutate('cancelBooking', booking._id); } })}>Cancel booking</button>}</article>)}
               </>}
               {section === 'saved_spaces' && <>
                    <form className={`${panel} flex flex-col gap-3 sm:flex-row`} onSubmit={(event) => { event.preventDefault(); const id = String(new FormData(event.currentTarget).get('studioId')); void mutate('saveStudio', id); }}><label className="flex-1"><span className="sr-only">Studio to save</span><select name="studioId" required className={input} defaultValue=""><option value="" disabled>Choose a studio to save</option>{data.availableStudios.filter((studio) => !data.savedSpaces.some((saved) => saved._id === studio._id)).map((studio) => <option key={studio._id} value={studio._id}>{studio.title}</option>)}</select></label><button disabled={busy} className={button}>Save Studio</button></form>
                    {data.savedSpaces.length ? <div className="grid gap-4 xl:grid-cols-2">{data.savedSpaces.map((studio) => studioCard(studio, true))}</div> : <p className={panel}>Your saved studios will appear here.</p>}
               </>}
               {section === 'messages' && <>
                    <form ref={messageForm} className={`${panel} space-y-4`} onSubmit={sendMessage}><h2 className="text-lg font-semibold">{recipientId ? `Reply to ${recipientName}` : 'Contact a Host'}</h2><label className="block text-sm">Studio<select required className={`${input} mt-2`} value={studioId} onChange={(event) => { setStudioId(event.target.value); setRecipientId(''); setRecipientName(''); }}><option value="">Choose a studio</option>{data.availableStudios.filter((studio) => studio.ownerId && (studio.ownerId !== data.userId || studio._id === studioId)).map((studio) => <option key={studio._id} value={studio._id}>{studio.title}</option>)}</select></label><label className="block text-sm">Message<textarea name="text" required maxLength={2000} rows={4} className={`${input} mt-2`} /></label><button disabled={busy} className={button}>{busy ? 'Sending…' : 'Send Message'}</button></form>
                    {!data.messages.length && <p className={panel}>No messages yet. Select a studio to contact its host.</p>}
                    {data.messages.map((message) => <article key={message._id} className={panel}><div className="flex flex-wrap justify-between gap-2"><h3 className="font-semibold">{message.senderId === data.userId ? `To ${message.recipientName}` : `From ${message.senderName}`}</h3><span className="text-xs text-[#81756d]">{new Date(message.createdAt).toLocaleString()}</span></div><p className="mt-1 text-xs text-[#b92d00]">{message.studioTitle}</p><p className="mt-4 whitespace-pre-wrap break-words text-sm leading-6">{message.text}</p>{message.recipientId === data.userId && <div className="mt-4 flex gap-2"><button disabled={busy} className={secondary} onClick={() => { setStudioId(message.studioId); setRecipientId(message.senderId); setRecipientName(message.senderName); messageForm.current?.scrollIntoView({ behavior: 'smooth' }); if (!message.read) void mutate('readMessage', message._id); }}>Reply</button>{!message.read && <button disabled={busy} className={secondary} onClick={() => void mutate('readMessage', message._id)}>Mark as read</button>}</div>}</article>)}
               </>}
          </>}
     </div>;
}
