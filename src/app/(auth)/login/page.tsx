'use client';

import { Suspense } from 'react';
import { useAuthForm } from '@/app/libs/use-auth-form';
import Image from 'next/image';
import Link from 'next/link';
import { FiAperture, FiArrowLeft, FiArrowRight, FiMail, FiLock } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

function LoginForm() {
     const { pending, error, handleSubmit, handleGoogle, callbackURL } = useAuthForm('login');
     return (
          <main className="flex-1 bg-[#faf8f7] px-4 py-8 text-[#282322] sm:px-6 sm:py-12 lg:py-16">
               <div className="mx-auto max-w-6xl">
                    <Link
                         href="/"
                         className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-[#81746b] transition hover:text-[#D52B00] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D52B00]"
                    >
                         <FiArrowLeft size={15} aria-hidden="true" /> Back to home
                    </Link>
                    <div className="grid overflow-hidden rounded-3xl border border-[#eee5de] bg-white shadow-xl shadow-[#4a3020]/5 lg:grid-cols-[0.95fr_1.05fr]">
                         <aside className="relative hidden min-h-160 overflow-hidden bg-[#342820] lg:flex lg:flex-col lg:justify-between lg:p-10">
                              <Image
                                   src="/images/home/hero-daylight.png"
                                   alt="Warm natural light in a spacious photography studio"
                                   fill
                                   sizes="(min-width: 1024px) 550px, 1px"
                                   className="object-cover"
                              />
                              <div className="absolute inset-0 bg-linear-to-b from-black/45 via-black/10 to-black/80" />
                              <div className="relative z-10 inline-flex items-center gap-2.5 text-xl font-bold tracking-tight text-white">
                                   <FiAperture size={27} aria-hidden="true" /> StudioSpace
                              </div>
                              <div className="relative z-10 mt-40">
                                   <span className="inline-block rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur">
                                        Made for creative people
                                   </span>
                                   <h2 className="mt-6 text-4xl font-bold leading-[1.15] tracking-tight text-white">
                                        A space for your
                                        <br />
                                        next great idea.
                                   </h2>
                                   <p className="mt-5 max-w-xs text-sm leading-7 text-white/75">
                                        Discover inspiring studios. Make room for the work you love.
                                   </p>
                                   <div className="mt-8 flex gap-2" aria-hidden="true">
                                        <span className="h-1 w-10 rounded-full bg-[#ed6a43]" />
                                        <span className="h-1 w-3 rounded-full bg-white/35" />
                                        <span className="h-1 w-3 rounded-full bg-white/35" />
                                   </div>
                              </div>
                         </aside>
                         <section
                              aria-labelledby="login-heading"
                              className="min-w-0 px-5 py-9 sm:px-10 sm:py-12 lg:px-12"
                         >
                              <div className="mx-auto max-w-md">
                                   <span className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0e9] text-[#D52B00]">
                                        <FiAperture size={24} aria-hidden="true" />
                                   </span>
                                   <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c44a28]">
                                        YOUR NEXT SESSION STARTS HERE
                                   </p>
                                   <h1
                                        id="login-heading"
                                        className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
                                   >
                                        Welcome back.
                                   </h1>
                                   <p className="mt-3 text-sm leading-6 text-[#8a7b70]">
                                        Log in to your creative corner of StudioSpace.
                                   </p>
                                   <form aria-labelledby="login-heading" onSubmit={handleSubmit} aria-busy={!!pending}>
                                        <fieldset disabled={!!pending} className="min-w-0 disabled:opacity-70">
                                        <button
                                             type="button"
                                             onClick={handleGoogle}
                                             className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-xl border border-[#e9e2dd] bg-white px-4 py-3.5 text-sm font-semibold transition hover:bg-[#faf8f7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D52B00]"
                                        >
                                             <FcGoogle size={20} aria-hidden="true" />
                                             {pending === 'google' ? 'Connecting to Google?' : 'Continue with Google'}
                                        </button>
                                        <div className="my-6 flex items-center gap-4">
                                             <span className="h-px flex-1 bg-[#eee7e1]" />
                                             <span className="text-[11px] text-[#a09287]">
                                                  or continue with email
                                             </span>
                                             <span className="h-px flex-1 bg-[#eee7e1]" />
                                        </div>
                                        <div
                                             role="group"
                                             aria-label="Login details"
                                             className="space-y-4"
                                        >
                                             <div>
                                                  <label
                                                       htmlFor="login-email"
                                                       className="mb-2 block text-xs font-semibold text-[#51443b]"
                                                  >
                                                       Email address
                                                  </label>
                                                  <div className="relative">
                                                       <FiMail
                                                            size={17}
                                                            aria-hidden="true"
                                                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#a08e81]"
                                                       />
                                                       <input
                                                            id="login-email"
                                                            name="email"
                                                            type="email"
                                                            required
                                                            autoComplete="email"
                                                            placeholder="you@example.com"
                                                            className="block w-full rounded-xl border border-[#e9e2dd] bg-[#fdfcfb] py-3.5 pl-11 pr-4 text-sm text-[#282322] outline-none transition placeholder:text-[#a99d94] focus:border-[#D52B00] focus:ring-4 focus:ring-[#D52B00]/10"
                                                       />
                                                  </div>
                                             </div>
                                             <div>
                                                  <label
                                                       htmlFor="login-password"
                                                       className="mb-2 block text-xs font-semibold text-[#51443b]"
                                                  >
                                                       Password
                                                  </label>
                                                  <div className="relative">
                                                       <FiLock
                                                            size={17}
                                                            aria-hidden="true"
                                                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#a08e81]"
                                                       />
                                                       <input
                                                            id="login-password"
                                                            name="password"
                                                            type="password"
                                                            required
                                                            maxLength={128}
                                                            autoComplete="current-password"
                                                            placeholder="Enter your password"
                                                            className="block w-full rounded-xl border border-[#e9e2dd] bg-[#fdfcfb] py-3.5 pl-11 pr-4 text-sm text-[#282322] outline-none transition placeholder:text-[#a99d94] focus:border-[#D52B00] focus:ring-4 focus:ring-[#D52B00]/10"
                                                       />
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                             <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-[#81746b]">
                                                  <input
                                                       type="checkbox"
                                                       name="remember"
                                                       className="h-4 w-4 rounded accent-[#D52B00]"
                                                  />{' '}
                                                  Remember me
                                             </label>
                                             <button
                                                  type="button"
                                                  disabled
                                                  title="Password reset is not enabled"
                                                  className="text-xs font-semibold text-[#D52B00] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D52B00]"
                                             >
                                                  Forgot password?
                                             </button>
                                        </div>
                                        {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-xs leading-5 text-red-700">{error}</p>}
                                        <button
                                             type="submit"
                                             className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#D52B00] px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-orange-900/10 transition hover:bg-[#B82500] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D52B00]"
                                        >
                                             {pending === 'email' ? 'Logging in?' : 'Log In'} <FiArrowRight size={17} aria-hidden="true" />
                                        </button>
                                        </fieldset>
                                   </form>
                                   <p className="mt-6 text-center text-xs leading-6 text-[#81746b]">
                                        New to StudioSpace?{' '}
                                        <Link
                                             href={`/register?callbackURL=${encodeURIComponent(callbackURL)}`}
                                             className="font-semibold text-[#D52B00] hover:underline"
                                        >
                                             Create an account
                                        </Link>
                                   </p>
                                   <p className="mt-8 border-t border-[#f0eae5] pt-5 text-center text-[10px] leading-5 text-[#a39589]">
                                        A place for creators. A home for inspiring spaces.
                                   </p>
                              </div>
                         </section>
                    </div>
               </div>
          </main>
     );
}

export default function LoginPage() {
     return <Suspense fallback={<main className="flex-1 bg-[#faf8f7] px-4 py-20 text-center" role="status">Loading login?</main>}><LoginForm /></Suspense>;
}
