import Image from 'next/image';
import Link from 'next/link';
import { FiShield } from 'react-icons/fi';

const CreatorProtection = () => {
     return (
          <section className="bg-[#faf8f7] py-12 md:py-16">
               <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
                    <div className="grid grid-cols-1 items-center gap-10 rounded-2xl bg-white px-6 py-10 sm:px-10 md:grid-cols-2 md:gap-12 md:py-12 lg:px-14">
                         {/* Left Content */}
                         <div>
                              {/* Badge */}
                              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#f9e9e3] px-3 py-1.5 text-xs font-medium text-[#b62f10]">
                                   <FiShield size={14} />
                                   StudioSpace Creator Protection
                              </div>

                              {/* Title */}
                              <h2 className="text-xl font-bold tracking-tight text-[#171717] md:text-2xl">
                                   Book with Absolute Confidence
                              </h2>

                              {/* Description */}
                              <p className="mt-5 max-w-lg text-sm leading-7 text-[#66544d]">
                                   We know production days can be unpredictable. That&apos;s why
                                   every booking is backed by our comprehensive Creator Guarantee
                                   covering host accuracy, equipment backup guarantees, and flexible
                                   rescheduling options.
                              </p>

                              {/* Stats */}
                              <div className="mt-7 grid grid-cols-2 gap-5">
                                   <div>
                                        <h3 className="text-2xl font-bold text-[#b62f10]">100%</h3>
                                        <p className="mt-1 text-xs text-[#66544d] sm:text-sm">
                                             Verified Space Accuracy
                                        </p>
                                   </div>

                                   <div>
                                        <h3 className="text-2xl font-bold text-[#b62f10]">24/7</h3>
                                        <p className="mt-1 text-xs text-[#66544d] sm:text-sm">
                                             Dedicated Support Concierge
                                        </p>
                                   </div>
                              </div>

                              {/* Button */}
                              <Link
                                   href="/creator-protection"
                                   className="mt-7 inline-flex items-center justify-center rounded-lg bg-[#f0edeb] px-5 py-3 text-sm font-medium text-[#292321] transition-colors hover:bg-[#e8ded9]"
                              >
                                   Learn About Guarantee
                              </Link>
                         </div>

                         {/* Right Image */}
                         <div className="relative h-65 overflow-hidden rounded-xl sm:h-80 md:h-87.5 lg:h-97.5">
                              <Image
                                   src="/images/creator-protection.jpg"
                                   alt="Creative production team working together in a studio"
                                   fill
                                   sizes="(max-width: 768px) 100vw, 50vw"
                                   className="object-cover"
                              />
                         </div>
                    </div>
               </div>
          </section>
     );
};

export default CreatorProtection;
