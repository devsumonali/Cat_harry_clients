'use client';
import SaveStudioButton from '@/app/component/shared/SaveStudioButton';


import type { StudioCardProps } from '@/app/types/type';
import Image from 'next/image';
import Link from 'next/link';
import { FiStar } from 'react-icons/fi';

const StudioCard = ({ studio }: StudioCardProps) => {
     const imageUrl = studio.imageUrl || studio.image;
     const price = Number(studio.hourlyRate);

     const categoryName = studio.category
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

     return (
          <div className="rounded-2xl border border-[#f0ece9] bg-white p-3.5 transition-shadow duration-300 hover:shadow-lg">
               {/* Image */}
               <div className="relative h-40 overflow-hidden rounded-xl bg-[#eee9e5] sm:h-44">
                    <Link href={`/explore_studios/${studio._id}`} className="block h-full w-full">
                         {imageUrl ? (
                              <Image
                                   src={imageUrl}
                                   alt={studio.title}
                                   fill
                                   unoptimized
                                   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                   className="object-cover transition-transform duration-500 hover:scale-105"
                              />
                         ) : (
                              <div className="flex h-full items-center justify-center text-sm text-gray-400">
                                   No Image
                              </div>
                         )}
                    </Link>

                    <SaveStudioButton studioId={studio._id} />
                    {/* Location */}
                    {studio.city && (
                         <span className="absolute bottom-3 left-3 rounded-full bg-[#242424]/85 px-3 py-1.5 text-xs text-white backdrop-blur-sm">
                              {studio.city}
                         </span>
                    )}
               </div>

               {/* Studio Info */}
               <div className="pt-3">
                    <div className="flex items-center justify-between gap-2">
                         <Link
                              href={`/explore_studios/${studio._id}`}
                              className="min-w-0 truncate text-sm font-semibold text-[#171717] hover:text-[#D52B00]"
                         >
                              {studio.title}
                         </Link>

                         {typeof studio.rating === 'number' && (
                              <span className="flex shrink-0 items-center gap-1 text-xs text-[#242424]">
                                   <FiStar className="fill-[#D52B00] text-[#D52B00]" />
                                   {studio.rating.toFixed(2)}
                              </span>
                         )}
                    </div>

                    {/* Category & Area */}
                    <div className="mt-2 flex min-w-0 items-center gap-2 text-xs text-[#77716d]">
                         <span className="shrink-0 rounded-full bg-[#fff0e9] px-2.5 py-1 font-medium text-[#b92d00]">
                              {categoryName}
                         </span>
                         {studio.squareFootage
                              ? <span className="truncate">{Number(studio.squareFootage).toLocaleString()} sq ft</span>
                              : ''}
                    </div>

                    <div className="my-3 border-t border-[#f0ece9]" />

                    {/* Rate */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                         <p className="text-sm font-semibold text-[#D52B00]">
                              {Number.isFinite(price)
                                   ? `$${price.toLocaleString()}`
                                   : 'Price unavailable'}
                              {Number.isFinite(price) && (
                                   <span className="font-normal text-[#77716d]"> / hr</span>
                              )}
                         </p>

                         {studio.instantBook && (
                              <span className="rounded-full bg-[#f5f1ef] px-3 py-1.5 text-xs text-[#49332d]">
                                   Instant Book
                              </span>
                         )}
                         <Link
                              href={`/explore_studios/${studio._id}`}
                              className="rounded-full bg-[#f0eded] px-3 py-2 text-[10px] font-medium text-[#302825] transition hover:bg-[#D52B00] hover:text-white"
                         >
                              View Details
                         </Link>
                    </div>
               </div>
          </div>
     );
};

export default StudioCard;
