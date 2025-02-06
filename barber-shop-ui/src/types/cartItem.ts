export interface CartItem {
    _id: string;
    name: string;
    description: string;
    duration: number;
    price: number;
    pictureUrl: string;
    barberIds?: string[];
}