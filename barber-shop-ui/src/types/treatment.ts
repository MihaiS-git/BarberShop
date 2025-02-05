export interface Treatment {
    id: string;
    name: string;
    description: string;
    duration: number; // in minutes
    price: number;
    pictureUrl: string;
    barberIds: string[];
}