'use client';

import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const Newsletter = () => {
     const [email, setEmail] = useState('');

     const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          if (!email.trim()) {
               toast.error('Please enter your email address');
               return;
          }

          toast.success('Thank you for subscribing!');
          setEmail('');
     };

     return (
          <section className="bg-[#faf8f7] pb-14 md:pb-20">
               <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                    <div
                         className="relative overflow-hidden rounded-2xl bg-[#bd3100] px-6 py-14 text-center text-white sm:px-10 md:py-16"
                         style={{
                              backgroundImage:
                                   'linear-gradient(rgba(183, 46, 0, 0.92), rgba(183, 46, 0, 0.92)), url("/images/newsletter-bg.jpg")',
                              backgroundPosition: 'center',
                              backgroundSize: 'cover',
                         }}
                    >
                         {/* Content */}
                         <div className="relative z-10 mx-auto max-w-2xl">
                              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                                   Get Curated Spaces in Your Inbox
                              </h2>

                              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/90">
                                   Join 45,000+ creators receiving our weekly drop of newly listed
                                   daylight lofts, soundstages, and creator discounts.
                              </p>

                              {/* Subscribe Form */}
                              <form
                                   onSubmit={handleSubscribe}
                                   className="mx-auto mt-8 flex max-w-md flex-col items-stretch gap-3 sm:flex-row"
                              >
                                   <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        required
                                        className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white px-4 py-3 text-sm text-[#292321] outline-none placeholder:text-[#8b817d] focus:ring-2 focus:ring-white/50"
                                   />

                                   <button
                                        type="submit"
                                        className="cursor-pointer rounded-lg bg-white px-6 py-3 text-sm font-medium text-[#b72f12] transition hover:bg-[#fff0e9]"
                                   >
                                        Subscribe
                                   </button>
                              </form>
                         </div>
                    </div>
               </div>
          </section>
     );
};

export default Newsletter;
