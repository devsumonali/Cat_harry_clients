'use client';
import { useSyncExternalStore } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

function subscribe(callback: () => void) {
     const observer = new MutationObserver(callback);
     observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
     return () => observer.disconnect();
}
export default function ThemeToggle() {
     const theme = useSyncExternalStore(subscribe, () => document.documentElement.dataset.theme || 'light', () => 'light');
     return <button type="button" aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'} aria-pressed={theme === 'dark'} className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#eee7e3] bg-white text-[#292524]" onClick={() => {
          const next = theme === 'dark' ? 'light' : 'dark';
          document.documentElement.dataset.theme = next;
          try { localStorage.setItem('studiospace-theme', next); } catch { /* Theme still works when storage is unavailable. */ }
     }}>{theme === 'dark' ? <FiSun size={17} /> : <FiMoon size={17} />}</button>;
}
