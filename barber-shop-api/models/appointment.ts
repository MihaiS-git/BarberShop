import { model, Schema, ObjectId, Types } from "mongoose";
import { ApprovalStatus } from "./approvalStatus";

export interface IAppointment {
    _id: Types.ObjectId;
    customerId: Types.ObjectId;
    barberIds: Types.ObjectId[];
    treatmentIds: Types.ObjectId[];
    startDateTime: Date;
    duration: number;
    totalPrice: number;
    approvalStatus: ApprovalStatus;
}

const appointmentSchema = new Schema<IAppointment>({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    barberIds: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    treatmentIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Treatment',
        required: true
    }],
    startDateTime: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true
    },
    approvalStatus: {
        type: String,
        enum: Object.values(ApprovalStatus),
        required: true
    }
},
    { timestamps: true }
);

export default model<IAppointment>('Appointment', appointmentSchema);