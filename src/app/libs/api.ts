import type { TCategory, TStudioDetails } from '@/app/types/type';

export async function getCategories(): Promise<TCategory[]> {
     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);

     if (!res.ok) {
          throw new Error('Failed to fetch categories');
     }

     const result: TCategory[] | { data?: TCategory[] } = await res.json();
     return Array.isArray(result) ? result : result.data || [];
}

export async function getStudioById(id: string): Promise<TStudioDetails | null> {
     if (!/^[a-f\d]{24}$/i.test(id)) return null;

     const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/studios/${encodeURIComponent(id)}`,
          { cache: 'no-store' },
     );

     if (res.status === 404) return null;
     if (!res.ok) throw new Error('Failed to fetch studio');

     // Express may return an empty body when findOne finds no matching studio.
     const body = await res.text();
     return body.trim() ? (JSON.parse(body) as TStudioDetails | null) : null;
}
