import type { ElementType, ReactNode } from 'react';

export interface TCategory {
     _id: string;
     name: string;
     slug: string;
     icon: string;
     spacesCount?: number;
}

export interface TStudio {
     _id: string;
     title: string;
     category: string;
     city: string;
     imageUrl?: string;
     image?: string;
     squareFootage?: number | string;
     hourlyRate: number | string;
     rating?: number;
     instantBook?: boolean;
}

export interface TStudioDetails extends TStudio {
     reviews?: StudioReview[];
     ownerId?: string;
     ownerEmail?: string;
     ownerName?: string;
     images?: string[];
     description?: string;
     ceilingHeight?: number | string;
     maxCapacity?: number | string;
     powerSupply?: string;
     amenities?: string[];
     securityDeposit?: number | string;
     minimumBookingHours?: number | string;
     streetAddress?: string;
     postalCode?: string;
     overtimePolicy?: string;
     houseRules?: string;
}

export interface TExploreStudio extends Omit<TStudio, 'city' | 'hourlyRate'> {
     city?: string;
     hourlyRate?: number | string;
     streetAddress?: string;
     images?: string[];
     isFeatured?: boolean;
     amenities?: string[];
}

export interface CategoryResponse {
     data?: TCategory[];
}

export interface CategoryCardProps {
     category: TCategory;
     image: string;
}

export interface StudioCardProps {
     studio: TStudio;
}

export interface ExploreStudioCardProps {
     studio: TExploreStudio;
}

export interface ExploreStudiosSearchParams {
     category?: string | string[];
     amenities?: string | string[];
     maxPrice?: string;
     sort?: string;
     page?: string;
}

export interface ExploreStudiosPageProps {
     searchParams: Promise<ExploreStudiosSearchParams>;
}

export interface FilterSidebarProps {
     categories: TCategory[];
     amenities: string[];
     selectedCategories: string[];
     selectedAmenities: string[];
     maxPrice?: string;
}

export interface StudioRouteParams {
     id: string;
}

export interface StudioPageProps {
     params: Promise<StudioRouteParams>;
}

export interface StudioImageProps {
     src?: string;
     title: string;
}

export interface SidebarProps {
     image?: string | null;
     name?: string;
     role?: string;
     bookingCount?: number;
     hasUnreadMessages?: boolean;
}

export interface DashboardLayoutProps {
     children: ReactNode;
}

export interface SectionHeadingProps {
     icon: ElementType;
     title: string;
     description: string;
}

export interface BookingPanelProps {
     studio: TStudioDetails;
}

export interface BookingRequest {
     studioId: string;
     studioTitle: string;
     userId: string;
     userName: string;
     userEmail: string;
     bookingDate: string;
     startTime: string;
     endTime: string;
     guestCount: number;
     hourlyRate: number;
     totalHours: number;
     securityDeposit: number;
     totalAmount: number;
     status: 'pending';
     createdAt: string;
}

export interface BookingResponse {
     acknowledged?: boolean;
     insertedId?: string;
     message?: string;
}

export interface CategoryRouteParams {
     slug: string;
}

export interface CategoryPageProps {
     params: Promise<CategoryRouteParams>;
}

export interface DashboardStudio extends TStudioDetails {
     ownerId?: string;
     ownerName?: string;
}

export interface DashboardBooking extends Omit<BookingRequest, 'status'> {
     _id: string;
     status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rejected';
}

export interface DashboardMessage {
     _id: string;
     studioId: string;
     studioTitle: string;
     senderId: string;
     senderName: string;
     recipientId: string;
     recipientName: string;
     text: string;
     createdAt: string;
     read: boolean;
}

export interface DashboardData {
     userId: string;
     studios: DashboardStudio[];
     availableStudios: DashboardStudio[];
     bookings: DashboardBooking[];
     incomingBookings: DashboardBooking[];
     savedSpaces: DashboardStudio[];
     messages: DashboardMessage[];
}

export interface DashboardViewProps {
     section: 'overview' | 'my_listings' | 'my_bookings' | 'saved_spaces' | 'messages';
}

export interface DialogProps {
     open: boolean;
     title: string;
     onClose: () => void;
     children: ReactNode;
}

export interface ConfirmationRequest {
     message: string;
     onConfirm: () => void;
}

export interface StudioFormProps { studio?: TStudioDetails; }
export interface ImageUploadProps { initialValue?: string; onBusyChange?: (busy: boolean) => void; }
export interface SaveStudioProps { studioId: string; }
export interface SessionUser { id: string; name: string; email: string; image?: string | null; }
export interface DashboardSummary { bookingCount: number; hasUnreadMessages: boolean; }
export interface MutationResponse extends BookingResponse { success?: boolean; }
export interface StudioReview { _id?: string; name: string; rating: number; comment: string; }
export interface ApplicationErrorProps { error: unknown; retry: () => void; }
export interface NewsletterFormProps { compact?: boolean; }
