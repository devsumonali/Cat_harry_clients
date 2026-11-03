import NewsletterForm from '@/app/component/shared/NewsletterForm';
import Link from 'next/link';
import { FiInstagram, FiBriefcase } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';

const footerLinks = [
     {
          title: 'Explore',
          links: [
               { label: 'Daylight Lofts', href: '/studios?category=daylight-loft' },
               { label: 'Film Stages', href: '/studios?category=soundstage' },
               { label: 'Podcast Rooms', href: '/studios?category=podcast-lounge' },
               { label: 'Music Suites', href: '/studios?category=music-suite' },
               { label: 'Art Workshops', href: '/studios?category=workshop' },
          ],
     },
     {
          title: 'Hosting',
          links: [
               { label: 'List Your Space', href: '/add-studio' },
               { label: 'Host Community', href: '/host_space' },
               { label: 'Resource Center', href: '/how_it_works' },
               {
                    label: 'My Studio Listings',
                    href: '/my-listings',
               },
          ],
     },
     {
          title: 'Company',
          links: [
               { label: 'About StudioSpace', href: '/about' },
               { label: 'Explore Studios', href: '/studios' },
               { label: 'How It Works', href: '/how_it_works' },
               { label: 'Messages', href: '/dashboard/messages' },
          ],
     },
];

const socialLinks = [
     {
          label: 'X',
          href: 'https://x.com',
          icon: FaXTwitter,
     },
     {
          label: 'Instagram',
          href: 'https://instagram.com',
          icon: FiInstagram,
     },
     {
          label: 'Explore Studios',
          href: '/studios',
          icon: FiBriefcase,
     },
];

export default async function Footer() {
     'use cache';
     return (
          <footer className="w-full border-t border-[#EEEAE8] bg-[#FAF8F7] text-[#292524]">
               <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
                    {/* Main Footer */}
                    <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.8fr_0.85fr_0.85fr_0.85fr] lg:gap-12 lg:py-16">
                         {/* Brand */}
                         <div>
                              <Link
                                   href="/"
                                   className="inline-block text-[19px] font-bold tracking-tight text-[#D73516]"
                              >
                                   StudioSpace
                              </Link>

                              <p className="mt-4 max-w-72.5 text-[13px] leading-[1.8] text-[#57534E]">
                                   The premier marketplace connecting world-class creators,
                                   photographers, and filmmakers with extraordinary production
                                   spaces.
                              </p>

                              {/* Social Icons */}
                              <div className="mt-6 flex items-center gap-3">
                                   {socialLinks.map((social) => {
                                        const Icon = social.icon;

                                        return (
                                             <Link
                                                  key={social.label}
                                                  href={social.href}
                                                  aria-label={social.label}
                                                  target={
                                                       social.href.startsWith('https')
                                                            ? '_blank'
                                                            : undefined
                                                  }
                                                  rel={
                                                       social.href.startsWith('https')
                                                            ? 'noopener noreferrer'
                                                            : undefined
                                                  }
                                                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0EDEC] text-[#292524] transition-all duration-200 hover:bg-[#D73516] hover:text-white"
                                             >
                                                  <Icon size={15} />
                                             </Link>
                                        );
                                   })}
                              </div>
                         </div>

                         {/* Footer Links */}
                         {footerLinks.map((section) => (
                              <div key={section.title}>
                                   <h3 className="mb-5 text-[13px] font-semibold text-[#292524]">
                                        {section.title}
                                   </h3>

                                   <ul className="space-y-3">
                                        {section.links.map((link) => (
                                             <li key={link.label}>
                                                  <Link
                                                       href={link.href}
                                                       className="text-[13px] leading-relaxed text-[#57534E] transition-colors duration-200 hover:text-[#D73516]"
                                                  >
                                                       {link.label}
                                                  </Link>
                                             </li>
                                        ))}
                                   </ul>
                              </div>
                         ))}
                    </div>
               </div>

               <div className="mx-auto mb-8 w-full max-w-md px-4"><h2 className="text-sm font-semibold">StudioSpace newsletter</h2><NewsletterForm compact /><p className="mt-3 text-xs text-[#81756d]">Booking requests require host confirmation. No payment is collected here.</p></div>
               {/* Bottom Footer */}
               <div className="border-t border-[#EEEAE8]">
                    <div className="mx-auto flex max-w-300 flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row lg:px-8">
                         <p className="text-center text-[11px] text-[#57534E] md:text-left">
                              © {new Date().getFullYear()} StudioSpace Marketplace Inc. All rights
                              reserved.
                         </p>

                         <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                              <Link
                                   href="/about"
                                   className="text-[11px] text-[#57534E] transition-colors hover:text-[#D73516]"
                              >
                                   About StudioSpace
                              </Link>

                              <Link
                                   href="/how_it_works"
                                   className="text-[11px] text-[#57534E] transition-colors hover:text-[#D73516]"
                              >
                                   Booking Guide
                              </Link>

                              <Link
                                   href="/dashboard/settings"
                                   className="text-[11px] text-[#57534E] transition-colors hover:text-[#D73516]"
                              >
                                   Account Settings
                              </Link>
                         </div>
                    </div>
               </div>
          </footer>
     );
}
