import { Schema, model, Document } from 'mongoose';
import { Role } from './role';

export interface IUser extends Document { 
    id?: string;
    email: string;
    password: string;
    name: string;
    role: Role;
    dob: Date;
    resetToken: string;
    resetTokenExpiration: number;
};

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(Role)
    },
    dob: {
        type: Date,
        required: true
    },
    resetToken: {
        type: String,
        required: false,
        default: null
    },
    resetTokenExpiration: {
        type: Number,
        required: false,
        default: null
    }
});

const User = model<IUser>('User', userSchema);
export default User;