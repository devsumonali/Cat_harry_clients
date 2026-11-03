
'use client';

import { useRef, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/app/libs/auth-client';
import { getPasswordError } from '@/app/libs/auth-utils';

const input = 'mt-2 w-full rounded-lg border border-[#eee7e3] bg-[#faf8f7] px-3 py-3 text-sm outline-none focus:border-[#c63717]';
const panel = 'rounded-xl border border-[#eee7e3] bg-white p-5 sm:p-6';
const button = 'rounded-full bg-[#b92d00] px-6 py-3 text-sm font-medium text-white hover:bg-[#982600] disabled:opacity-50';

export default function Settings() {
     const { data: session, isPending, error, refetch } = authClient.useSession();
     const [busy, setBusy] = useState(false);
     const inFlight = useRef(false);
     const router = useRouter();

     async function save(event: FormEvent<HTMLFormElement>, password: boolean) {
          event.preventDefault();
          if (inFlight.current) return;
          const form = event.currentTarget;
          const data = new FormData(form);
          inFlight.current = true;
          setBusy(true);
          try {
               if (password) {
                    const newPassword = String(data.get('newPassword') || '');
                    const message = getPasswordError(newPassword);
                    if (message) throw new Error(message);
                    if (newPassword !== data.get('confirmPassword')) throw new Error('Passwords do not match.');
                    const result = await authClient.changePassword({ currentPassword: String(data.get('currentPassword')), newPassword, revokeOtherSessions: true });
                    if (result.error) throw new Error(result.error.message || 'Unable to change password.');
                    form.reset();
               } else {
                    const name = String(data.get('name') || '').trim();
                    const image = String(data.get('image') || '').trim();
                    if (!name) throw new Error('Enter your name.');
                    if (image && !/^https?:\/\//i.test(image)) throw new Error('Use an http or https photo URL.');
                    const result = await authClient.updateUser({ name, image: image || null });
                    if (result.error) throw new Error(result.error.message || 'Unable to update profile.');
                    await refetch();
                    router.refresh();
               }
               toast.success(password ? 'Password updated.' : 'Profile updated.');
          } catch (cause) { toast.error(cause instanceof Error ? cause.message : 'Unable to save changes.'); }
          finally { inFlight.current = false; setBusy(false); }
     }

     if (isPending) return <p role="status" className={panel}>Loading your profile…</p>;
     if (!session) return <div className={panel}><p>{error ? 'Unable to load your profile.' : 'Your session has expired.'}</p><button className={`${button} mt-4`} onClick={() => router.push('/login?callbackURL=%2Fdashboard%2Fsettings')}>Log in</button></div>;

     return <div className="space-y-6 text-[#21140e]">
          <header><h1 className="text-3xl font-bold">Settings</h1><p className="mt-2 text-sm text-[#81756d]">Manage your profile and account security.</p></header>
          <form className={panel} onSubmit={(event) => void save(event, false)}>
               <h2 className="mb-5 text-xl font-semibold">Profile</h2>
               <fieldset disabled={busy} className="space-y-5">
                    <label className="block text-sm">Name<input name="name" autoComplete="name" required defaultValue={session.user.name} className={input} /></label>
                    <label className="block text-sm">Email<input type="email" readOnly value={session.user.email} className={`${input} text-[#81756d]`} /></label>
                    <label className="block text-sm">Photo URL<input type="url" name="image" defaultValue={session.user.image || ''} placeholder="https://example.com/photo.jpg" className={input} /></label>
                    <button className={button}>Save Profile</button>
               </fieldset>
          </form>
          <form className={panel} onSubmit={(event) => void save(event, true)}>
               <h2 className="text-xl font-semibold">Change Password</h2><p className="mb-5 mt-2 text-sm text-[#81756d]">For email/password accounts. Google-only accounts use Google to sign in.</p>
               <fieldset disabled={busy} className="space-y-5">
                    <label className="block text-sm">Current password<input name="currentPassword" type="password" required autoComplete="current-password" className={input} /></label>
                    <label className="block text-sm">New password<input name="newPassword" type="password" minLength={6} maxLength={128} required autoComplete="new-password" className={input} /></label>
                    <label className="block text-sm">Confirm new password<input name="confirmPassword" type="password" minLength={6} maxLength={128} required autoComplete="new-password" className={input} /></label>
                    <p className="text-xs text-[#81756d]">Use at least six characters with uppercase and lowercase letters. Other sessions will be signed out.</p>
                    <button className={button}>Update Password</button>
               </fieldset>
          </form>
     </div>;
}
