'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import ThemeToggle from '@/app/component/shared/ThemeToggle';
import { authClient } from '@/app/libs/auth-client';
import { FiAperture, FiMenu, FiX, FiUser } from 'react-icons/fi';

const navLinks = [
     { label: 'Home', href: '/' },
     { label: 'Explore Studios', href: '/studios' },
     { label: 'How It Works', href: '/how_it_works' },
     { label: 'Host Space', href: '/host_space' },
     { label: 'About', href: '/about' },
];

const accountLinks = [
     { label: 'Dashboard', href: '/dashboard/overview' },
     { label: 'Add New Studio', href: '/dashboard/add_studios' },
     { label: 'My Studio Listings', href: '/dashboard/my_listings' },
     { label: 'My Bookings', href: '/dashboard/my_bookings' },
];

const Navbar = () => {
     const [mobileOpen, setMobileOpen] = useState(false);
     const [profileOpen, setProfileOpen] = useState(false);
     const pathname = usePathname();
     const router = useRouter();
     const { data: session, isPending, error: sessionError } = authClient.useSession();
     const [loggingOut, setLoggingOut] = useState(false);
     const [failedImage, setFailedImage] = useState<string | null>(null);
     const image = session?.user.image;
     const avatar = image && /^https?:\/\//i.test(image) && failedImage !== image
          ? <Image src={image} alt={session?.user.name || 'Profile'} fill unoptimized sizes="36px" className="object-cover" onError={() => setFailedImage(image)} />
          : <FiUser size={17} />;

     async function handleLogout() {
          if (loggingOut) return;
          setLoggingOut(true);
          try {
               const result = await authClient.signOut();
               if (result.error) throw new Error(result.error.message || 'Unable to log out.');
               setProfileOpen(false);
               setMobileOpen(false);
               toast.success('Logged out successfully.');
               router.replace('/');
               router.refresh();
          } catch (error) {
               toast.error(error instanceof Error ? error.message : 'Unable to log out.');
          } finally {
               setLoggingOut(false);
          }
     }

     return (
          <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
               <div className="container mx-auto flex h-18 items-center justify-between gap-6 px-4 lg:px-0">
                    {/* Logo */}
                    <Link
                         href="/"
                         className="shrink-0 text-[22px] font-extrabold tracking-[-0.8px] text-[#D52B00]"
                         onClick={() => setMobileOpen(false)}
                    >
                         <span className="inline-flex items-center gap-2"><FiAperture aria-hidden="true" />StudioSpace</span>
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

                    <div className="hidden items-center gap-3 lg:flex">
                         {isPending ? <span role="status" aria-label="Checking session" className="h-9 w-24 animate-pulse rounded-lg bg-gray-100" /> : session ? (
                              <div className="relative">
                                   <button type="button" onClick={() => setProfileOpen(!profileOpen)} aria-label="User account" aria-expanded={profileOpen} className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#C52D08] text-white">
                                        {avatar}
                                   </button>
                                   {profileOpen && (
                                        <div className="absolute right-0 top-12 w-60 overflow-hidden rounded-lg border border-gray-100 bg-white py-2 shadow-lg">
                                             <div className="border-b border-gray-100 px-4 py-3"><p className="truncate text-sm font-semibold">{session.user.name}</p><p className="mt-1 truncate text-xs text-gray-500">{session.user.email}</p></div>
                                             {accountLinks.map((link) => <Link key={link.href} href={link.href} onClick={() => setProfileOpen(false)} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50">{link.label}</Link>)}
                                             <button type="button" disabled={loggingOut} onClick={handleLogout} className="w-full px-4 py-2.5 text-left text-sm font-medium text-[#D52B00] hover:bg-orange-50 disabled:opacity-50">{loggingOut ? 'Logging out...' : 'Logout'}</button>
                                        </div>
                                   )}
                              </div>
                         ) : (
                              <><Link href="/login" className="text-sm font-semibold text-[#D52B00]">Login</Link><Link href="/register" className="rounded-lg bg-[#D52B00] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#B82500]">Register</Link></>
                         )}
                         {sessionError && <span className="sr-only" role="status">Unable to check your session. Please refresh.</span>}
                    </div>

                    <ThemeToggle />
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

                              <div className="mt-3 border-t border-gray-100 pt-4">
                                   {isPending ? <p role="status" className="px-3 text-sm text-gray-500">Checking session...</p> : session ? (
                                        <div className="space-y-1">
                                             <div className="flex items-center gap-3 px-3 pb-3"><span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#C52D08] text-white">{avatar}</span><span className="truncate text-sm font-semibold">{session.user.name}</span></div>
                                             {accountLinks.map((link) => <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-3 text-sm text-gray-700 hover:bg-orange-50">{link.label}</Link>)}
                                             <button type="button" disabled={loggingOut} onClick={handleLogout} className="w-full px-3 py-3 text-left text-sm font-semibold text-[#D52B00] disabled:opacity-50">{loggingOut ? 'Logging out...' : 'Logout'}</button>
                                        </div>
                                   ) : (
                                        <div className="flex gap-3"><Link href="/login" onClick={() => setMobileOpen(false)} className="flex-1 rounded-lg border border-[#D52B00] px-4 py-2.5 text-center text-sm font-semibold text-[#D52B00]">Login</Link><Link href="/register" onClick={() => setMobileOpen(false)} className="flex-1 rounded-lg bg-[#D52B00] px-4 py-2.5 text-center text-sm font-semibold text-white">Register</Link></div>
                                   )}
                              </div>
                         </div>
                    </nav>
               )}
          </header>
     );
};

export default Navbar;
