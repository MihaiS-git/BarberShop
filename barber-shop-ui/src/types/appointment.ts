export interface Appointment{
    _id: string;
    customerId: string;
    barberIds: string[];
    treatmentIds: string[];
    startDateTime: Date;
    duration: number;
    totalPrice: number;
    approvalStatus: "APPROVED" | "PENDING" | "REJECTED";
}
