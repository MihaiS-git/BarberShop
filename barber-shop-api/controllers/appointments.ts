import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import CustomError from "../utils/custom-error";
import Appointment, { IAppointment } from '../models/appointment';
import mongoose, { Types } from "mongoose";
import { ApprovalStatus } from "../models/approvalStatus";
import User from '../models/user';
import Treatment from '../models/treatment';
import isBarberAvailable from '../utils/is-barber-available';
import { log } from "console";

class AppointmentsController {
    static async saveAppointment(req: Request, res: Response, next: NextFunction) {
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

            if (!isBarberAvailable(barberIds, startDateTime)) {
                throw new CustomError('Picked date and time are not valid.', 400);
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
            if (result) {
                customer.appointmentIds!.push(result._id);
                await customer.save();

                await Promise.all(barberIds.map(async (id) => {
                    const barber = await User.findById(id);
                    if (barber) {
                        barber.appointmentIds!.push(result._id);
                        await barber.save();
                    }
                }));
            }
            console.log("Appointment saved successfully.");
            res.status(200).json(result);
        } catch (error: any) {
            const err = new CustomError(error.message || 'Internal Server Error', error.status || 500, error.data);
            next(err);
        }
    }

    static async getAppointmentsByUserId(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.userId;
        try {
            const user = await User.findById(userId);
            const appointmentIds = user!.appointmentIds;
            const appointments = appointmentIds && appointmentIds.length > 0 ? await Appointment.find({ _id: { $in: appointmentIds } }) : [];
            res.status(200).json(appointments);
        } catch (error: any) {
            const err = new CustomError(error.message || 'Appointments not found.', error.status || 404, error.data);
            next(err);
        }
    }

    static async deleteAppointmentById(req: Request, res: Response, next: NextFunction) {
        const appointmentId = req.params.appointmentId;
        
        try {
            const appointment = await Appointment.findById(appointmentId);
            
            const userIds = [appointment?.customerId, ...(appointment?.barberIds || [])];

            await Promise.all(userIds.map(async (id) => {
                const user = await User.findById(id);
                if (user) {   
                    user.appointmentIds!.filter((id) => id.toString() !== appointmentId);
                    await user.save();
                }
            }));

            const result = await Appointment.deleteOne(new mongoose.Types.ObjectId(appointmentId));
            res.status(200).json({ message: 'Appointment deleted successfully,' });
        } catch (error: any) {
            const err = new CustomError(error.message || 'Appointments not deleted.', error.status || 404, error.data);
            next(err);
        }
    }
}

export default AppointmentsController;