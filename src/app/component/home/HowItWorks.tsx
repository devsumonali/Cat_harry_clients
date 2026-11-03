const steps = [
     {
          number: '01',
          title: 'Discover & Filter',
          description:
               'Search by location, specific gear inventory, dimensions, or backdrop style.',
     },
     {
          number: '02',
          title: 'Instant Booking',
          description:
               'Secure your exact hours with transparent pricing and no hidden facility fees.',
     },
     {
          number: '03',
          title: 'Direct Access',
          description:
               'Receive smart lock codes and host contact details instantly upon confirmation.',
     },
     {
          number: '04',
          title: 'Create & Wrap',
          description:
               'Focus entirely on your creative output while we handle secure payments and receipts.',
     },
];

const HowItWorks = () => {
     return (
          <section className="bg-[#faf8f7] py-12 md:py-16">
               <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="rounded-2xl bg-[#f5f3f1] px-5 py-12 sm:px-8 md:px-12 md:py-14">
                         {/* Section Header */}
                         <div className="mx-auto mb-10 max-w-2xl text-center">
                              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#D52B00]">
                                   Seamless Process
                              </p>

                              <h2 className="text-xl font-bold text-[#171717] md:text-2xl">
                                   How StudioSpace Works
                              </h2>

                              <p className="mt-3 text-xs leading-6 text-[#554b46] sm:text-sm">
                                   From search to final wrap, booking professional production space
                                   has never been simpler.
                              </p>
                         </div>

                         {/* Steps Grid */}
                         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                              {steps.map((step) => (
                                   <div
                                        key={step.number}
                                        className="flex min-h-48 flex-col items-center rounded-xl bg-[#fdfbfa] px-5 py-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                                   >
                                        {/* Step Number */}
                                        <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5e6e0] text-sm font-semibold text-[#b72f12]">
                                             {step.number}
                                        </div>

                                        {/* Step Title */}
                                        <h3 className="mb-2 text-sm font-semibold text-[#171717]">
                                             {step.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-xs leading-5 text-[#574d48]">
                                             {step.description}
                                        </p>
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>
          </section>
     );
};

export default HowItWorks;
