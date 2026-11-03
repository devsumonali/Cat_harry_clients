import SaveStudioButton from '@/app/component/shared/SaveStudioButton';
import { getCategories } from '@/app/libs/api';
import type { TExploreStudio, ExploreStudiosPageProps, ExploreStudioCardProps, FilterSidebarProps } from '@/app/types/type';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import {
     FiChevronLeft,
     FiChevronRight,
     FiMapPin,
     FiStar,
     FiX,
     FiZap,
} from 'react-icons/fi';

const PER_PAGE = 6;

// Studio Card
const ExploreStudioCard = ({ studio }: ExploreStudioCardProps) => {
     const imageSrc = studio.imageUrl || studio.image || studio.images?.[0];

     const price = Number(studio.hourlyRate);
     const area = Number(studio.squareFootage);

     const categoryName = studio.category
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

     return (
          <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#f0ecea] bg-white p-3 transition-shadow hover:shadow-md">
               {/* Studio Image */}
               <div className="relative h-44 overflow-hidden rounded-lg bg-[#eee9e5] sm:h-48">
                    <Link href={`/explore_studios/${studio._id}`} className="block h-full w-full">
                         {imageSrc ? (
                              <Image
                                   src={imageSrc}
                                   alt={studio.title}
                                   fill
                                   unoptimized
                                   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                   className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                         ) : (
                              <div className="flex h-full items-center justify-center text-xs text-gray-400">
                                   No Image Available
                              </div>
                         )}
                    </Link>

                    {/* Instant Booking */}
                    {studio.instantBook && (
                         <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[10px] font-medium text-[#3b302b]">
                              <FiZap className="fill-[#D52B00] text-[#D52B00]" />
                              Instant Book
                         </span>
                    )}

                    <SaveStudioButton studioId={studio._id} />

                    {/* Location */}
                    {studio.city && (
                         <span className="absolute bottom-2 left-2 flex max-w-[90%] items-center gap-1 truncate rounded-full bg-black/75 px-2.5 py-1.5 text-[10px] text-white backdrop-blur-sm">
                              <FiMapPin size={11} />
                              {studio.city}
                         </span>
                    )}
               </div>

               {/* Studio Info */}
               <div className="flex flex-1 flex-col pt-3">
                    <div className="mb-1 flex items-center justify-between gap-2">
                         <p className="truncate text-[10px] text-[#817a76]">
                              {studio.city || 'StudioSpace'}
                              {Number.isFinite(area) && area > 0
                                   ? ` · ${area.toLocaleString()} sq ft`
                                   : ''}
                         </p>

                         {typeof studio.rating === 'number' && (
                              <span className="inline-flex shrink-0 items-center gap-1 text-[10px] text-[#2b2522]">
                                   <FiStar className="fill-[#D52B00] text-[#D52B00]" />
                                   {studio.rating.toFixed(2)}
                              </span>
                         )}
                    </div>

                    <Link
                         href={`/explore_studios/${studio._id}`}
                         className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-[#171717] transition hover:text-[#D52B00]"
                    >
                         {studio.title}
                    </Link>

                    <p className="mt-1 truncate text-xs text-[#817a76]">{categoryName}</p>

                    <div className="mt-auto flex items-center justify-between gap-2 border-t border-[#f0ecea] pt-3">
                         <div className="text-xs text-[#D52B00]">
                              <span className="font-bold">
                                   {Number.isFinite(price) ? `$${price.toLocaleString()}` : 'N/A'}
                              </span>
                              {Number.isFinite(price) && (
                                   <span className="font-normal text-[#817a76]"> / hr</span>
                              )}
                         </div>

                         <Link
                              href={`/explore_studios/${studio._id}`}
                              className="rounded-full bg-[#f0eded] px-3 py-2 text-[10px] font-medium text-[#302825] transition hover:bg-[#D52B00] hover:text-white"
                         >
                              View More
                         </Link>
                    </div>
               </div>
          </article>
     );
};

const FilterSidebar = ({ categories, amenities, selectedCategories, selectedAmenities, maxPrice }: FilterSidebarProps) => {
     return (
          <aside className="h-fit rounded-xl border border-[#f0ecea] bg-white p-5 lg:sticky lg:top-24">
               <form id="studio-filters" action="/explore_studios" method="get">
                    <div className="mb-6 flex items-center justify-between">
                         <h2 className="text-base font-bold text-[#171717]">Filters</h2>
                         <Link href="/explore_studios" className="text-xs font-medium text-[#D52B00]">Reset</Link>
                    </div>
                    <fieldset className="mb-7">
                         <legend className="mb-3 text-xs font-semibold text-[#292321]">Category</legend>
                         <div className="space-y-2.5">
                              {categories.map((item) => (
                                   <label key={item.slug} className="flex cursor-pointer items-center gap-2.5 text-xs text-[#68615e]">
                                        <input type="checkbox" name="category" value={item.slug} defaultChecked={selectedCategories.includes(item.slug)} className="h-3.5 w-3.5 accent-[#D52B00]" />
                                        {item.name}
                                   </label>
                              ))}
                         </div>
                    </fieldset>
                    <div className="mb-7">
                         <label htmlFor="max-price" className="mb-3 block text-xs font-semibold text-[#292321]">Maximum Price / Hour</label>
                         <input id="max-price" type="number" name="maxPrice" min="0" step="any" defaultValue={maxPrice || ''} placeholder="No maximum" className="w-full rounded-lg border border-[#eee9e5] bg-[#f7f5f4] px-3 py-2.5 text-xs outline-none focus:border-[#D52B00]" />
                    </div>
                    <fieldset className="mb-6">
                         <legend className="mb-3 text-xs font-semibold text-[#292321]">Amenities & Features</legend>
                         <div className="space-y-2.5">
                              {amenities.map((amenity) => (
                                   <label key={amenity} className="flex cursor-pointer items-center gap-2.5 text-xs text-[#68615e]">
                                        <input type="checkbox" name="amenities" value={amenity} defaultChecked={selectedAmenities.includes(amenity)} className="h-3.5 w-3.5 shrink-0 accent-[#D52B00]" />
                                        {amenity}
                                   </label>
                              ))}
                         </div>
                    </fieldset>
                    <button type="submit" className="w-full cursor-pointer rounded-full bg-[#b52e00] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#922508]">Apply Filters</button>
               </form>
          </aside>
     );
};

const ExploreStudiosPage = async ({ searchParams }: ExploreStudiosPageProps) => {
     const { category, amenities, maxPrice, sort = 'all', page } = await searchParams;
     const selectedCategories = category ? (Array.isArray(category) ? category : [category]) : [];
     const selectedAmenities = amenities ? (Array.isArray(amenities) ? amenities : [amenities]) : [];
     const categories = await getCategories();

     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`, {
          cache: 'no-store',
     });

     const result = response.ok ? await response.json() : [];

     const allStudios: TExploreStudio[] = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
            ? result.data
            : [];

     const filterAmenities = [...new Set(allStudios.flatMap((studio) => studio.amenities || []))];
     const studios = allStudios.filter((studio) => {
          const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(studio.category);
          const matchesPrice = !maxPrice || Number(studio.hourlyRate) <= Number(maxPrice);
          const matchesAmenities = selectedAmenities.every((amenity) => studio.amenities?.includes(amenity));
          return matchesCategory && matchesPrice && matchesAmenities;
     });

     if (sort === 'low') studios.sort((a, b) => Number(a.hourlyRate) - Number(b.hourlyRate));
     if (sort === 'high') studios.sort((a, b) => Number(b.hourlyRate) - Number(a.hourlyRate));

     const filterParams = new URLSearchParams();
     selectedCategories.forEach((value) => filterParams.append('category', value));
     selectedAmenities.forEach((value) => filterParams.append('amenities', value));
     if (maxPrice) filterParams.set('maxPrice', maxPrice);
     if (sort !== 'all') filterParams.set('sort', sort);

     const activeFilters = [
          ...selectedCategories.map((value) => ({ key: 'category', value, label: categories.find((item) => item.slug === value)?.name || value })),
          ...selectedAmenities.map((value) => ({ key: 'amenities', value, label: value })),
          ...(maxPrice ? [{ key: 'maxPrice', value: maxPrice, label: 'Up to $' + maxPrice + '/hr' }] : []),
     ];
     const removeFilterUrl = (key: string, value: string) => {
          const params = new URLSearchParams(filterParams);
          params.delete(key, value);
          return '/explore_studios?' + params.toString();
     };

     const totalStudios = studios.length;
     const totalPages = Math.max(1, Math.ceil(totalStudios / PER_PAGE));

     const requestedPage = Number(page || 1);

     const currentPage = Number.isInteger(requestedPage)
          ? Math.min(Math.max(requestedPage, 1), totalPages)
          : 1;

     const startIndex = (currentPage - 1) * PER_PAGE;

     const visibleStudios = studios.slice(startIndex, startIndex + PER_PAGE);

     const createPageUrl = (pageNumber: number) => {
          const params = new URLSearchParams(filterParams);
          params.set('page', String(pageNumber));
          return '/explore_studios?' + params.toString();
     };

     return (
          <main className="min-h-screen bg-[#faf8f7] pb-16">
               <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                    {/* Active Filters Top Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#eee9e5] py-5">
                         <div className="flex flex-wrap items-center gap-2">
                              <span className="mr-2 text-[10px] font-medium uppercase tracking-wider text-[#68615e]">
                                   Active Filters
                              </span>

                              {activeFilters.map((filter) => (
                                   <Link key={filter.key + filter.value} href={removeFilterUrl(filter.key, filter.value)} aria-label={'Remove ' + filter.label + ' filter'} className="inline-flex items-center gap-1 rounded-full bg-[#f0eded] px-3 py-1.5 text-[11px] text-[#302825]">
                                        {filter.label}<FiX size={12} />
                                   </Link>
                              ))}
                              {activeFilters.length === 0 ? (
                                   <span className="text-xs text-[#8c8580]">All Studios</span>
                              ) : (
                                   <Link href="/explore_studios" className="ml-2 text-xs font-medium text-[#D52B00]">Clear all</Link>
                              )}
                         </div>

                         <div className="flex items-center gap-4">
                              <span className="text-xs text-[#68615e]">
                                   Showing {totalStudios} studios
                              </span>

                              {/* Applied with the sidebar filters */}
                              <select
                                   key={sort}
                                   name="sort"
                                   form="studio-filters"
                                   defaultValue={sort}
                                   aria-label="Sort studios"
                                   className="rounded-lg bg-transparent text-xs text-[#302825] outline-none disabled:opacity-70"
                              >
                                   <option value="all">Default Order</option>
                                   <option value="low">Price: Low to High</option>
                                   <option value="high">Price: High to Low</option>
                              </select>
                         </div>
                    </div>

                    {/* Sidebar + Studio Cards */}
                    <div className="grid grid-cols-1 items-start gap-6 py-8 lg:grid-cols-[245px_minmax(0,1fr)]">
                         <FilterSidebar key={filterParams.toString()} categories={categories} amenities={filterAmenities} selectedCategories={selectedCategories} selectedAmenities={selectedAmenities} maxPrice={maxPrice} />

                         <div>
                              {visibleStudios.length > 0 ? (
                                   <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                        {visibleStudios.map((studio) => (
                                             <ExploreStudioCard key={studio._id} studio={studio} />
                                        ))}
                                   </div>
                              ) : (
                                   <div className="rounded-xl bg-white px-6 py-20 text-center">
                                        <h2 className="text-lg font-semibold">No Studios Found</h2>

                                        <p className="mt-2 text-sm text-gray-500">
                                             No studios match your selected filters.
                                        </p>

                                        <Link
                                             href="/explore_studios"
                                             className="mt-5 inline-block text-sm font-medium text-[#D52B00]"
                                        >
                                             Explore All Studios
                                        </Link>
                                   </div>
                              )}

                              {/* Pagination */}
                              {totalPages > 1 && (
                                   <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                                        <Link
                                             href={createPageUrl(Math.max(1, currentPage - 1))}
                                             aria-label="Previous page"
                                             className={`flex h-9 w-9 items-center justify-center rounded-lg bg-[#eeeae8] text-[#302825] ${
                                                  currentPage === 1
                                                       ? 'pointer-events-none opacity-40'
                                                       : ''
                                             }`}
                                        >
                                             <FiChevronLeft size={16} />
                                        </Link>

                                        {Array.from(
                                             { length: totalPages },
                                             (_, index) => index + 1,
                                        ).map((pageNumber) => (
                                             <Link
                                                  key={pageNumber}
                                                  href={createPageUrl(pageNumber)}
                                                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-semibold ${
                                                       currentPage === pageNumber
                                                            ? 'bg-[#b52e00] text-white'
                                                            : 'bg-[#eeeae8] text-[#302825] hover:bg-[#e2d9d5]'
                                                  }`}
                                             >
                                                  {pageNumber}
                                             </Link>
                                        ))}

                                        <Link
                                             href={createPageUrl(
                                                  Math.min(totalPages, currentPage + 1),
                                             )}
                                             aria-label="Next page"
                                             className={`flex h-9 w-9 items-center justify-center rounded-lg bg-[#eeeae8] text-[#302825] ${
                                                  currentPage === totalPages
                                                       ? 'pointer-events-none opacity-40'
                                                       : ''
                                             }`}
                                        >
                                             <FiChevronRight size={16} />
                                        </Link>
                                   </div>
                              )}
                         </div>
                    </div>
               </div>
          </main>
     );
};

export default function ExploreStudios(props: ExploreStudiosPageProps) {
     return <Suspense fallback={<div className="container mx-auto px-4 py-12 text-sm text-[#817a76]" role="status">Loading studios…</div>}><ExploreStudiosPage {...props} /></Suspense>;
}
