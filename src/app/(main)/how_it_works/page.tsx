import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiSearch, FiClock, FiCalendar, FiCamera, FiCheck } from 'react-icons/fi';

const steps = [
     { number: '01', icon: FiSearch, title: 'Discover Spaces', text: 'Browse studios by category, hourly rate and amenities. Find a setting that fits your creative brief.' },
     { number: '02', icon: FiClock, title: 'Select Shoot Hours', text: 'Review the space, check the crew capacity and choose a date with the hours your production needs.' },
     { number: '03', icon: FiCalendar, title: 'Book Instantly', text: 'Review your estimated total and send a request. Your booking starts as pending, ready for confirmation.' },
     { number: '04', icon: FiCamera, title: 'Create & Produce', text: 'Once your session is confirmed, prepare your crew, follow the studio guidelines and make something great.' },
];
const questions = [
     { title: 'How do I choose the right studio?', text: 'Start with your production type. Then compare floor area, ceiling height, crew capacity and included amenities on the studio details page.' },
     { title: 'How is the booking estimate calculated?', text: 'Your estimate combines the hourly rate for your selected time with the listed security deposit. Review the minimum booking hours before requesting.' },
     { title: 'Is my booking confirmed immediately?', text: 'A booking request begins as pending. Wait for confirmation before making final arrangements for your production.' },
     { title: 'What should I check before arriving?', text: 'Read the address, house rules and overtime policy. Plan enough time for setup and packing up within your booked session.' },
];

export default function HowItWorksPage() {
     return (
          <main className="flex-1 bg-[#faf8f7] text-[#211d1a]">
               <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <section className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
                         <div>
                              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#D52B00]">The creative process, simplified</p>
                              <h1 className="max-w-xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">Less searching.<br />More <span className="text-[#D52B00]">creating.</span></h1>
                              <p className="mt-6 max-w-lg text-sm leading-7 text-[#76685f] sm:text-base">From the first idea to the final take, find a space that works for you. Here’s how to plan your next session with StudioSpace.</p>
                              <Link href="/explore_studios" className="mt-8 inline-flex items-center gap-3 rounded-lg bg-[#D52B00] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#B82500]">Explore Studios <FiArrowRight /></Link>
                              <p className="mt-5 text-xs text-[#8a7c73]">Discover Spaces. Select Shoot Hours. Book Instantly. Create & Produce.</p>
                         </div>
                         <div className="relative">
                              <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
                                   <Image src="/images/home/hero-daylight.png" alt="Sunlit photography studio with a softbox and large windows" fill sizes="(max-width: 1023px) 100vw, 50vw" loading="eager" className="object-cover" />
                              </div>
                              <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-xl bg-white/95 p-4 shadow-sm backdrop-blur sm:inset-x-6 sm:bottom-6">
                                   <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fae9e1] text-[#D52B00]"><FiCamera size={20} /></span>
                                   <div><p className="text-sm font-semibold">Your next idea belongs here.</p><p className="mt-1 text-xs text-[#81746b]">Spaces designed for your creative process.</p></div>
                              </div>
                         </div>
                    </section>

                    <section className="border-t border-[#e9e1db] py-14 sm:py-16">
                         <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                              <div><p className="text-xs font-semibold uppercase tracking-widest text-[#D52B00]">From idea to action</p><h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Your next shoot, in four steps.</h2></div>
                              <p className="max-w-xs text-sm leading-6 text-[#81746b]">A little planning. The right space.<br />Room for your best work.</p>
                         </div>
                         <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                              {steps.map(({ number, icon: Icon, title, text }) => (
                                   <li key={number} className="rounded-2xl border border-[#eee6e0] bg-white p-6">
                                        <div className="mb-8 flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#faeee8] text-[#D52B00]"><Icon size={20} /></span><span className="text-3xl font-semibold tracking-tight text-[#e9dfd8]">{number}</span></div>
                                        <h3 className="text-base font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#81746b]">{text}</p>
                                   </li>
                              ))}
                         </ol>
                    </section>

                    <section className="grid gap-8 rounded-2xl bg-[#f1ece7] p-6 sm:p-10 lg:grid-cols-2 lg:gap-16">
                         <div><p className="text-xs font-semibold uppercase tracking-widest text-[#D52B00]">Before you book</p><h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Good preparation.<br />A smoother production.</h2><p className="mt-4 max-w-md text-sm leading-7 text-[#81746b]">Every space is different. Get familiar with the details so you can focus on the work when you arrive.</p></div>
                         <ul className="space-y-4 self-center">{['Check the space and equipment against your brief.', 'Include setup and teardown in your booked hours.', 'Confirm your crew fits the studio’s capacity.', 'Read the house rules and overtime policy.'].map((text) => <li key={text} className="flex items-start gap-3 text-sm leading-6 text-[#55473e]"><FiCheck className="mt-1 shrink-0 text-[#D52B00]" size={18} />{text}</li>)}</ul>
                    </section>

                    <section className="py-14 sm:py-16">
                         <div className="mb-8"><p className="text-xs font-semibold uppercase tracking-widest text-[#D52B00]">Your booking journey</p><h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Know where your reservation stands.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-[#81746b]">An instant request is not an instant confirmation. Follow your reservation through these stages in My Bookings.</p></div>
                         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                              {[
                                   { title: 'Pending', color: 'bg-amber-50 text-amber-800', text: 'Your request has been submitted and is awaiting confirmation. Pending reservations can be cancelled.' },
                                   { title: 'Confirmed', color: 'bg-emerald-50 text-emerald-800', text: 'Your reservation is confirmed. Review the address, booked hours and house rules before your session.' },
                                   { title: 'Completed', color: 'bg-blue-50 text-blue-800', text: 'Your studio session is complete. Keep your reservation details for your production records.' },
                                   { title: 'Cancelled', color: 'bg-stone-100 text-stone-600', text: 'The reservation is no longer going ahead. Explore other spaces for your next session.' },
                              ].map((item) => <article key={item.title} className="h-full rounded-xl border border-[#eee6e0] bg-white p-6"><span className={'inline-flex rounded-full px-3 py-1 text-xs font-semibold ' + item.color}>{item.title}</span><p className="mt-4 text-sm leading-7 text-[#81746b]">{item.text}</p></article>)}
                         </div>
                    </section>

                    <section className="py-14 sm:py-20">
                         <div className="mb-8 text-center"><p className="text-xs font-semibold uppercase tracking-widest text-[#D52B00]">A few helpful answers</p><h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Before the first take.</h2></div>
                         <div className="grid gap-5 md:grid-cols-2">{questions.map((item) => <article key={item.title} className="rounded-xl border border-[#eee6e0] bg-white p-6"><h3 className="text-sm font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-7 text-[#81746b]">{item.text}</p></article>)}</div>
                    </section>
                    <section className="mb-16 flex flex-col items-start justify-between gap-6 rounded-2xl bg-[#D52B00] p-7 text-white sm:p-10 md:flex-row md:items-center"><div><h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Your next session starts with a space.</h2><p className="mt-3 text-sm text-white/80">Find the backdrop for what you’ll make next.</p></div><Link href="/explore_studios" className="inline-flex shrink-0 items-center gap-3 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-[#b82f12] transition hover:bg-[#fff1eb]">Find Your Studio <FiArrowRight /></Link></section>
               </div>
          </main>
     );
}
