import Image from 'next/image';

const testimonials = [
     {
          id: 1,
          quote: 'StudioSpace has completely transformed how our production agency scouts locations. We booked a pristine daylight loft in minutes for an international fashion campaign.',
          name: 'Elena Rostova',
          role: 'Creative Director, Vogue Studio',
          image: '/images/testimonials/elena.jpg',
     },
     {
          id: 2,
          quote: 'The soundstage quality and acoustic isolation we found through StudioSpace exceeded our expectations. Our podcast recordings have never sounded cleaner.',
          name: 'Marcus Vance',
          role: 'Host, Frequency Podcast',
          image: '/images/testimonials/marcus.jpg',
     },
     {
          id: 3,
          quote: 'As a studio host, listing my soundstage on StudioSpace doubled my monthly bookings. The platform handles scheduling and payouts flawlessly.',
          name: 'Sarah Jenkins',
          role: 'Owner, Stage 4 LA',
          image: '/images/testimonials/sarah.jpg',
     },
];

const Testimonials = () => {
     return (
          <section className="bg-[#faf8f7] py-14 md:py-20">
               <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                    {/* Section Header */}
                    <div className="mb-10 text-center">
                         <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-[#D52B00]">
                              Testimonials
                         </p>

                         <h2 className="text-xl font-bold tracking-tight text-[#171717] md:text-2xl">
                              Loved by Creators Worldwide
                         </h2>
                    </div>

                    {/* Testimonial Cards */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                         {testimonials.map((testimonial) => (
                              <div
                                   key={testimonial.id}
                                   className="flex min-h-56 flex-col justify-between rounded-xl border border-[#f1edeb] bg-white p-6 transition-shadow duration-300 hover:shadow-md"
                              >
                                   {/* Quote */}
                                   <p className="text-sm leading-6 text-[#2e2926]">
                                        &ldquo;{testimonial.quote}&rdquo;
                                   </p>

                                   {/* User */}
                                   <div className="mt-6 flex items-center gap-3">
                                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                                             <Image
                                                  src={testimonial.image}
                                                  alt={testimonial.name}
                                                  fill
                                                  sizes="40px"
                                                  className="object-cover"
                                             />
                                        </div>

                                        <div>
                                             <h3 className="text-sm font-semibold text-[#171717]">
                                                  {testimonial.name}
                                             </h3>

                                             <p className="mt-0.5 text-xs text-[#7b746f]">
                                                  {testimonial.role}
                                             </p>
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </div>
               </div>
          </section>
     );
};

export default Testimonials;
