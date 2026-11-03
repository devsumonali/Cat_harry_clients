'use client';

import { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { TStudio } from '@/app/types/type';
import StudioCard from './StudioCard';

const FeaturedStudios = () => {
     const [studios, setStudios] = useState<TStudio[]>([]);
     const [loading, setLoading] = useState(true);
     const swiperRef = useRef<SwiperType | null>(null);

     useEffect(() => {
          const getStudios = async () => {
               try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`);

                    if (!response.ok) {
                         throw new Error('Failed to fetch studios');
                    }

                    const result = await response.json();

                    setStudios(
                         Array.isArray(result)
                              ? result
                              : Array.isArray(result.data)
                                ? result.data
                                : [],
                    );
               } catch (error) {
                    console.error('Studio fetch error:', error);
               } finally {
                    setLoading(false);
               }
          };

          getStudios();
     }, []);

     return (
          <section className="bg-[#faf8f7] py-16 md:py-20">
               <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                    {/* Header */}
                    <div className="mb-7 flex items-end justify-between gap-4">
                         <div>
                              <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-[#D52B00]">
                                   Handpicked
                              </p>

                              <h2 className="text-xl font-bold tracking-tight text-[#171717] md:text-2xl">
                                   Featured Lofts & Soundstages
                              </h2>
                         </div>

                         {/* Slider Navigation */}
                         <div className="flex shrink-0 items-center gap-2">
                              <button
                                   type="button"
                                   onClick={() => swiperRef.current?.slidePrev()}
                                   aria-label="Previous studios"
                                   className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#f0eceb] text-[#252525] transition hover:bg-[#D52B00] hover:text-white"
                              >
                                   <FiChevronLeft size={19} />
                              </button>

                              <button
                                   type="button"
                                   onClick={() => swiperRef.current?.slideNext()}
                                   aria-label="Next studios"
                                   className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#f0eceb] text-[#252525] transition hover:bg-[#D52B00] hover:text-white"
                              >
                                   <FiChevronRight size={19} />
                              </button>
                         </div>
                    </div>

                    {/* Studios Carousel */}
                    {loading ? (
                         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                              {Array.from({ length: 4 }).map((_, index) => (
                                   <div
                                        key={index}
                                        className="h-[295px] animate-pulse rounded-2xl bg-gray-200"
                                   />
                              ))}
                         </div>
                    ) : studios.length > 0 ? (
                         <Swiper
                              onSwiper={(swiper) => {
                                   swiperRef.current = swiper;
                              }}
                              spaceBetween={18}
                              slidesPerView={1}
                              breakpoints={{
                                   640: {
                                        slidesPerView: 2,
                                        spaceBetween: 18,
                                   },
                                   1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 18,
                                   },
                                   1280: {
                                        slidesPerView: 4,
                                        spaceBetween: 20,
                                   },
                              }}
                              className="w-full"
                         >
                              {studios.map((studio) => (
                                   <SwiperSlide key={studio._id} className="h-auto!">
                                        <StudioCard studio={studio} />
                                   </SwiperSlide>
                              ))}
                         </Swiper>
                    ) : (
                         <p className="py-10 text-center text-sm text-gray-500">
                              No studios found.
                         </p>
                    )}
               </div>
          </section>
     );
};

export default FeaturedStudios;
