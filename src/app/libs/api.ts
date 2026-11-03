import type { BookingRequest, BookingResponse, DashboardSummary, MutationResponse, SessionUser, CategoryResponse, DashboardBooking, DashboardData, DashboardViewProps, TCategory, TStudio, TStudioDetails } from '@/app/types/type';

async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
     const baseURL = typeof window === 'undefined' ? process.env.NEXT_PUBLIC_API_URL : '/api';
     const response = await fetch(`${baseURL}${path}`, {
          ...options, credentials: 'include', cache: 'no-store',
          headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers },
     });
     const result = await response.json().catch(() => null);
     if (!response.ok) throw Object.assign(new Error(result?.message || 'The request failed. Please try again.'), { status: response.status });
     return result;
}

export function getMyBookings(email: string): Promise<DashboardBooking[]> {
     return apiRequest(`/studios/my-booking?email=${encodeURIComponent(email)}`);
}

export function getSavedStudioIds(): Promise<string[]> { return apiRequest('/dashboard?view=saved'); }
export function subscribeNewsletter(email: string) { return apiRequest('/newsletter', { method: 'POST', body: JSON.stringify({ email }) }); }

export async function getDashboardData(email: string, section: DashboardViewProps['section']): Promise<DashboardData> {
     if (section === 'my_listings') {
          return { userId: '', studios: await apiRequest(`/studios/my-listings?email=${encodeURIComponent(email)}`), availableStudios: [], bookings: [], incomingBookings: [], savedSpaces: [], messages: [] };
     }
     if (section === 'my_bookings') {
          return { userId: '', studios: [], availableStudios: [], bookings: await getMyBookings(email), incomingBookings: [], savedSpaces: [], messages: [] };
     }
     return apiRequest('/dashboard');
}

export function getDashboardSummary(): Promise<DashboardSummary> {
     return apiRequest('/dashboard?summary=true');
}

export function dashboardAction(action: string, id: string, values: Record<string, unknown> = {}) {
     if (action === 'deleteStudio') return apiRequest(`/studios/${encodeURIComponent(id)}`, { method: 'DELETE' });
     if (action === 'editStudio') return apiRequest(`/studios/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(values.studio) });
     if (action === 'cancelBooking') return apiRequest(`/studios/booking/${encodeURIComponent(id)}/cancel`, { method: 'PATCH' });
     return apiRequest('/dashboard', { method: 'POST', body: JSON.stringify({ action, id, ...values }) });
}

export async function saveStudio(form: FormData, user: SessionUser, id?: string) {
     const studio = { ...Object.fromEntries(form), amenities: form.getAll('amenities'),
          images: String(form.get('galleryImages') || '').split('\n').map((url) => url.trim()).filter(Boolean),
          email: user.email, ownerEmail: user.email, ownerName: user.name, ownerId: user.id };
     return apiRequest<MutationResponse>(id ? `/studios/${encodeURIComponent(id)}` : '/studios', { method: id ? 'PATCH' : 'POST', body: JSON.stringify(studio) });
}

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
     const result = await apiRequest<BookingResponse>('/studios/booking', { method: 'POST', body: JSON.stringify(booking) });
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
