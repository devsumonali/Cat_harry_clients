'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { FiArrowRight } from 'react-icons/fi';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
     {
          id: 1,
          image: '/images/home/hero-daylight.png',
          subtitle: 'CREATIVE SPACES FOR EVERY VISION',
          title: 'Find Your Perfect Creative Space',
          description:
               'Discover inspiring photography studios, film stages, and production spaces designed to bring your ideas to life.',
     },
     {
          id: 2,
          image: '/images/home/hero-recording.png',
          subtitle: 'CREATE WITHOUT LIMITS',
          title: 'Where Great Ideas Come to Life',
          description:
               'Explore professional podcast rooms, recording studios, and creative workspaces available to book.',
     },
     {
          id: 3,
          image: '/images/home/hero-soundstage.png',
          subtitle: 'YOUR SPACE. YOUR STORY.',
          title: 'Book a Studio. Make Something Amazing.',
          description:
               'Find flexible creative spaces with transparent pricing and everything you need for your next project.',
     },
];

export default function HeroSlider() {
     return (
          <section className="relative w-full">
               <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    slidesPerView={1}
                    loop={true}
                    speed={800}
                    autoplay={{
                         delay: 4500,
                         disableOnInteraction: false,
                         pauseOnMouseEnter: true,
                    }}
                    navigation={true}
                    pagination={{
                         clickable: true,
                    }}
                    className="studio-hero-swiper"
               >
                    {slides.map((slide) => (
                         <SwiperSlide key={slide.id}>
                              <div className="relative flex min-h-125 items-center overflow-hidden sm:min-h-145 lg:min-h-162.5">
                                   {/* Background Image */}
                                   <Image
                                        src={slide.image}
                                        alt={slide.title}
                                        fill
                                        priority={slide.id === 1}
                                        sizes="100vw"
                                        className="object-cover"
                                   />

                                   {/* Dark Overlay */}
                                   <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-black/20" />

                                   {/* Content */}
                                   <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
                                        <div className="max-w-2xl text-white">
                                             <p className="mb-5 text-xs font-semibold tracking-[0.22em] text-orange-400 sm:text-sm">
                                                  {slide.subtitle}
                                             </p>

                                             <h1 className="mb-6 text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
                                                  {slide.title}
                                             </h1>

                                             <p className="mb-9 max-w-xl text-sm leading-7 text-gray-200 sm:text-base lg:text-lg">
                                                  {slide.description}
                                             </p>

                                             <div className="flex flex-wrap gap-4">
                                                  <Link
                                                       href="/studios"
                                                       className="inline-flex items-center gap-3 rounded-lg bg-[#D52B00] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#B82500]"
                                                  >
                                                       Explore Studios
                                                       <FiArrowRight size={18} />
                                                  </Link>

                                                  <Link
                                                       href="/studios"
                                                       className="inline-flex items-center rounded-lg border border-white/70 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-gray-900"
                                                  >
                                                       Host Your Space
                                                  </Link>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </SwiperSlide>
                    ))}
               </Swiper>
          </section>
     );
}
