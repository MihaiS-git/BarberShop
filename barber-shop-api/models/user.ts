import { Schema, model, Document, Types, ObjectId } from 'mongoose';
import { Role } from './role';

export interface IUser extends Document {
    _id: ObjectId;
    email: string;
    password: string;
    name: string;
    role: Role;
    dob: Date;
    pictureUrl: string;
    treatmentIds?: Types.ObjectId[];
    appointmentIds?: Types.ObjectId[];
    notAvailable?: { start: Date, end: Date }[];
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
        enum: Object.values(Role),
        required: true
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
    appointmentIds: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Appointment'
        }
    ],
    notAvailable: [{
        start: { type: Date },
        end: {type: Date}
    }],
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