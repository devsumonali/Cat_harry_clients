'use client';
import {
     FiCamera,
     FiDollarSign,
     FiGrid,
     FiImage,
     FiInfo,
     FiMapPin,
     FiPlus,
     FiUploadCloud,
     FiZap,
} from 'react-icons/fi';
import {
     LuBuilding2,
     LuClapperboard,
     LuLightbulb,
     LuSlidersHorizontal,
     LuWarehouse,
} from 'react-icons/lu';

const categories = [
     {
          name: 'Daylight Loft',
          value: 'daylight-loft',
          icon: LuLightbulb,
     },
     {
          name: 'Cyc Wall',
          value: 'cyc-wall',
          icon: LuClapperboard,
     },
     {
          name: 'Soundstage',
          value: 'soundstage',
          icon: LuSlidersHorizontal,
     },
     {
          name: 'Industrial',
          value: 'industrial',
          icon: LuWarehouse,
     },
];

const amenities = [
     'U-Shaped Cyclorama Wall',
     'Freight Elevator Access',
     'Profoto & Godox Strobes',
     'Soundproof Acoustic Panels',
     'Makeup & Wardrobe Room',
     'RGB DMX Lighting Grid',
     'High-Speed Fiber Wi-Fi',
     'Rooftop Access',
     'Dedicated Loading Bay',
];

const inputClass =
     'w-full rounded-lg border border-[#eee7e3] bg-[#faf8f7] px-3.5 py-3 text-sm text-[#242424] outline-none transition placeholder:text-[#aaa3a0] focus:border-[#c63717] focus:ring-2 focus:ring-[#c63717]/10';

const labelClass = 'mb-2 block text-[13px] font-medium text-[#282322]';

function SectionHeading({
     icon: Icon,
     title,
     description,
}: {
     icon: React.ElementType;
     title: string;
     description: string;
}) {
     return (
          <div className="mb-7 flex items-center gap-3">
               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff0e9] text-[#c63717]">
                    <Icon size={18} />
               </div>

               <div>
                    <h2 className="text-base font-bold text-[#191919]">{title}</h2>
                    <p className="mt-0.5 text-xs leading-5 text-[#857b76]">{description}</p>
               </div>
          </div>
     );
}

const AddStudios = () => {
     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          const studios = Object.fromEntries(formData.entries());
          const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`, {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify(studios),
          });
          const data = await result.json();

          if (data.acknowledged) {
          }
     };
     return (
          <main className="min-h-screen bg-[#faf8f7] py-8 md:py-12">
               <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                    {/* Page Header */}
                    <div className="mb-9">
                         <div className="mb-4 flex items-center gap-2 text-xs font-medium">
                              <span className="rounded bg-[#fff0e9] px-2.5 py-1.5 uppercase tracking-wider text-[#c63717]">
                                   Host Dashboard
                              </span>
                              <span className="text-gray-300">/</span>
                              <span className="text-gray-500">New Listing</span>
                         </div>

                         <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                              <div>
                                   <h1 className="text-3xl font-extrabold tracking-tight text-[#171717] md:text-4xl">
                                        List Your Creative Space
                                   </h1>

                                   <p className="mt-3 max-w-xl text-sm leading-6 text-[#716966]">
                                        Create an immersive listing that attracts top-tier
                                        directors, photographers, and creators. Fill in your
                                        technical specs and gallery assets below.
                                   </p>
                              </div>

                              <div className="flex shrink-0 items-center gap-3">
                                   <button
                                        type="submit"
                                        form="studio-form"
                                        className="rounded-full cursor-pointer bg-[#ba310f] px-6 py-3 text-xs font-semibold text-white shadow-md shadow-orange-900/15 transition hover:bg-[#922508]"
                                   >
                                        Publish Studio
                                   </button>
                              </div>
                         </div>
                    </div>

                    {/* Main Form */}
                    <form
                         onSubmit={handleSubmit}
                         id="studio-form"
                         className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3"
                    >
                         {/* Left Column */}
                         <div className="space-y-6 lg:col-span-2">
                              {/* Studio Identity */}
                              <section className="rounded-xl border border-[#f1edeb] bg-white p-5 sm:p-7">
                                   <SectionHeading
                                        icon={LuBuilding2}
                                        title="Studio Identity"
                                        description="Provide a catchy title and select your primary creative category."
                                   />

                                   <div className="space-y-6">
                                        <div>
                                             <label htmlFor="studioTitle" className={labelClass}>
                                                  Studio Title
                                             </label>

                                             <input
                                                  id="studioTitle"
                                                  name="title"
                                                  type="text"
                                                  placeholder="e.g. The Grand Daylight Cyclorama & Loft"
                                                  className={inputClass}
                                             />
                                        </div>

                                        <div>
                                             <label className={labelClass}>Studio Category</label>

                                             <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                                  {categories.map((category) => {
                                                       const Icon = category.icon;

                                                       return (
                                                            <label
                                                                 key={category.value}
                                                                 className="cursor-pointer"
                                                            >
                                                                 <input
                                                                      type="radio"
                                                                      name="category"
                                                                      value={category.value}
                                                                      className="peer sr-only"
                                                                 />

                                                                 <div className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl border border-[#eee7e3] bg-[#faf8f7] px-2 py-4 text-center transition hover:border-[#c63717]/50 peer-checked:border-[#c63717] peer-checked:bg-[#fff6f2] peer-focus-visible:ring-2 peer-focus-visible:ring-[#c63717]">
                                                                      <Icon
                                                                           size={21}
                                                                           className="text-[#bd3516]"
                                                                      />
                                                                      <span className="text-xs font-medium text-[#282322]">
                                                                           {category.name}
                                                                      </span>
                                                                 </div>
                                                            </label>
                                                       );
                                                  })}
                                             </div>
                                        </div>

                                        <div>
                                             <label htmlFor="description" className={labelClass}>
                                                  Detailed Editorial Description
                                             </label>

                                             <textarea
                                                  id="description"
                                                  name="description"
                                                  rows={5}
                                                  placeholder="Describe the architectural uniqueness, morning vs evening light quality, power drops, freight access, and ideal production types..."
                                                  className={`${inputClass} resize-y`}
                                             />
                                        </div>
                                   </div>
                              </section>

                              {/* Technical Dimensions */}
                              <section className="rounded-xl border border-[#f1edeb] bg-white p-5 sm:p-7">
                                   <SectionHeading
                                        icon={FiGrid}
                                        title="Technical Dimensions & Capacity"
                                        description="Essential spatial parameters for crew and gear staging."
                                   />

                                   <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        <div>
                                             <label htmlFor="squareFootage" className={labelClass}>
                                                  Square Footage
                                             </label>
                                             <div className="relative">
                                                  <input
                                                       id="squareFootage"
                                                       type="number"
                                                       name="squareFootage"
                                                       min="0"
                                                       placeholder="2400"
                                                       className={`${inputClass} pr-12`}
                                                  />
                                                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                                                       sq ft
                                                  </span>
                                             </div>
                                        </div>

                                        <div>
                                             <label htmlFor="ceilingHeight" className={labelClass}>
                                                  Ceiling Height
                                             </label>
                                             <div className="relative">
                                                  <input
                                                       id="ceilingHeight"
                                                       type="number"
                                                       name="ceilingHeight"
                                                       min="0"
                                                       placeholder="16"
                                                       className={`${inputClass} pr-12`}
                                                  />
                                                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                                                       feet
                                                  </span>
                                             </div>
                                        </div>

                                        <div>
                                             <label htmlFor="capacity" className={labelClass}>
                                                  Crew Capacity
                                             </label>
                                             <div className="relative">
                                                  <input
                                                       id="capacity"
                                                       type="number"
                                                       name="maxCapacity"
                                                       min="1"
                                                       placeholder="25"
                                                       className={`${inputClass} pr-16`}
                                                  />
                                                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                                                       people
                                                  </span>
                                             </div>
                                        </div>

                                        <div>
                                             <label htmlFor="powerSupply" className={labelClass}>
                                                  Power Supply
                                             </label>
                                             <input
                                                  id="powerSupply"
                                                  type="text"
                                                  name="powerSupply"
                                                  placeholder="100A / 3-Phase"
                                                  className={inputClass}
                                             />
                                        </div>
                                   </div>
                              </section>

                              {/* Studio Gallery */}
                              <section className="rounded-xl border border-[#f1edeb] bg-white p-5 sm:p-7">
                                   <SectionHeading
                                        icon={FiImage}
                                        title="Studio Gallery"
                                        description="Upload high-res architectural photos. First image will be the primary cover."
                                   />

                                   <label
                                        htmlFor="studioImages"
                                        className="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#edcfc3] bg-[#fcfaf9] px-4 py-8 text-center transition hover:border-[#c63717] hover:bg-[#fff8f5]"
                                   >
                                        <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#fae9e2] text-[#c63717]">
                                             <FiUploadCloud size={24} />
                                        </span>

                                        <span className="text-sm font-semibold text-[#282322]">
                                             Drag and drop studio photography here
                                        </span>

                                        <span className="mt-1 text-xs text-[#8f8580]">
                                             Supports high-res JPG, PNG, WEBP
                                        </span>

                                        <span className="mt-5 rounded-full bg-[#eeebea] px-5 py-2 text-xs font-semibold text-[#39312e]">
                                             Browse Files
                                        </span>

                                        <input
                                             id="studioImages"
                                             type="file"
                                             name="images"
                                             accept="image/jpeg,image/png,image/webp"
                                             multiple
                                             className="sr-only"
                                        />
                                   </label>

                                   {/* Gallery Preview UI */}
                                   <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                        {['Cover Image', 'Studio Interior', 'Studio Equipment'].map(
                                             (item, index) => (
                                                  <div
                                                       key={item}
                                                       className="relative flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border border-[#eee7e3] bg-[#f7f4f2]"
                                                  >
                                                       {index === 0 && (
                                                            <span className="absolute left-2 top-2 rounded bg-[#bd3516] px-2 py-1 text-[10px] font-semibold text-white">
                                                                 Cover
                                                            </span>
                                                       )}

                                                       <FiCamera
                                                            size={24}
                                                            className="text-[#b4a8a1]"
                                                       />
                                                       <span className="px-2 text-center text-[11px] text-[#978b85]">
                                                            {item}
                                                       </span>
                                                  </div>
                                             ),
                                        )}

                                        <label
                                             htmlFor="studioImages"
                                             className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[#e9cfc3] text-[#746b66] transition hover:bg-[#fff6f2]"
                                        >
                                             <FiPlus size={23} />
                                             <span className="text-xs">Add More</span>
                                        </label>
                                   </div>
                              </section>

                              {/* Amenities */}
                              <section className="rounded-xl border border-[#f1edeb] bg-white p-5 sm:p-7">
                                   <SectionHeading
                                        icon={LuSlidersHorizontal}
                                        title="Amenities & Included Gear"
                                        description="Select all built-in features and complimentary equipment available to renters."
                                   />

                                   <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                        {amenities.map((amenity) => (
                                             <label
                                                  key={amenity}
                                                  className="flex min-h-16 cursor-pointer items-center gap-3 rounded-lg border border-[#eee7e3] bg-[#faf8f7] p-3 transition hover:border-[#c63717]/50 has-checked:border-[#c63717] has-checked:bg-[#fff6f2]"
                                             >
                                                  <input
                                                       type="checkbox"
                                                       name="amenities"
                                                       value={amenity}
                                                       className="h-4 w-4 shrink-0 cursor-pointer accent-[#c63717]"
                                                  />

                                                  <span className="text-xs font-medium leading-5 text-[#352d29]">
                                                       {amenity}
                                                  </span>
                                             </label>
                                        ))}
                                   </div>
                              </section>
                         </div>

                         {/* Right Column */}
                         <div className="space-y-6">
                              {/* Rates & Deposit */}
                              <section className="rounded-xl border border-[#f1edeb] bg-white p-5 sm:p-6">
                                   <SectionHeading
                                        icon={FiDollarSign}
                                        title="Rates & Deposit"
                                        description="Set your hourly pricing structure."
                                   />

                                   <div className="space-y-5">
                                        <div>
                                             <label htmlFor="hourlyRate" className={labelClass}>
                                                  Hourly Rate
                                             </label>
                                             <div className="relative">
                                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                                       $
                                                  </span>
                                                  <input
                                                       id="hourlyRate"
                                                       type="number"
                                                       name="hourlyRate"
                                                       min="0"
                                                       placeholder="150"
                                                       className={`${inputClass} pl-7 pr-12`}
                                                  />
                                                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                                                       / hr
                                                  </span>
                                             </div>
                                        </div>

                                        <div>
                                             <label
                                                  htmlFor="securityDeposit"
                                                  className={labelClass}
                                             >
                                                  Security Deposit
                                             </label>
                                             <div className="relative">
                                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                                                       $
                                                  </span>
                                                  <input
                                                       id="securityDeposit"
                                                       type="number"
                                                       name="securityDeposit"
                                                       min="0"
                                                       placeholder="300"
                                                       className={`${inputClass} pl-7 pr-14`}
                                                  />
                                                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                                                       USD
                                                  </span>
                                             </div>
                                             <p className="mt-2 text-xs leading-5 text-[#978b85]">
                                                  Held for incidentals; released 48h post-shoot.
                                             </p>
                                        </div>

                                        <div>
                                             <label htmlFor="minimumHours" className={labelClass}>
                                                  Minimum Booking Hours
                                             </label>
                                             <select
                                                  id="minimumHours"
                                                  name="minimumBookingHours"
                                                  defaultValue="2"
                                                  className={inputClass}
                                             >
                                                  <option value="1">1 Hour Minimum</option>
                                                  <option value="2">2 Hours Minimum</option>
                                                  <option value="3">3 Hours Minimum</option>
                                                  <option value="4">4 Hours Minimum</option>
                                                  <option value="6">6 Hours Minimum</option>
                                                  <option value="8">8 Hours Minimum</option>
                                             </select>
                                        </div>
                                   </div>
                              </section>

                              {/* Location */}
                              <section className="rounded-xl border border-[#f1edeb] bg-white p-5 sm:p-6">
                                   <SectionHeading
                                        icon={FiMapPin}
                                        title="Location"
                                        description="Where is your studio situated?"
                                   />

                                   <div className="space-y-5">
                                        <div>
                                             <label htmlFor="streetAddress" className={labelClass}>
                                                  Street Address
                                             </label>
                                             <input
                                                  id="streetAddress"
                                                  type="text"
                                                  name="streetAddress"
                                                  placeholder="450 W 31st St, Floor 8"
                                                  className={inputClass}
                                             />
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                             <div>
                                                  <label htmlFor="city" className={labelClass}>
                                                       City / Neighborhood
                                                  </label>
                                                  <input
                                                       id="city"
                                                       type="text"
                                                       name="city"
                                                       placeholder="Chelsea, NYC"
                                                       className={inputClass}
                                                  />
                                             </div>

                                             <div>
                                                  <label
                                                       htmlFor="postalCode"
                                                       className={labelClass}
                                                  >
                                                       Postal Code
                                                  </label>
                                                  <input
                                                       id="postalCode"
                                                       type="text"
                                                       name="postalCode"
                                                       placeholder="10001"
                                                       className={inputClass}
                                                  />
                                             </div>
                                        </div>

                                        {/* Map Placeholder */}
                                        <div className="flex h-48 items-center justify-center rounded-xl border border-[#eadcd5] bg-[#f5e9e3]">
                                             <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-[#39302c] shadow-sm">
                                                  <FiMapPin className="text-[#c63717]" />
                                                  Studio Location Preview
                                             </div>
                                        </div>
                                   </div>
                              </section>

                              {/* Host Guidelines */}
                              <section className="rounded-xl border border-[#f1edeb] bg-white p-5 sm:p-6">
                                   <SectionHeading
                                        icon={FiZap}
                                        title="Host Guidelines"
                                        description="Specify house rules for visiting crews."
                                   />

                                   <div className="space-y-5">
                                        <div>
                                             <label htmlFor="overtimePolicy" className={labelClass}>
                                                  Overtime Policy
                                             </label>
                                             <input
                                                  id="overtimePolicy"
                                                  type="text"
                                                  name="overtimePolicy"
                                                  placeholder="1.5x Hourly Rate for Overtime"
                                                  className={inputClass}
                                             />
                                        </div>

                                        <div>
                                             <label htmlFor="houseRules" className={labelClass}>
                                                  House Rules & Restrictions
                                             </label>
                                             <textarea
                                                  id="houseRules"
                                                  name="houseRules"
                                                  rows={5}
                                                  placeholder="No smoking inside studio. All furniture must be returned to original placement. Catering permitted in lounge area only..."
                                                  className={`${inputClass} resize-y`}
                                             />
                                        </div>
                                   </div>
                              </section>

                              {/* Extra Information */}
                              <div className="flex items-start gap-3 rounded-xl border border-orange-100 bg-[#fff4ee] p-4">
                                   <FiInfo size={18} className="mt-0.5 shrink-0 text-[#c63717]" />
                                   <p className="text-xs leading-6 text-[#7d6256]">
                                        Make sure all details are accurate before publishing your
                                        studio. Clear descriptions and quality photos help attract
                                        more bookings.
                                   </p>
                              </div>
                         </div>
                    </form>
               </div>
          </main>
     );
};

export default AddStudios;
