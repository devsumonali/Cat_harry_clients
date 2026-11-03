import Image from 'next/image';
import Link from 'next/link';
import {
     FiChevronLeft,
     FiChevronRight,
     FiHeart,
     FiMapPin,
     FiSearch,
     FiStar,
     FiX,
     FiZap,
} from 'react-icons/fi';

type TStudio = {
     _id: string;
     title: string;
     category: string;
     city?: string;
     streetAddress?: string;
     imageUrl?: string;
     image?: string;
     images?: string[];
     squareFootage?: number | string;
     hourlyRate?: number | string;
     rating?: number;
     instantBook?: boolean;
     isFeatured?: boolean;
};

type PageProps = {
     searchParams: Promise<{
          category?: string;
          page?: string;
     }>;
};

const filterCategories = [
     { label: 'Photo Studio', slug: 'daylight-loft' },
     { label: 'Video & Film Stage', slug: 'cyc-wall' },
     { label: 'Sound Recording', slug: 'soundstage' },
     { label: 'Podcast Lounge', slug: 'podcast-lounge' },
     { label: 'Art Gallery Loft', slug: 'industrial' },
];

const filterAmenities = [
     'Cyclorama Wall',
     'Freight Elevator',
     'Natural Light',
     'Soundproof Studio',
     'Makeup & Dressing Room',
];

const PER_PAGE = 6;

// Studio Card
const ExploreStudioCard = ({ studio }: { studio: TStudio }) => {
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

                    {/* Wishlist - UI Only */}
                    <span
                         title="Wishlist coming soon"
                         className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#292321]"
                    >
                         <FiHeart size={15} />
                    </span>

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

// Static Filter Sidebar
const FilterSidebar = ({ category }: { category?: string }) => {
     return (
          <aside className="h-fit rounded-xl border border-[#f0ecea] bg-white p-5 lg:sticky lg:top-24">
               <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-base font-bold text-[#171717]">Filters</h2>

                    <Link href="/studios" className="text-xs font-medium text-[#D52B00]">
                         Reset
                    </Link>
               </div>

               {/* Category */}
               <div className="mb-7">
                    <h3 className="mb-3 text-xs font-semibold text-[#292321]">Category</h3>

                    <div className="space-y-2.5">
                         {filterCategories.map((item) => (
                              <label
                                   key={item.slug}
                                   className="flex cursor-pointer items-center gap-2.5 text-xs text-[#68615e]"
                              >
                                   <input
                                        type="checkbox"
                                        defaultChecked={category === item.slug}
                                        className="h-3.5 w-3.5 accent-[#D52B00]"
                                   />
                                   {item.label}
                              </label>
                         ))}
                    </div>
               </div>

               {/* Price Range */}
               <div className="mb-7">
                    <div className="mb-3 flex items-center justify-between gap-2">
                         <h3 className="text-xs font-semibold text-[#292321]">Price Range</h3>
                         <span className="text-[10px] font-medium text-[#D52B00]">
                              $0 - $250+/hr
                         </span>
                    </div>

                    <input
                         type="range"
                         min="0"
                         max="500"
                         defaultValue="250"
                         className="w-full accent-[#D52B00]"
                    />

                    <div className="mt-2 flex justify-between text-[10px] text-[#8c8580]">
                         <span>$0/hr</span>
                         <span>$500+/hr</span>
                    </div>
               </div>

               {/* Location */}
               <div className="mb-7">
                    <h3 className="mb-3 text-xs font-semibold text-[#292321]">Location</h3>

                    <div className="flex items-center gap-2 rounded-lg bg-[#f7f5f4] px-3 py-2.5">
                         <FiSearch size={14} className="shrink-0 text-[#8c8580]" />
                         <input
                              type="text"
                              placeholder="Neighborhood or City..."
                              className="w-full min-w-0 bg-transparent text-xs outline-none placeholder:text-[#a39a95]"
                         />
                    </div>
               </div>

               {/* Minimum Rating */}
               <div className="mb-7">
                    <h3 className="mb-3 text-xs font-semibold text-[#292321]">Minimum Rating</h3>

                    <div className="space-y-2">
                         {[4.95, 4.5].map((rating) => (
                              <label
                                   key={rating}
                                   className="flex cursor-pointer items-center gap-2 text-xs text-[#554e4a]"
                              >
                                   <input type="radio" name="rating" className="accent-[#D52B00]" />

                                   <span className="text-[#f59e0b]">★★★★★</span>

                                   <span className="text-[10px]">{rating} & above</span>
                              </label>
                         ))}
                    </div>
               </div>

               {/* Amenities */}
               <div className="mb-6">
                    <h3 className="mb-3 text-xs font-semibold text-[#292321]">
                         Amenities & Features
                    </h3>

                    <div className="space-y-2.5">
                         {filterAmenities.map((amenity) => (
                              <label
                                   key={amenity}
                                   className="flex cursor-pointer items-center gap-2.5 text-xs text-[#68615e]"
                              >
                                   <input
                                        type="checkbox"
                                        className="h-3.5 w-3.5 accent-[#D52B00]"
                                   />
                                   {amenity}
                              </label>
                         ))}
                    </div>
               </div>

               {/* Static UI Button */}
               <button
                    type="button"
                    disabled
                    title="Dynamic filters will be added later"
                    className="w-full cursor-not-allowed rounded-full bg-[#b52e00] px-4 py-3 text-xs font-semibold text-white opacity-80"
               >
                    Apply Filters
               </button>
          </aside>
     );
};

const ExploreStudiosPage = async ({ searchParams }: PageProps) => {
     const { category, page } = await searchParams;

     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`, {
          cache: 'no-store',
     });

     const result = response.ok ? await response.json() : [];

     const allStudios: TStudio[] = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
            ? result.data
            : [];

     // Category link filtering works now.
     // Sidebar filters are UI-only for now.
     const studios = category
          ? allStudios.filter((studio) => studio.category === category)
          : allStudios;

     const totalStudios = studios.length;
     const totalPages = Math.max(1, Math.ceil(totalStudios / PER_PAGE));

     const requestedPage = Number(page || 1);

     const currentPage = Number.isInteger(requestedPage)
          ? Math.min(Math.max(requestedPage, 1), totalPages)
          : 1;

     const startIndex = (currentPage - 1) * PER_PAGE;

     const visibleStudios = studios.slice(startIndex, startIndex + PER_PAGE);

     const createPageUrl = (pageNumber: number) => {
          const params = new URLSearchParams();

          if (category) {
               params.set('category', category);
          }

          params.set('page', String(pageNumber));

          return `/studios?${params.toString()}`;
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

                              {category ? (
                                   <Link
                                        href="/studios"
                                        className="inline-flex items-center gap-1 rounded-full bg-[#f0eded] px-3 py-1.5 text-[11px] text-[#302825]"
                                   >
                                        {category
                                             .split('-')
                                             .map(
                                                  (word) =>
                                                       word.charAt(0).toUpperCase() + word.slice(1),
                                             )
                                             .join(' ')}
                                        <FiX size={12} />
                                   </Link>
                              ) : (
                                   <span className="text-xs text-[#8c8580]">All Categories</span>
                              )}

                              {category && (
                                   <Link
                                        href="/studios"
                                        className="ml-2 text-xs font-medium text-[#D52B00]"
                                   >
                                        Clear all
                                   </Link>
                              )}
                         </div>

                         <div className="flex items-center gap-4">
                              <span className="text-xs text-[#68615e]">
                                   Showing {totalStudios} studios
                              </span>

                              {/* Static Sorting UI */}
                              <select
                                   defaultValue="top"
                                   disabled
                                   aria-label="Sort studios"
                                   className="rounded-lg bg-transparent text-xs text-[#302825] outline-none disabled:opacity-70"
                              >
                                   <option value="top">Top Rated</option>
                                   <option value="low">Price: Low to High</option>
                                   <option value="high">Price: High to Low</option>
                              </select>
                         </div>
                    </div>

                    {/* Sidebar + Studio Cards */}
                    <div className="grid grid-cols-1 items-start gap-6 py-8 lg:grid-cols-[245px_minmax(0,1fr)]">
                         <FilterSidebar category={category} />

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
                                             No studios available in this category.
                                        </p>

                                        <Link
                                             href="/studios"
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

export default ExploreStudiosPage;
