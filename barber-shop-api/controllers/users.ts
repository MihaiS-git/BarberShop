import { Request, Response, NextFunction } from "express";
import User from '../models/user';
import CustomError from "../utils/custom-error";
import mongoose from "mongoose";

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

    static async getAccount(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.userId;

        try {
            const account = await User.findById(userId);
            if (!account) {
                throw new CustomError("Account not found.", 404);
            }
            res.status(200).json(account);
        } catch (error: any) {
            const err = new CustomError(error.message || 'Account not found.', error.status || 500, error.data);
            next(err);
        }
    }

    static async updateAccount(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.userId;
        const updateUser = req.body;
        
        try {
            const result = await User.findByIdAndUpdate(userId, updateUser, {new: true});
            console.log("RESULT: ", result);
            
            if (!result) {
                throw new CustomError("Account not found.", 404);
            }
            res.status(200).json(result);
        } catch (error: any) {
            const err = new CustomError(error.message || 'Account not found.', error.status || 500, error.data);
            next(err);
        }
    }
}

export default UsersController;