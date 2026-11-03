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
     bookingDate: string;
     startTime: string;
     endTime: string;
     guestCount: number;
}

export interface BookingResponse {
     insertedId?: string;
     message?: string;
}

export interface CategoryRouteParams {
     slug: string;
}

export interface CategoryPageProps {
     params: Promise<CategoryRouteParams>;
}
