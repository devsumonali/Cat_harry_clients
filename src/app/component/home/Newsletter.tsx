import NewsletterForm from '@/app/component/shared/NewsletterForm';

const Newsletter = () => {
     return (
          <section className="bg-[#faf8f7] pb-14 md:pb-20">
               <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
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
                                   Sign up for updates about new studio spaces and creative community news.
                              </p>

                              {/* Subscribe Form */}
                              <NewsletterForm />
                         </div>
                    </div>
               </div>
          </section>
     );
};

export default Newsletter;
