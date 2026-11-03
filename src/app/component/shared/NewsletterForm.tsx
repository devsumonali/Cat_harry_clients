'use client';
import { useId, useState } from 'react';
import toast from 'react-hot-toast';
import { subscribeNewsletter } from '@/app/libs/api';
import type { NewsletterFormProps } from '@/app/types/type';

export default function NewsletterForm({ compact = false }: NewsletterFormProps) {
     const id = useId();
     const [busy, setBusy] = useState(false);
     return <form className={`flex flex-col gap-3 ${compact ? 'mt-4' : 'mx-auto mt-8 max-w-md sm:flex-row'}`} onSubmit={async (event) => {
          event.preventDefault();
          if (busy) return;
          const form = event.currentTarget;
          setBusy(true);
          try { await subscribeNewsletter(String(new FormData(form).get('email')).trim()); form.reset(); toast.success('Your newsletter subscription has been saved.'); }
          catch (cause) { toast.error(cause instanceof Error ? cause.message : 'Unable to subscribe.'); }
          finally { setBusy(false); }
     }}>
          <label htmlFor={id} className="sr-only">Email address for newsletter</label>
          <input id={id} type="email" name="email" required maxLength={320} placeholder="Enter your email address" className="min-w-0 flex-1 rounded-lg border border-[#eee7e3] bg-white px-4 py-3 text-sm text-[#292321] outline-none focus:ring-2 focus:ring-orange-400" />
          <button disabled={busy} type="submit" className={`rounded-lg px-5 py-3 text-sm font-semibold disabled:opacity-50 ${compact ? 'bg-[#b92d00] text-white' : 'bg-white text-[#b92d00]'}`}>{busy ? 'Subscribing...' : 'Subscribe'}</button>
     </form>;
}
