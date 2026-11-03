'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import type { ImageUploadProps } from '@/app/types/type';

export default function ImageUpload({ initialValue = '', onBusyChange }: ImageUploadProps) {
     const [url, setUrl] = useState(initialValue);
     const [busy, setBusy] = useState(false);
     return <div className="space-y-3">
          <input id="imageUrl" name="imageUrl" type="url" required value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://example.com/studio-image.jpg" className="w-full rounded-lg border border-[#eee7e3] bg-[#faf8f7] px-3.5 py-3 text-sm outline-none focus:border-[#c63717]" />
          <label className="block text-sm text-[#716966]">Or upload an image (JPG, PNG, WebP; up to 5 MB)
               <input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy} className="mt-2 block w-full text-xs file:mr-3 file:rounded-full file:border-0 file:bg-[#fff0e9] file:px-4 file:py-2 file:text-[#b92d00]" onChange={async (event) => {
                    const file = event.target.files?.[0];
                    event.target.value = '';
                    if (!file || busy) return;
                    if (file.size > 5 * 1024 * 1024) { toast.error('Choose an image up to 5 MB.'); return; }
                    setBusy(true); onBusyChange?.(true);
                    try {
                         const data = new FormData(); data.set('image', file);
                         const response = await fetch('/api/upload', { method: 'POST', body: data });
                         const result = await response.json();
                         if (!response.ok) throw new Error(result.message);
                         setUrl(result.url); toast.success('Image uploaded.');
                    } catch (cause) { toast.error(cause instanceof Error ? cause.message : 'Image upload failed.'); }
                    finally { setBusy(false); onBusyChange?.(false); }
               }} />
          </label>
          {busy && <p role="status" className="text-xs text-[#b92d00]">Uploading image…</p>}
     </div>;
}
