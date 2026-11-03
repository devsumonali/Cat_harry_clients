import Category from './component/home/Category';
import CreatorProtection from './component/home/CreatorProtection';
import FeaturedStudios from './component/home/FeaturedStudios';
import HeroSlider from './component/home/Hero';
import HowItWorks from './component/home/HowItWorks';
import Newsletter from './component/home/Newsletter';
import Testimonials from './component/home/Testimonials';
import { Suspense } from 'react';

export default function Home() {
     return (
          <main>
               <Suspense fallback={<div className="h-140 bg-[#171717]" aria-label="Loading featured studios" />}>
                    <HeroSlider />
               </Suspense>
               <Category />
               <FeaturedStudios />
               <HowItWorks />
               <CreatorProtection />
               <Testimonials />
               <Newsletter />
          </main>
     );
}
