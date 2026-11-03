import { getStudioById } from '@/app/libs/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { FiArrowLeft, FiCheck, FiClock, FiMapPin, FiShield } from 'react-icons/fi';
import StudioImage from './StudioImage';

type StudioPageProps = { params: Promise<{ id: string }> };

function hasValue(value: string | number | undefined): value is string | number {
     return value !== undefined && value !== null && String(value).trim() !== '';
}

function formatPrice(value: string | number | undefined) {
     if (!hasValue(value) || !Number.isFinite(Number(value)) || Number(value) < 0) return null;
     return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 2,
          minimumFractionDigits: 0,
     }).format(Number(value));
}

async function StudioDetails({ params }: StudioPageProps) {
     const { id } = await params;
     let studio;
     try {
          studio = await getStudioById(id);
     } catch (error) {
          console.error('Studio fetch error:', error);
          return (
               <div className="rounded-2xl border border-[#eee7e3] bg-white px-6 py-16 text-center">
                    <h1 className="text-xl font-semibold">Unable to load this studio</h1>
                    <p className="mt-3 text-sm text-[#746b66]">
                         Please refresh the page to try again.
                    </p>
               </div>
          );
     }
     if (!studio) notFound();

     const category = studio.category
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
     const address = [studio.streetAddress, studio.city, studio.postalCode]
          .filter(Boolean)
          .join(', ');
     const hourlyRate = formatPrice(studio.hourlyRate);
     const deposit = formatPrice(studio.securityDeposit);
     const specs = [
          { label: 'Area', value: studio.squareFootage, unit: 'sq ft' },
          { label: 'Ceiling height', value: studio.ceilingHeight, unit: 'feet' },
          { label: 'Max crew', value: studio.maxCapacity, unit: 'people' },
          { label: 'Power', value: studio.powerSupply, unit: '' },
     ].filter((spec) => hasValue(spec.value));
     const guidelines = [
          { title: 'Overtime Policy', text: studio.overtimePolicy, icon: FiClock },
          { title: 'House Rules', text: studio.houseRules, icon: FiShield },
     ].filter((item) => item.text);
     const showPricing = hourlyRate || deposit || hasValue(studio.minimumBookingHours);

     return (
          <>
               <header className="mb-7">
                    <h1 className="wrap-break-word text-2xl font-bold tracking-tight text-[#171717] sm:text-3xl lg:text-4xl">
                         {studio.title}
                    </h1>
                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#746b66]">
                         {studio.city && (
                              <span className="inline-flex min-w-0 items-center gap-1.5">
                                   <FiMapPin
                                        className="shrink-0 text-[#c63717]"
                                        aria-hidden="true"
                                   />
                                   <span className="wrap-break-word">{studio.city}</span>
                              </span>
                         )}
                         {category && (
                              <span className="rounded-full bg-[#f3eae5] px-3 py-1 text-xs font-medium text-[#9c341b]">
                                   {category}
                              </span>
                         )}
                    </div>
               </header>

               <div
                    className={`grid items-start gap-8 lg:gap-10 ${showPricing ? 'lg:grid-cols-[minmax(0,1fr)_320px]' : ''}`}
               >
                    <div className="min-w-0 space-y-8 sm:space-y-10">
                         <StudioImage
                              key={studio.imageUrl || studio.image}
                              src={studio.imageUrl || studio.image}
                              title={studio.title}
                         />

                         {specs.length > 0 && (
                              <dl className="grid grid-cols-2 gap-6 rounded-2xl bg-[#f3f0ee] p-5 sm:grid-cols-4 sm:p-6">
                                   {specs.map((spec) => (
                                        <div key={spec.label} className="min-w-0">
                                             <dt className="text-[10px] font-medium uppercase tracking-wider text-[#81756d]">
                                                  {spec.label}
                                             </dt>
                                             <dd className="mt-2 wrap-break-word text-sm font-semibold text-[#282322]">
                                                  {spec.value} {spec.unit}
                                             </dd>
                                        </div>
                                   ))}
                              </dl>
                         )}

                         {studio.description && (
                              <section>
                                   <h2 className="text-lg font-semibold text-[#171717]">
                                        About the Space
                                   </h2>
                                   <p className="mt-4 whitespace-pre-line wrap-break-word text-sm leading-7 text-[#66574f]">
                                        {studio.description}
                                   </p>
                              </section>
                         )}

                         {!!studio.amenities?.length && (
                              <section className="rounded-2xl bg-[#f3f0ee] p-5 sm:p-6">
                                   <h2 className="text-lg font-semibold text-[#171717]">
                                        Amenities & Included Gear
                                   </h2>
                                   <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                                        {studio.amenities.map((amenity, index) => (
                                             <li
                                                  key={`${amenity}-${index}`}
                                                  className="flex items-start gap-3 rounded-xl bg-[#fdfbf9] p-4"
                                             >
                                                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f8e6df] text-[#c63717]">
                                                       <FiCheck size={16} aria-hidden="true" />
                                                  </span>
                                                  <span className="min-w-0 self-center wrap-break-word text-sm font-medium leading-5 text-[#3d322c]">
                                                       {amenity}
                                                  </span>
                                             </li>
                                        ))}
                                   </ul>
                              </section>
                         )}

                         {address && (
                              <section>
                                   <h2 className="text-lg font-semibold text-[#171717]">
                                        Location & Address
                                   </h2>
                                   <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#eee5df] bg-white p-5">
                                        <FiMapPin
                                             size={20}
                                             className="mt-0.5 shrink-0 text-[#c63717]"
                                             aria-hidden="true"
                                        />
                                        <address className="min-w-0 wrap-break-word text-sm not-italic leading-7 text-[#66574f]">
                                             {address}
                                        </address>
                                   </div>
                              </section>
                         )}

                         {guidelines.length > 0 && (
                              <section>
                                   <h2 className="text-lg font-semibold text-[#171717]">
                                        Studio Guidelines
                                   </h2>
                                   <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                        {guidelines.map(({ title, text, icon: Icon }) => (
                                             <div
                                                  key={title}
                                                  className="flex items-start gap-3 rounded-xl bg-[#f3f0ee] p-5"
                                             >
                                                  <Icon
                                                       size={18}
                                                       className="mt-0.5 shrink-0 text-[#c63717]"
                                                       aria-hidden="true"
                                                  />
                                                  <div className="min-w-0">
                                                       <h3 className="text-sm font-semibold">
                                                            {title}
                                                       </h3>
                                                       <p className="mt-2 whitespace-pre-line wrap-break-word text-sm leading-6 text-[#74665d]">
                                                            {text}
                                                       </p>
                                                  </div>
                                             </div>
                                        ))}
                                   </div>
                              </section>
                         )}
                    </div>

                    {showPricing && (
                         <aside
                              aria-label="Studio pricing"
                              className="min-w-0 rounded-2xl border border-[#f0eae5] bg-white p-6 shadow-lg shadow-[#382619]/5 lg:sticky lg:top-24 lg:p-7"
                         >
                              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8b7b71]">
                                   Rates & Booking Minimum
                              </h2>
                              {hourlyRate && (
                                   <p className="mt-5 text-3xl font-bold text-[#c63717]">
                                        {hourlyRate}
                                        <span className="ml-1.5 text-sm font-normal text-[#746b66]">
                                             / hour
                                        </span>
                                   </p>
                              )}
                              <dl className="mt-6 space-y-5 border-t border-[#f0eae5] pt-6 text-sm">
                                   {hasValue(studio.minimumBookingHours) && (
                                        <div className="flex items-start justify-between gap-4">
                                             <dt className="text-[#746b66]">Minimum booking</dt>
                                             <dd className="wrap-break-word text-right font-semibold text-[#282322]">
                                                  {studio.minimumBookingHours} hours
                                             </dd>
                                        </div>
                                   )}
                                   {deposit && (
                                        <div className="flex items-start justify-between gap-4">
                                             <dt className="text-[#746b66]">Security deposit</dt>
                                             <dd className="text-right font-semibold text-[#282322]">
                                                  {deposit}
                                             </dd>
                                        </div>
                                   )}
                              </dl>
                         </aside>
                    )}
               </div>
          </>
     );
}

function StudioLoading() {
     return (
          <div
               role="status"
               aria-label="Loading studio details"
               className="animate-pulse space-y-6"
          >
               <span className="sr-only">Loading studio details…</span>
               <div className="h-10 w-3/4 rounded-lg bg-[#eee9e5]" />
               <div className="h-5 w-1/3 rounded-lg bg-[#eee9e5]" />
               <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
                    <div className="aspect-4/3 rounded-2xl bg-[#eee9e5] sm:aspect-16/10" />
                    <div className="h-64 rounded-2xl bg-[#eee9e5]" />
               </div>
          </div>
     );
}

export default function SingleStudiosPage({ params }: StudioPageProps) {
     return (
          <main className="flex-1 bg-[#faf8f7] py-8 text-[#282322] sm:py-10">
               <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
                    <Link
                         href="/explore_studios"
                         className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#746b66] transition hover:text-[#c63717]"
                    >
                         <FiArrowLeft aria-hidden="true" /> Back to studios
                    </Link>
                    <Suspense fallback={<StudioLoading />}>
                         <StudioDetails params={params} />
                    </Suspense>
               </div>
          </main>
     );
}
