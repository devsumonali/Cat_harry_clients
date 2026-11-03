'use client';

import { useRef, useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { createBooking } from '@/app/libs/api';
import type { BookingPanelProps } from '@/app/types/type';
import { authClient } from '@/app/libs/auth-client';
import { useRouter } from 'next/navigation';

const money = (value: number) => new Intl.NumberFormat('en-US', {
     style: 'currency', currency: 'USD', maximumFractionDigits: 2,
}).format(value);

function minutes(time: string) {
     const [hours, mins] = time.split(':').map(Number);
     return hours * 60 + mins;
}

export default function BookingPanel({ studio }: BookingPanelProps) {
     const router = useRouter();
     const { data: session, isPending: sessionPending } = authClient.useSession();
     const minimumHours = Number(studio.minimumBookingHours) || 1;
     const capacity = Number(studio.maxCapacity) || undefined;
     const rate = Number(studio.hourlyRate);
     const validRate = String(studio.hourlyRate ?? '').trim() !== '' && Number.isFinite(rate) && rate >= 0;
     const deposit = Math.max(0, Number(studio.securityDeposit) || 0);
     const [bookingDate, setBookingDate] = useState('');
     const [startTime, setStartTime] = useState('09:00');
     const [endTime, setEndTime] = useState('');
     const [guestCount, setGuestCount] = useState(1);
     const [submitting, setSubmitting] = useState(false);
     const requestInFlight = useRef(false);
     const duration = (minutes(endTime) - minutes(startTime)) / 60;
     const hours = Number.isFinite(duration) && duration > 0 ? duration : 0;
     const rental = validRate ? Math.round(rate * hours * 100) / 100 : 0;
     const total = rental + deposit;

     async function handleSubmit(event: FormEvent<HTMLFormElement>) {
          event.preventDefault();
          if (requestInFlight.current) return;
          if (sessionPending) return;
          if (!session) {
               toast.error('Please log in to request a booking.');
               router.push(`/login?callbackURL=${encodeURIComponent(`/explore_studios/${studio._id}`)}`);
               return;
          }
          if (!bookingDate || !startTime || !endTime) {
               toast.error('Select a booking date, start time and end time.');
               return;
          }
          if (new Date(`${bookingDate}T${startTime}`).getTime() <= Date.now()) {
               toast.error('Please select a future booking time.');
               return;
          }
          if (hours < minimumHours) {
               toast.error(`End time must be after start time, with at least ${minimumHours} hours booked.`);
               return;
          }
          if (guestCount < 1 || (capacity && guestCount > capacity) || !validRate) return;

          requestInFlight.current = true;
          setSubmitting(true);
          try {
               await createBooking({ studioId: studio._id, bookingDate, startTime, endTime, guestCount });
               toast.success('Booking request sent! Your reservation is pending.');
               setBookingDate('');
               setEndTime('');
               setGuestCount(1);
          } catch (error) {
               toast.error(error instanceof Error ? error.message : 'Unable to submit booking.');
          } finally {
               requestInFlight.current = false;
               setSubmitting(false);
          }
     }

     return (
          <aside aria-label="Book this studio" className="min-w-0 rounded-3xl border border-[#f0eae5] bg-white p-6 shadow-lg shadow-[#382619]/5 lg:sticky lg:top-24 lg:p-7">
               <p className="text-3xl font-bold text-[#bd3100]">
                    {validRate ? money(rate) : 'Rate unavailable'}
                    {validRate && <span className="ml-1 text-xs font-normal text-[#746b66]">/ hour</span>}
               </p>
               <form onSubmit={handleSubmit} className="mt-6">
                    <fieldset disabled={submitting} className="space-y-3 disabled:opacity-70">
                         <div className="rounded-xl bg-[#f7f5f4] p-3.5">
                              <label htmlFor="booking-date" className="block text-[10px] uppercase text-[#655a54]">Booking date</label>
                              <input id="booking-date" type="date" required value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="mt-2 block w-full min-w-0 bg-transparent text-sm outline-none focus:ring-2 focus:ring-[#bd3100]/30" />
                         </div>
                         <div className="grid grid-cols-2 gap-3">
                              <div className="min-w-0 rounded-xl bg-[#f7f5f4] p-3.5">
                                   <label htmlFor="booking-start" className="block text-[10px] uppercase text-[#655a54]">Start time</label>
                                   <input id="booking-start" type="time" required value={startTime} onChange={(e) => setStartTime(e.target.value)} className="mt-2 block w-full min-w-0 bg-transparent text-xs outline-none focus:ring-2 focus:ring-[#bd3100]/30" />
                              </div>
                              <div className="min-w-0 rounded-xl bg-[#f7f5f4] p-3.5">
                                   <label htmlFor="booking-end" className="block text-[10px] uppercase text-[#655a54]">End time</label>
                                   <input id="booking-end" type="time" required value={endTime} onChange={(e) => setEndTime(e.target.value)} className="mt-2 block w-full min-w-0 bg-transparent text-xs outline-none focus:ring-2 focus:ring-[#bd3100]/30" />
                              </div>
                         </div>
                         <div className="flex items-center justify-between gap-2 rounded-xl bg-[#f7f5f4] p-3.5">
                              <div>
                                   <p className="text-[10px] uppercase text-[#655a54]">Guest count</p>
                                   <p className="mt-1 text-xs">{guestCount} crew {guestCount === 1 ? 'member' : 'members'}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                   <button type="button" aria-label="Remove one guest" disabled={guestCount <= 1} onClick={() => setGuestCount((count) => count - 1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white disabled:opacity-40"><FiMinus size={12} /></button>
                                   <span aria-live="polite" className="min-w-4 text-center text-sm font-semibold">{guestCount}</span>
                                   <button type="button" aria-label="Add one guest" disabled={!!capacity && guestCount >= capacity} onClick={() => setGuestCount((count) => count + 1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white disabled:opacity-40"><FiPlus size={12} /></button>
                              </div>
                         </div>
                         <p className="text-[11px] leading-5 text-[#81756d]">Minimum {minimumHours} hours{capacity ? ` · Up to ${capacity} guests` : ''}. Times are local to the studio.</p>
                    </fieldset>

                    <div aria-live="polite" className="mt-7">
                         <dl className="space-y-3 text-xs text-[#746b66]">
                              <div className="flex justify-between gap-3"><dt>{validRate ? money(rate) : 'Hourly rate'} × {Number(hours.toFixed(2))} hours</dt><dd>{money(rental)}</dd></div>
                              {studio.securityDeposit !== undefined && <div className="flex justify-between gap-3"><dt>Security deposit</dt><dd>{money(deposit)}</dd></div>}
                         </dl>
                         <div className="mt-7 flex items-center justify-between gap-4 border-t border-[#f0eae5] pt-5">
                              <span className="text-sm font-semibold">Estimated total</span>
                              <span className="text-xl font-bold text-[#bd3100]">{hours > 0 && validRate ? money(total) : '—'}</span>
                         </div>
                    </div>
                    <button type="submit" disabled={submitting || !validRate} className="mt-6 w-full rounded-full bg-[#bd3100] px-5 py-3.5 text-sm font-medium text-white shadow-md shadow-orange-900/10 transition hover:bg-[#982900] disabled:cursor-not-allowed disabled:opacity-60">
                         {submitting ? 'Sending request…' : 'Request to Book'}
                    </button>
                    <p className="mt-4 text-center text-[10px] leading-4 text-[#81756d]">Submit a booking request for the selected date and hours. No payment is collected here.</p>
               </form>
          </aside>
     );
}
