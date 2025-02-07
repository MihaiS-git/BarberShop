import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import CustomError from "../utils/custom-error";
import Appointment, { IAppointment } from '../models/appointment';
import mongoose from "mongoose";
import { ApprovalStatus } from "../models/approvalStatus";
import User from '../models/user';
import Treatment from '../models/treatment';

class AppointmentsController {
    static async saveAppointment(req: Request, res: Response, next: NextFunction) {
        console.log("saveAppointment controller called");
        console.log("REQUEST BODY: ", req.body);
        console.log("REQUEST HEADERS: ", req.headers);

        try {
            if (!req.body) {
                throw new CustomError("Appointment data is missing", 400);
            }

            const { customerId, barberIds, treatmentIds, startDateTime, duration, totalPrice, approvalStatus } = req.body;

            if (!mongoose.Types.ObjectId.isValid(customerId)) {
                throw new CustomError(`Invalid customerId: ${customerId}`, 400);
            }
            const customer = await User.findOne({ _id: customerId, role: 'customer' });
            if (!customer) {
                throw new CustomError(`Customer with ID ${customerId} does not exist or is not a customer`, 404);
            }

            if (!Array.isArray(barberIds) || !Array.isArray(treatmentIds)) {
                throw new CustomError("barberIds and treatmentIds must be arrays", 400);
            }

            const foundBarbers = await User.find({ _id: { $in: barberIds }, role: 'barber' });
            if (foundBarbers.length !== barberIds.length) {
                throw new CustomError(`One or more barbers do not exist`, 404);
            }
            const foundTreatments = await Treatment.find({ _id: { $in: treatmentIds } });
            if (foundTreatments.length !== treatmentIds.length) {
                throw new CustomError(`One or more treatments do not exist`, 404);
            }

            const normalizedStatus = approvalStatus.toLowerCase();
            if (!Object.values(ApprovalStatus).includes(normalizedStatus as ApprovalStatus)) {
                throw new CustomError(`Invalid approvalStatus: ${approvalStatus}`, 400);
            }

            const appointment = new Appointment({
                customerId: new mongoose.Types.ObjectId(customerId),
                barberIds: barberIds.map((id: string) => new mongoose.Types.ObjectId(id)),
                treatmentIds: treatmentIds.map((id: string) => new mongoose.Types.ObjectId(id)),
                startDateTime,
                duration,
                totalPrice,
                approvalStatus: normalizedStatus as ApprovalStatus
            });

            const result: IAppointment = await appointment.save();
            console.log("Appointment saved successfully.");
            res.status(200).json(result);
        } catch (error: any) {
            const err = new CustomError(error.message || 'Internal Server Error', error.status || 500, error.data);
            next(err);
        }
    }
}

export default AppointmentsController;