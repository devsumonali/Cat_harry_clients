'use client';

import { useEffect, useId, useRef } from 'react';
import { FiX } from 'react-icons/fi';
import type { DialogProps } from '@/app/types/type';

export default function Dialog({ open, title, onClose, children }: DialogProps) {
     const dialog = useRef<HTMLDialogElement>(null);
     const titleId = useId();
     useEffect(() => {
          if (open && !dialog.current?.open) dialog.current?.showModal();
          if (!open && dialog.current?.open) dialog.current.close();
     }, [open]);
     return <dialog ref={dialog} onCancel={onClose} onClose={onClose} aria-labelledby={titleId}
          className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border border-[#eee7e3] bg-white p-6 text-[#21140e] shadow-xl backdrop:bg-black/60">
          <div className="mb-5 flex items-center justify-between gap-4"><h2 id={titleId} className="text-xl font-semibold">{title}</h2><button type="button" onClick={onClose} aria-label="Close dialog" className="rounded-full p-2 hover:bg-[#faf8f7]"><FiX size={20} /></button></div>
          {children}
     </dialog>;
}
