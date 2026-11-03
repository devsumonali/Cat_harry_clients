'use client';

import { TCategory } from '@/app/types/type';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import CategoryCard from './CategoryCard';

// Static category images
const categoryImages: Record<string, string> = {
     'daylight-loft': '/images/home/category-daylight.png',
     'cyc-wall': '/images/home/category-cyc.png',
     soundstage: '/images/home/category-soundstage.png',
     industrial: '/images/home/category-industrial.png',
};

const Category = () => {
     const [categories, setCategories] = useState<TCategory[]>([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const getCategories = async () => {
               try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);

                    if (!response.ok) {
                         throw new Error('Failed to fetch categories');
                    }

                    const result = await response.json();

                    setCategories(Array.isArray(result) ? result : result.data || []);
               } catch (error) {
                    console.error('Category fetch error:', error);
               } finally {
                    setLoading(false);
               }
          };

          getCategories();
     }, []);

     return (
          <section className="bg-[#faf8f7] py-16 md:py-20">
               <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
                    {/* Section Header */}
                    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                         <div>
                              <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-[#D52B00]">
                                   Curated Spaces
                              </p>

                              <h2 className="text-2xl font-bold tracking-tight text-[#171717] md:text-3xl">
                                   Explore by Category
                              </h2>
                         </div>

                         <Link
                              href="/studios"
                              className="inline-flex items-center gap-1 text-sm font-medium text-[#D52B00] transition hover:gap-2"
                         >
                              View all categories
                              <FiArrowUpRight size={17} />
                         </Link>
                    </div>

                    {/* Category Grid */}
                    {loading ? (
                         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                              {Array.from({ length: 5 }).map((_, index) => (
                                   <div
                                        key={index}
                                        className="h-61.25 animate-pulse rounded-xl bg-gray-200 md:h-67.5"
                                   />
                              ))}
                         </div>
                    ) : categories.length > 0 ? (
                         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                              {categories.slice(0, 5).map((category) => (
                                   <CategoryCard
                                        key={category._id}
                                        category={category}
                                        image={
                                             categoryImages[category.slug] ||
                                             '/images/home/category-daylight.png'
                                        }
                                   />
                              ))}
                         </div>
                    ) : (
                         <p className="py-10 text-center text-sm text-gray-500">
                              No categories found.
                         </p>
                    )}
               </div>
          </section>
     );
};

export default Category;
