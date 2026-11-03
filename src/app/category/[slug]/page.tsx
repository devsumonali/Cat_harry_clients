import Link from 'next/link';
import StudioCard from '@/app/component/home/StudioCard';
import type { CategoryPageProps, TStudio } from '@/app/types/type';
import { getCategoryStudios } from '@/app/libs/api';
import { Suspense } from 'react';
import { FiArrowLeft, FiGrid } from 'react-icons/fi';

const CategoryPage = async ({ params }: CategoryPageProps) => {
     const { slug } = await params;

     let studios: TStudio[];
     try {
          studios = await getCategoryStudios(slug);
     } catch (error) {
          console.error('Category studios fetch error:', error);
          return (
               <main className="flex-1 bg-[#faf8f7] px-4 py-20 text-center">
                    <h1 className="text-xl font-semibold">Unable to load this category</h1>
                    <p className="mt-3 text-sm text-gray-500">
                         Please refresh the page to try again.
                    </p>
                    <Link
                         href="/explore_studios"
                         className="mt-5 inline-block text-sm text-[#D52B00]"
                    >
                         Browse All Studios
                    </Link>
               </main>
          );
     }

     // Format slug for page heading
     const categoryTitle = slug
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

     return (
          <main className="min-h-screen bg-[#faf8f7] py-12 md:py-16">
               <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
                    <Link
                         href="/explore_studios"
                         className="mb-6 inline-flex items-center gap-2 text-sm text-[#76685f] hover:text-[#D52B00]"
                    >
                         <FiArrowLeft /> All studios
                    </Link>
                    {/* Page Header */}
                    <div className="mb-10 rounded-2xl border border-[#eee3dc] bg-[#f3ece6] p-6 sm:p-10">
                         <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#D52B00]">
                              Explore Creative Spaces
                         </p>

                         <h1 className="text-3xl font-bold text-[#171717] md:text-4xl">
                              {categoryTitle} Studios
                         </h1>

                         <p className="mt-3 text-sm text-gray-500">
                              Find the right {categoryTitle.toLowerCase()} space for your next
                              creative project.
                         </p>

                         <Link
                              href="/explore_studios"
                              className="mt-4 inline-block text-sm font-medium text-[#D52B00] hover:underline"
                         >
                              View All Studios
                         </Link>
                    </div>

                    <div className="mb-6 flex items-center gap-2 border-b border-[#eee3dc] pb-5 text-sm text-[#76685f]">
                         <FiGrid className="text-[#D52B00]" />
                         {studios.length} {studios.length === 1 ? 'studio' : 'studios'} found
                    </div>
                    {/* Studio Listings */}
                    {studios.length > 0 ? (
                         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                              {studios.map((studio) => (
                                   <div key={studio._id} className="min-w-0 [&>div]:h-full">
                                        <StudioCard studio={studio} />
                                   </div>
                              ))}
                         </div>
                    ) : (
                         <div className="rounded-xl bg-white px-6 py-16 text-center">
                              <h2 className="text-xl font-semibold text-[#171717]">
                                   No Studios Found
                              </h2>

                              <p className="mt-2 text-sm text-gray-500">
                                   No studios are available in this category.
                              </p>

                              <Link
                                   href="/explore_studios"
                                   className="mt-5 inline-block rounded-lg bg-[#D52B00] px-5 py-3 text-sm font-medium text-white"
                              >
                                   Browse All Studios
                              </Link>
                         </div>
                    )}
               </div>
          </main>
     );
};

export default function SingleCategoryPage({ params }: CategoryPageProps) {
     return (
          <Suspense
               fallback={
                    <main
                         className="flex-1 bg-[#faf8f7] py-12"
                         role="status"
                         aria-label="Loading category studios"
                    >
                         <div className="mx-auto max-w-7xl animate-pulse px-4 sm:px-6">
                              <span className="sr-only">Loading category studios...</span>
                              <div className="mb-10 h-60 rounded-2xl bg-[#eee6e0]" />
                              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                   {Array.from({ length: 4 }, (_, index) => (
                                        <div
                                             key={index}
                                             className="h-80 rounded-2xl bg-[#eee6e0]"
                                        />
                                   ))}
                              </div>
                         </div>
                    </main>
               }
          >
               <CategoryPage params={params} />
          </Suspense>
     );
}
