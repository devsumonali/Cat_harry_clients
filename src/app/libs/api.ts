import type { BookingRequest, BookingResponse, CategoryResponse, TCategory, TStudio, TStudioDetails } from '@/app/types/type';

export async function getCategories(): Promise<TCategory[]> {
     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);

     if (!res.ok) {
          throw new Error('Failed to fetch categories');
     }

     const result: TCategory[] | CategoryResponse = await res.json();
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

export async function createBooking(booking: BookingRequest): Promise<BookingResponse> {
     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios/booking`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(booking),
     });
     const result: BookingResponse = await res.json().catch(() => ({}));
     if (!res.ok) {
          throw new Error(result.message || 'Booking request could not be submitted. Please try again.');
     }
     if (!result.insertedId) throw new Error('Booking was not confirmed as saved.');
     return result;
}

export async function getCategoryStudios(slug: string): Promise<TStudio[]> {
     const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories/${encodeURIComponent(slug)}/studios`,
          { cache: 'no-store' },
     );
     if (!res.ok) throw new Error('Failed to fetch category studios');
     return res.json();
}
