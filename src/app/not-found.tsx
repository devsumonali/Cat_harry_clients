
import Link from "next/link";
import {
  FiHome,
  FiArrowRight,
  FiCamera,
  FiSearch,
} from "react-icons/fi";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-[#0F172A] px-4 py-20 text-white sm:px-6">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-orange-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-orange-600/10 blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
        {/* Studio Illustration */}
        <div className="relative mx-auto mb-10 flex h-52 max-w-sm items-center justify-center sm:h-64">
          <div className="absolute h-48 w-48 rounded-full border border-dashed border-orange-500/25 sm:h-60 sm:w-60" />
          <div className="absolute h-36 w-36 rounded-full bg-orange-500/10 blur-2xl" />

          <h1 className="relative text-[115px] font-black leading-none tracking-[-10px] text-white sm:text-[160px]">
            404
          </h1>

          {/* Camera */}
          <div className="absolute right-2 top-4 flex h-16 w-16 rotate-12 items-center justify-center rounded-2xl border border-orange-400/40 bg-orange-500 shadow-xl shadow-orange-500/20 sm:right-0 sm:h-20 sm:w-20">
            <FiCamera className="text-3xl text-white sm:text-4xl" />
          </div>

          {/* Search Illustration */}
          <div className="absolute bottom-4 left-0 flex h-12 w-12 -rotate-12 items-center justify-center rounded-xl border border-white/10 bg-[#1E293B] shadow-xl sm:h-14 sm:w-14">
            <FiSearch className="text-2xl text-orange-400" />
          </div>

          {/* Decorative Dots */}
          <span className="absolute left-12 top-5 h-2 w-2 rounded-full bg-orange-400" />
          <span className="absolute bottom-8 right-10 h-3 w-3 rounded-full bg-orange-500/60" />
        </div>

        {/* Status Label */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
          <span className="h-2 w-2 rounded-full bg-orange-400" />
          Error 404 - Page Not Found
        </div>

        {/* Content */}
        <h2 className="mb-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Oops! This scene is{" "}
          <span className="text-orange-500">missing.</span>
        </h2>

        <p className="mx-auto mb-9 max-w-lg text-sm leading-7 text-slate-400 sm:text-base">
          Looks like this page didn&lsquo;t make the final cut.
          The space you&apos;re looking for may have moved or
          no longer exists. Let&apos;s get you back to creating
          something amazing.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-600/20 sm:w-auto"
          >
            <FiHome className="text-lg" />
            Back to Home
          </Link>

          <Link
            href="/explore_studios"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-600 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-orange-500/50 hover:bg-white/10 sm:w-auto"
          >
            Explore Studios
            <FiArrowRight className="text-lg" />
          </Link>
        </div>

        {/* Bottom Message */}
        <p className="mt-12 text-xs text-slate-500">
          Lost your way? The perfect creative space is
          just a click away.
        </p>
      </div>
    </main>
  );
}
