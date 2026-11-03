export type TCategory = {
     spacesCount: any;
     _id: string;
     name: string;
     slug: string;
     icon: string;
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
