import Category from './component/home/Category';
import CreatorProtection from './component/home/CreatorProtection';
import FeaturedStudios from './component/home/FeaturedStudios';
import HeroSlider from './component/home/Hero';
import HowItWorks from './component/home/HowItWorks';
import Newsletter from './component/home/Newsletter';
import Testimonials from './component/home/Testimonials';

export default function Home() {
     return (
          <main>
               <HeroSlider />
               <Category />
               <FeaturedStudios />
               <HowItWorks />
               <CreatorProtection />
               <Testimonials />
               <Newsletter />
          </main>
     );
}
