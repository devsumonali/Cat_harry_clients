import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiAperture, FiUsers, FiEye, FiHeart } from 'react-icons/fi';

const values = [
     { icon: FiEye, title: 'Clarity before commitment', text: 'Useful descriptions, practical specifications and visible rates help creators make more informed choices.' },
     { icon: FiUsers, title: 'Respect for both sides', text: 'Great sessions start with shared expectations. Clear house rules help creators and space owners work together.' },
     { icon: FiHeart, title: 'Room for individuality', text: 'A sunlit loft and a dark soundstage serve different ideas. We believe that difference is worth celebrating.' },
];

export default function AboutPage() {
     return (
          <main className="flex-1 bg-[#faf8f7] text-[#211d1a]">
               <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <section className="py-12 text-center sm:py-16 lg:py-20">
                         <span className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fae9e1] text-[#D52B00]"><FiAperture size={27} /></span>
                         <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#D52B00]">A little about StudioSpace</p>
                         <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">Great ideas deserve<br /><span className="text-[#D52B00]">a place to happen.</span></h1>
                         <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#76685f] sm:text-base">StudioSpace is a peer-to-peer marketplace for photographers, filmmakers, podcasters and musicians. Discover creative workspaces, compare hourly rates and plan the space for your next production.</p>
                    </section>

                    <section aria-label="Spaces for different creative disciplines" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                         <div className="relative aspect-[4/5] overflow-hidden rounded-2xl"><Image src="/images/home/hero-daylight.png" alt="Warm daylight filling an open photography loft" fill sizes="(max-width: 639px) 100vw, 33vw" loading="eager" className="object-cover" /></div>
                         <div className="relative aspect-[4/5] overflow-hidden rounded-2xl"><Image src="/images/home/hero-recording.png" alt="Microphones and acoustic treatment in a recording studio" fill sizes="(max-width: 639px) 100vw, 33vw" className="object-cover object-right" /></div>
                         <div className="relative aspect-[4/5] overflow-hidden rounded-2xl"><Image src="/images/home/category-soundstage.png" alt="Cinema camera and lights on a production soundstage" fill sizes="(max-width: 639px) 100vw, 33vw" className="object-cover" /></div>
                    </section>

                    <section className="grid gap-8 py-14 sm:py-20 md:grid-cols-2 lg:gap-20">
                         <div><p className="text-xs font-semibold uppercase tracking-widest text-[#D52B00]">Our purpose</p><h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">The right space changes<br />what’s possible.</h2></div>
                         <div className="space-y-5 text-sm leading-7 text-[#76685f] sm:text-base"><p>A room is more than its dimensions. It’s the light through the windows, the quiet between takes, and the freedom to try an idea you haven’t tried before.</p><p>StudioSpace brings those details into focus. We connect the people who care for creative spaces with the people ready to use them, making discovery and planning part of the creative process.</p><p className="font-medium text-[#352b25]">For the first shoot. The next episode. The idea that won’t wait.</p></div>
                    </section>

                    <section className="rounded-2xl bg-[#f1ece7] p-6 sm:p-10">
                         <div className="mb-8"><p className="text-xs font-semibold uppercase tracking-widest text-[#D52B00]">What matters to us</p><h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Thoughtful spaces. Thoughtful connections.</h2></div>
                         <div className="grid gap-5 md:grid-cols-3">{values.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-xl bg-[#faf8f7] p-6"><Icon size={24} className="mb-6 text-[#D52B00]" /><h3 className="text-base font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-[#81746b]">{text}</p></article>)}</div>
                    </section>

                    <section className="grid items-center gap-8 py-14 sm:py-20 md:grid-cols-2 lg:gap-16">
                         <div className="relative aspect-[5/4] overflow-hidden rounded-2xl"><Image src="/images/home/category-industrial.png" alt="Open industrial studio with brick walls and tall windows" fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" /></div>
                         <div><p className="text-xs font-semibold uppercase tracking-widest text-[#D52B00]">One community, many perspectives</p><h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">For the people behind the work.</h2><p className="mt-5 text-sm leading-7 text-[#81746b]">Photographers, filmmakers, podcasters, musicians, independent creators and studio owners all bring something different. StudioSpace is built around the moments where those perspectives meet.</p><div className="mt-6 flex flex-wrap gap-2">{['Photographers', 'Filmmakers', 'Podcasters', 'Musicians', 'Creative teams', 'Studio hosts'].map((item) => <span key={item} className="rounded-full border border-[#e5dbd3] px-3 py-2 text-xs text-[#6d5c50]">{item}</span>)}</div><Link href="/how_it_works" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#D52B00] transition hover:text-[#982900]">See How It Works <FiArrowRight /></Link></div>
                    </section>

                    <section className="mb-14 rounded-2xl border border-[#eee6e0] bg-white p-6 sm:mb-20 sm:p-10">
                         <div className="mb-8"><p className="text-xs font-semibold uppercase tracking-widest text-[#D52B00]">Host guarantee & creator support</p><h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Trust is part of the creative process.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-[#81746b]">Our vision for a better studio marketplace puts people, spaces and equipment at the centre of every session.</p></div>
                         <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                              {[
                                   { title: 'Liability protection', text: 'Clear responsibilities and protection terms should help both hosts and creators understand their booking.' },
                                   { title: 'Verified profiles', text: 'Trust starts with knowing who is sharing a space and who is coming to create in it.' },
                                   { title: 'Equipment safety', text: 'Accurate inventories, careful handling and clear studio guidelines help protect the tools behind the work.' },
                                   { title: '24/7 host support', text: 'Our goal is dependable help for hosts, because creative schedules do not always follow office hours.' },
                              ].map((item) => <article key={item.title} className="h-full rounded-xl bg-[#faf8f7] p-5"><h3 className="text-sm font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-7 text-[#81746b]">{item.text}</p></article>)}
                         </div>
                    </section>
                    <section className="mb-16 rounded-2xl bg-[#D52B00] px-6 py-12 text-center text-white sm:px-10">
                         <p className="text-xs font-semibold uppercase tracking-widest text-white/70">Make space for what’s next</p><h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">There’s a place for your vision.</h2><p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-white/80">Find a space to create in, or share a space that inspires you.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/explore_studios" className="inline-flex items-center gap-3 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-[#b82f12] transition hover:bg-[#fff1eb]">Explore Studios <FiArrowRight /></Link><Link href="/host_space" className="rounded-lg border border-white/50 px-6 py-3.5 text-sm font-semibold transition hover:bg-white/10">Host Your Space</Link></div>
                    </section>
               </div>
          </main>
     );
}
