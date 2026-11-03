'use client';

import type { SidebarProps } from '@/app/types/type';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getDashboardSummary } from '@/app/libs/api';
import {
     FiArrowRight,
     FiBookmark,
     FiCalendar,
     FiGrid,
     FiMessageSquare,
     FiSettings,
     FiZap,
} from 'react-icons/fi';

const menuItems = [
     { label: 'Overview', href: '/dashboard/overview', icon: FiGrid },
     { label: 'My Studio Listings', href: '/dashboard/my_listings', icon: FiGrid },
     { label: 'My Bookings', href: '/dashboard/my_bookings', icon: FiCalendar },
     { label: 'Saved Spaces', href: '/dashboard/saved_spaces', icon: FiBookmark },
     { label: 'Messages', href: '/dashboard/messages', icon: FiMessageSquare },
     { label: 'Settings', href: '/dashboard/settings', icon: FiSettings },
     { label: 'Add Studios', href: '/dashboard/add_studios', icon: FiSettings },
];

export default function Sidebar({
     name = 'Alex Rivers',
     role = 'Director & Creator',
     bookingCount = 3,
     hasUnreadMessages = true,
}: SidebarProps) {
     const pathname = usePathname();
     const [counts, setCounts] = useState({ bookingCount, hasUnreadMessages });
     useEffect(() => {
          let active = true;
          const refresh = async () => {
               try {
                    const data = await getDashboardSummary();
                    if (active) setCounts(data);
               } catch { /* Keep the last known counts if the request fails. */ }
          };
          void refresh();
          window.addEventListener('dashboard-updated', refresh);
          return () => { active = false; window.removeEventListener('dashboard-updated', refresh); };
     }, [pathname]);
     const initials = name
          .trim()
          .split(/\s+/)
          .slice(0, 2)
          .map((part) => part[0])
          .join('');

     return (
          <aside
               aria-label="Dashboard sidebar"
               className="w-full shrink-0 space-y-4.5 text-[#21140e] lg:sticky lg:top-24 lg:w-56.5 lg:self-start"
          >
               <div className="flex items-center gap-3 rounded-xl bg-[#f6f4f3] px-5 py-5">
                    <div className="relative shrink-0">
                         <div
                              className="flex size-12 items-center justify-center rounded-full bg-[#ead8c8] text-sm font-semibold text-[#713b24]"
                              aria-hidden="true"
                         >
                              {initials}
                         </div>
                         <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-[#f6f4f3] bg-[#27ae76]">
                              <span className="sr-only">Online</span>
                         </span>
                    </div>
                    <div className="min-w-0">
                         <p className="truncate text-lg font-semibold leading-6 tracking-tight text-[#131313]">
                              {name}
                         </p>
                         <p className="mt-0.5 text-[13px] leading-5">{role}</p>
                    </div>
               </div>

               <nav aria-label="Dashboard navigation" className="rounded-xl bg-[#f6f4f3] p-2.5">
                    <ul className="space-y-1">
                         {menuItems.map(({ label, href, icon: Icon }) => {
                              const active = pathname === href || pathname.startsWith(`${href}/`);

                              return (
                                   <li key={href}>
                                        <Link
                                             href={href}
                                             aria-current={active ? 'page' : undefined}
                                             className={`flex min-h-10 items-center gap-2.5 rounded-lg border px-3 py-2.5 text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b92d00] ${
                                                  active
                                                       ? 'border-[#a52b06] bg-[#b92d00] text-white'
                                                       : 'border-transparent text-[#42200f] hover:bg-[#eee6e1]'
                                             }`}
                                        >
                                             <Icon
                                                  size={18}
                                                  aria-hidden="true"
                                                  className="shrink-0"
                                             />
                                             <span>{label}</span>
                                             {label === 'My Bookings' && counts.bookingCount > 0 && (
                                                  <span className="ml-auto flex min-h-5.75 min-w-5.25 items-center justify-center rounded-full border border-[#bd350d] bg-[#ff6a32] px-1 text-xs text-[#301307]">
                                                       {counts.bookingCount}
                                                       <span className="sr-only"> bookings</span>
                                                  </span>
                                             )}
                                             {label === 'Messages' && counts.hasUnreadMessages && (
                                                  <span
                                                       className={`ml-auto size-1.5 rounded-full ${active ? 'bg-white' : 'bg-[#b92d00]'}`}
                                                  >
                                                       <span className="sr-only">
                                                            Unread messages
                                                       </span>
                                                  </span>
                                             )}
                                        </Link>
                                   </li>
                              );
                         })}
                    </ul>
               </nav>

               <section aria-labelledby="host-space-title" className="rounded-xl bg-[#f9ded5] p-5">
                    <div className="mb-3 flex size-8.5 items-center justify-center rounded-full border border-white bg-[#b92d00] text-white">
                         <FiZap size={19} aria-hidden="true" />
                    </div>
                    <h2
                         id="host-space-title"
                         className="text-lg font-semibold tracking-tight text-[#14100e]"
                    >
                         Host a Space
                    </h2>
                    <p className="mt-1 text-[13px] leading-5">
                         Monetize your empty creative studio or gear locker when not in use.
                    </p>

                    <Link
                         href="/dashboard/add_studios"
                         className="mt-3 flex min-h-10 items-center justify-center gap-2 rounded-full border border-white bg-[#b92d00] px-3 py-2 text-[13px] text-white transition-colors hover:bg-[#982600] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b92d00]"
                    >
                         List Your Studio <FiArrowRight size={15} aria-hidden="true" />
                    </Link>
               </section>
          </aside>
     );
}
