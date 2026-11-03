'use client';

import type { StudioImageProps } from '@/app/types/type';

import Image from 'next/image';
import { useState } from 'react';
import { FiImage } from 'react-icons/fi';

export default function StudioImage({ src, title }: StudioImageProps) {
     const [failed, setFailed] = useState(false);
     const validSource = src && (/^https?:\/\//i.test(src) || /^\/(?!\/)/.test(src));

     return (
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-[#eee9e5] sm:aspect-16/10">
               {validSource && !failed ? (
                    <Image
                         src={src}
                         alt={title}
                         fill
                         unoptimized
                         loading="eager"
                         sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 65vw, 850px"
                         onError={() => setFailed(true)}
                         className="object-cover"
                    />
               ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center text-[#81756d]">
                         <FiImage size={36} aria-hidden="true" />
                         <p className="text-sm">Studio image unavailable</p>
                    </div>
               )}
          </div>
     );
}
