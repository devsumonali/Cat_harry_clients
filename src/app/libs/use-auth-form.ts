'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from './auth-client';
import { getPasswordError, getSafeCallbackURL } from './auth-utils';
import { syncJwtSession } from '@/app/component/shared/JwtSessionSync';

export function useAuthForm(mode: 'login' | 'register') {
     const router = useRouter();
     const searchParams = useSearchParams();
     const callbackURL = getSafeCallbackURL(searchParams.get('callbackURL'));
     const [pending, setPending] = useState<'email' | 'google' | null>(null);
     const [error, setError] = useState('');
     const busy = useRef(false);
     const googleError = searchParams.get('error');

     useEffect(() => {
          if (googleError) toast.error('Google sign-in could not be completed. Please try again.', { id: 'google-auth-error' });
     }, [googleError]);

     async function handleSubmit(event: FormEvent<HTMLFormElement>) {
          event.preventDefault();
          if (busy.current) return;
          const form = new FormData(event.currentTarget);
          const email = String(form.get('email') || '').trim();
          const password = String(form.get('password') || '');
          const name = String(form.get('name') || '').trim();
          const image = String(form.get('photo') || '').trim();
          setError('');

          if (mode === 'register') {
               const message = !name ? 'Please enter your name.' : getPasswordError(password);
               if (message) { setError(message); toast.error(message); return; }
               if (image && !/^https?:\/\//i.test(image)) {
                    setError('Photo URL must start with https:// or http://');
                    return;
               }
          }

          busy.current = true;
          setPending('email');
          try {
               const result = mode === 'register'
                    ? await authClient.signUp.email({ name, email, password, image: image || undefined })
                    : await authClient.signIn.email({ email, password, rememberMe: form.get('remember') === 'on' });
               if (result.error) throw new Error(result.error.message || 'Authentication failed. Please try again.');
               if (mode === 'register') {
                    toast.success('Account created! Please log in.');
                    router.replace(`/login?callbackURL=${encodeURIComponent(callbackURL)}`);
               } else {
                    await syncJwtSession();
                    toast.success('Welcome back!');
                    router.replace(callbackURL);
                    router.refresh();
               }
          } catch (cause) {
               const message = cause instanceof Error ? cause.message : 'Unable to connect. Please try again.';
               setError(message);
               toast.error(message);
          } finally {
               busy.current = false;
               setPending(null);
          }
     }

     async function handleGoogle() {
          if (busy.current) return;
          busy.current = true;
          setPending('google');
          setError('');
          try {
               const result = await authClient.signIn.social({
                    provider: 'google',
                    callbackURL,
                    newUserCallbackURL: callbackURL,
                    errorCallbackURL: `/login?error=google&callbackURL=${encodeURIComponent(callbackURL)}`,
               });
               if (result.error) throw new Error(result.error.message || 'Unable to start Google sign-in.');
          } catch (cause) {
               const message = cause instanceof Error ? cause.message : 'Google sign-in failed. Please try again.';
               setError(message);
               toast.error(message);
          } finally {
               busy.current = false;
               setPending(null);
          }
     }

     return { pending, error, handleSubmit, handleGoogle, callbackURL };
}
