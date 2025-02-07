import { Schema, model, Document, Types, ObjectId } from 'mongoose';

export interface ITreatment extends Document{
    _id: Types.ObjectId;
    name: string;
    description: string;
    duration: number; // in minutes
    price: number;
    pictureUrl: string;
    barberIds: Types.ObjectId[];
}

const treatmentSchema = new Schema<ITreatment>({
    name: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    }, 
    duration: {
        type: Number,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    }, 
    pictureUrl: {
        type: String,
        required: true
    },
    barberIds: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

export default model<ITreatment>('Treatment', treatmentSchema);
