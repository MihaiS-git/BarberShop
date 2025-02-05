import mongoose, { Schema, model, Document, Types } from 'mongoose';
import { Role } from './role';

export interface IUser extends Document { 
    id?: string;
    email: string;
    password: string;
    name: string;
    role: Role;
    dob: Date;
    pictureUrl: string;
    treatmentIds?: Types.ObjectId[];
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
    pictureUrl: {
        type: String,
        required: false,
        default: '.\\barbers\\bs_user.png'
    },
    treatmentIds: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Treatment'
        }
    ],
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

export default model<IUser>('User', userSchema);