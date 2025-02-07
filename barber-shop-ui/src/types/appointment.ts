import { ApprovalStatus } from "./approvalStatus";

export interface Appointment{
    _id: string;
    customerId: string;
    barberIds: string[];
    treatmentIds: string[];
    startDateTime: string;
    duration: number;
    totalPrice: number;
    approvalStatus: ApprovalStatus;
}
