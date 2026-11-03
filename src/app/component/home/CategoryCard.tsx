import type { CategoryCardProps } from '@/app/types/type';
import Image from 'next/image';
import Link from 'next/link';

const CategoryCard = ({ category, image }: CategoryCardProps) => {
     return (
          <Link
               href={`/studios?category=${encodeURIComponent(category.slug)}`}
               className="group relative block h-61.25 overflow-hidden rounded-xl bg-[#292929] md:h-67.5"
          >
               {/* Static Background Image */}
               <Image
                    src={image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) calc((100vw - 64px) / 2), (max-width: 1279px) calc((100vw - 108px) / 4), 293px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
               />

               {/* Dark Gradient Overlay */}
               <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-black/5 transition-colors duration-300 group-hover:from-black/95" />

               {/* Category Content */}
               <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
                    <h3 className="text-base font-semibold text-white md:text-lg">
                         {category.name}
                    </h3>

                    {typeof category.spacesCount === 'number' && (
                         <p className="mt-1 text-xs font-normal text-white/80 md:text-sm">
                              {category.spacesCount}+ spaces
                         </p>
                    )}
               </div>
          </Link>
     );
};

export default CategoryCard;
