'use client';
import Link from 'next/link';
import type { ApplicationErrorProps } from '@/app/types/type';

export default function ApplicationError({ retry }: ApplicationErrorProps) {
     return <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-[#21140e]">We couldn’t load this page</h1>
          <p className="mt-4 text-sm leading-6 text-[#81756d]">Please check your connection and try again.</p>
          <div className="mt-7 flex justify-center gap-4"><button onClick={retry} className="rounded-full bg-[#b92d00] px-6 py-3 text-sm text-white">Try again</button><Link href="/" className="rounded-full border border-[#eee7e3] px-6 py-3 text-sm">Return to Home</Link></div>
     </main>;
}
