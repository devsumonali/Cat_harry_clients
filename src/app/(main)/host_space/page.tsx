import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiCheck, FiGrid, FiSliders, FiCamera, FiFileText } from 'react-icons/fi';

const benefits = [
     { icon: FiGrid, title: 'Make room for possibility', text: 'Introduce your loft, stage or creative workspace to people looking for a setting for their next project.' },
     { icon: FiSliders, title: 'Set your own terms', text: 'Describe your hourly rate, minimum booking hours, security deposit and house rules in your listing.' },
     { icon: FiCamera, title: 'Show what makes it yours', text: 'Highlight the light, layout, equipment and character that make your studio a place worth creating in.' },
];
const steps = [
     { number: '01', title: 'Introduce your space', text: 'Add a clear title, category and description. Help creators picture what they can make there.' },
     { number: '02', title: 'Share the practical details', text: 'Include dimensions, crew capacity, amenities, address and a clear photograph of the studio.' },
     { number: '03', title: 'Set rates & house rules', text: 'Choose your hourly rate, deposit and minimum hours. Explain your overtime policy and restrictions.' },
];
const spaces = [
     { name: 'Photo Studios', image: '/images/home/category-daylight.png' },
     { name: 'Sound Stages', image: '/images/home/category-soundstage.png' },
     { name: 'Podcast Rooms', image: '/images/home/hero-recording.png' },
     { name: 'Music Suites', image: '/images/home/hero-recording.png' },
     { name: 'Art Workshops', image: '/images/home/category-industrial.png' },
];

export default function HostSpacePage() {
     return (
          <main className="flex-1 bg-[#faf8f7] text-[#211d1a]">
               <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <section className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
                         <div><p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#D52B00]">For the space makers</p><h1 className="text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">Your space.<br />Their next<br /><span className="text-[#D52B00]">great idea.</span></h1><p className="mt-6 max-w-lg text-sm leading-7 text-[#76685f] sm:text-base">Open your doors to photographers, filmmakers, podcasters, musicians and creative teams. Give your studio a place to be discovered.</p><Link href="/dashboard/add_studios" className="mt-8 inline-flex items-center gap-3 rounded-lg bg-[#D52B00] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#B82500]">List Your Space <FiArrowRight /></Link><p className="mt-5 text-xs text-[#8a7c73]">Your character. Your rates. Your house rules.</p></div>
                         <div className="relative">
                              <div className="relative aspect-[5/4] overflow-hidden rounded-2xl lg:aspect-square"><Image src="/images/home/category-industrial.png" alt="Spacious brick warehouse with steel beams and warm natural light" fill sizes="(max-width: 1023px) 100vw, 50vw" loading="eager" className="object-cover" /></div>
                              <div className="absolute inset-x-5 bottom-5 rounded-xl bg-[#211d1a]/85 p-5 text-white backdrop-blur"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f5b89f]">A space with a story</p><p className="mt-2 text-lg font-semibold">Let someone create their next chapter here.</p></div>
                         </div>
                    </section>
                    <section className="border-t border-[#e9e1db] py-14 sm:py-16">
                         <div className="mb-8"><p className="text-xs font-semibold uppercase tracking-widest text-[#D52B00]">Why share your space?</p><h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Built around what makes you different.</h2></div>
                         <div className="grid gap-5 md:grid-cols-3">{benefits.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-[#eee6e0] bg-white p-6 sm:p-7"><span className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-[#faeee8] text-[#D52B00]"><Icon size={21} /></span><h3 className="text-base font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-[#81746b]">{text}</p></article>)}</div>
                    </section>
                    <section className="rounded-2xl bg-[#f1ece7] p-6 sm:p-10">
                         <div className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-xs font-semibold uppercase tracking-widest text-[#D52B00]">Start with the essentials</p><h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">A thoughtful listing goes a long way.</h2></div><FiFileText size={32} className="shrink-0 text-[#D52B00]" /></div>
                         <ol className="grid gap-7 md:grid-cols-3">{steps.map((step) => <li key={step.number} className="border-t border-[#dcd1c8] pt-5"><span className="text-sm font-semibold text-[#D52B00]">{step.number}</span><h3 className="mt-4 text-base font-semibold">{step.title}</h3><p className="mt-3 text-sm leading-7 text-[#81746b]">{step.text}</p></li>)}</ol>
                    </section>
                    <section className="py-14 sm:py-20">
                         <div className="mb-8 text-center"><p className="text-xs font-semibold uppercase tracking-widest text-[#D52B00]">Different spaces. Shared creativity.</p><h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">There’s more than one kind of studio.</h2></div>
                         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">{spaces.map((space) => <article key={space.name} className="relative aspect-[4/5] overflow-hidden rounded-xl"><Image src={space.image} alt={space.name} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 20vw" className="object-cover" /><div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-transparent" /><h3 className="absolute inset-x-0 bottom-0 p-4 text-sm font-semibold text-white sm:p-5 sm:text-base">{space.name}</h3></article>)}</div>
                    </section>
                    <section className="pb-14 sm:pb-20">
                         <div className="mb-8"><p className="text-xs font-semibold uppercase tracking-widest text-[#D52B00]">Beyond your first listing</p><h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">A clear path from listing to hosting.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-[#81746b]">Keep your studio information accurate so creators can plan with confidence.</p></div>
                         <div className="grid gap-5 md:grid-cols-3">
                              {[
                                   { number: '01', title: 'Add New Studio', text: 'Prepare your title, category, hourly rate, deposit, capacity, address, photo, amenities and overview, together with your host name and email.' },
                                   { number: '02', title: 'My Studio Listings', text: 'Use your own listings as the starting point for managing the spaces you share with the creative community.' },
                                   { number: '03', title: 'Update or Remove', text: 'Keep photos, pricing and specifications current. Review the details carefully before confirming a listing deletion.' },
                              ].map((item) => <article key={item.number} className="h-full rounded-2xl border border-[#eee6e0] bg-white p-6"><span className="text-xs font-semibold text-[#D52B00]">{item.number}</span><h3 className="mt-4 text-base font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-7 text-[#81746b]">{item.text}</p></article>)}
                         </div>
                    </section>
                    <section className="mb-16 grid gap-8 rounded-2xl bg-[#28211d] p-7 text-white sm:p-10 lg:grid-cols-2 lg:gap-16">
                         <div><p className="text-xs font-semibold uppercase tracking-widest text-[#f5b89f]">Ready when you are</p><h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Make a great first impression.</h2><p className="mt-4 text-sm leading-7 text-[#c3b6ad]">Gather the details that matter, then give your space the introduction it deserves.</p><Link href="/dashboard/add_studios" className="mt-6 inline-flex items-center gap-3 rounded-lg bg-[#D52B00] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#B82500]">Create Your Listing <FiArrowRight /></Link></div>
                         <ul className="space-y-4 self-center">{['A clear, well-lit studio photograph', 'Accurate dimensions and crew capacity', 'A complete list of included amenities', 'Your rates, security deposit and studio guidelines', 'Your name and email for your host profile'].map((item) => <li key={item} className="flex items-center gap-3 border-b border-white/10 pb-4 text-sm text-[#e2d8d1]"><FiCheck className="shrink-0 text-[#f5b89f]" size={18} />{item}</li>)}</ul>
                    </section>
               </div>
          </main>
     );
}
