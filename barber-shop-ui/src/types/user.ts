import {Role} from './role';

export interface User{
    _id?: string;
    email: string;
    password: string;
    name: string;
    role: Role;
    dob: Date;
    pictureUrl?: string;
    treatmentIds?: string[]; 
    appointmentIds?: string[];
    notAvailable?: { start: Date, end: Date }[];
    resetToken?: string;
    resetTokenExpiration?: number;
}