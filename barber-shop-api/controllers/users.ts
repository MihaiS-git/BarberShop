import { Request, Response, NextFunction } from "express";
import User from '../models/user';
import CustomError from "../utils/custom-error";

class UsersController {

    static async getBarbers(req: Request, res: Response, next: NextFunction) {
        try {
            const barbers = await User.find({ role: 'barber' });
            res.status(200).json(barbers);
        } catch (error: any) {
            const err = new CustomError(error.message || 'Barbers not found.', error.status || 404, error.data);
            next(err);
        }
    }
}

export default UsersController;