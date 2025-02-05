import {Role} from './role';

export interface User{
    id?: string;
    email: string;
    password: string;
    name: string;
    role: Role;
    dob: Date;
    pictureUrl?: string;
    treatmentIds?: string[]; 
}