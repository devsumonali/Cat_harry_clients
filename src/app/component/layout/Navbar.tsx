'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';

const navLinks = [
     { label: 'Explore Studios', href: '/explore_studios' },
     { label: 'How It Works', href: '/how_it_works' },
     { label: 'Host Space', href: '/host_space' },
     { label: 'About', href: '/about' },
];

const Navbar = () => {
     const [mobileOpen, setMobileOpen] = useState(false);
     const [profileOpen, setProfileOpen] = useState(false);
     const pathname = usePathname();

     return (
          <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
               <div className="container mx-auto flex h-18 items-center justify-between gap-6 px-4 lg:px-0">
                    {/* Logo */}
                    <Link
                         href="/"
                         className="shrink-0 text-[22px] font-extrabold tracking-[-0.8px] text-[#D52B00]"
                         onClick={() => setMobileOpen(false)}
                    >
                         StudioSpace
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-8 lg:flex">
                         {navLinks.map((link) => {
                              const active = pathname === link.href;

                              return (
                                   <Link
                                        key={link.label}
                                        href={link.href}
                                        className={`text-[14px] font-medium transition-colors hover:text-[#D52B00] ${
                                             active ? 'text-[#D52B00]' : 'text-[#252525]'
                                        }`}
                                   >
                                        {link.label}
                                   </Link>
                              );
                         })}
                    </nav>

                    {/* Desktop Profile */}
                    <div className="hidden items-center lg:flex">
                         <div className="relative">
                              <button
                                   type="button"
                                   onClick={() => setProfileOpen(!profileOpen)}
                                   aria-label="User account"
                                   aria-expanded={profileOpen}
                                   className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#C52D08] text-white transition-colors hover:bg-[#A92406]"
                              >
                                   <FiUser size={17} />
                              </button>

                              {profileOpen && (
                                   <div className="absolute right-0 top-12 w-44 overflow-hidden rounded-lg border border-gray-100 bg-white py-2 shadow-lg">
                                        <Link
                                             href="/login"
                                             onClick={() => setProfileOpen(false)}
                                             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                             Login
                                        </Link>
                                        <Link
                                             href="/register"
                                             onClick={() => setProfileOpen(false)}
                                             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                             Register
                                        </Link>
                                   </div>
                              )}
                         </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                         type="button"
                         className="flex h-10 w-10 items-center justify-center rounded-lg text-[#252525] lg:hidden"
                         onClick={() => setMobileOpen(!mobileOpen)}
                         aria-label="Toggle navigation"
                         aria-expanded={mobileOpen}
                    >
                         {mobileOpen ? <FiX size={25} /> : <FiMenu size={25} />}
                    </button>
               </div>

               {/* Mobile Navigation */}
               {mobileOpen && (
                    <nav className="border-t border-gray-100 bg-white px-4 py-4 lg:hidden">
                         <div className="container mx-auto flex flex-col gap-1">
                              {navLinks.map((link) => (
                                   <Link
                                        key={link.label}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`rounded-md px-3 py-3 text-sm font-medium transition-colors hover:bg-orange-50 hover:text-[#D52B00] ${
                                             pathname === link.href
                                                  ? 'bg-orange-50 text-[#D52B00]'
                                                  : 'text-gray-700'
                                        }`}
                                   >
                                        {link.label}
                                   </Link>
                              ))}

                              <div className="mt-3 flex gap-3 border-t border-gray-100 pt-4">
                                   <Link
                                        href="/login"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex-1 rounded-md border border-[#D52B00] px-4 py-2.5 text-center text-sm font-semibold text-[#D52B00]"
                                   >
                                        Login
                                   </Link>
                                   <Link
                                        href="/register"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex-1 rounded-md bg-[#D52B00] px-4 py-2.5 text-center text-sm font-semibold text-white"
                                   >
                                        Register
                                   </Link>
                              </div>
                         </div>
                    </nav>
               )}
          </header>
     );
};

export default Navbar;
