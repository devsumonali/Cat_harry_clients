export type TCategory = {
     _id: string;
     name: string;
     slug: string;
     icon: string;
     spacesCount?: number;
};

export type TStudio = {
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
};

export type TStudioDetails = TStudio & {
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
};
