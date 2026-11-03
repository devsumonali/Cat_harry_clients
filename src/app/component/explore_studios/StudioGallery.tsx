'use client';
import { useState } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { BookingPanelProps } from '@/app/types/type';

export default function StudioGallery({ studio }: BookingPanelProps) {
     const images = [...new Set([studio.imageUrl || studio.image, ...(studio.images || [])].filter((url): url is string => !!url))];
     const [index, setIndex] = useState(0);
     const [failed, setFailed] = useState<string[]>([]);
     const current = images[index];
     return <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-[#eee9e5] sm:aspect-16/10">
          {current && !failed.includes(current) ? <Image src={current} alt={`${studio.title} — photo ${index + 1}`} fill unoptimized sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover" onError={() => setFailed((items) => [...items, current])} /> : <p className="flex h-full items-center justify-center text-sm text-[#81756d]">Image unavailable</p>}
          {images.length > 1 && <><button type="button" aria-label="Previous studio photo" onClick={() => setIndex((index + images.length - 1) % images.length)} className="absolute left-3 top-1/2 rounded-full bg-white p-3 text-[#21140e] shadow"><FiChevronLeft /></button><button type="button" aria-label="Next studio photo" onClick={() => setIndex((index + 1) % images.length)} className="absolute right-3 top-1/2 rounded-full bg-white p-3 text-[#21140e] shadow"><FiChevronRight /></button><span aria-live="polite" className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs text-white">{index + 1} / {images.length}</span></>}
     </div>;
}
