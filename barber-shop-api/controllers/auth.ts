import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import User, { IUser } from '../models/user';
import { Role } from '../models/role';
import CustomError from '../utils/custom-error';

import { sendResetPasswordEmail } from '../utils/email';

class AuthController {

    static async signup(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new CustomError('Validation failed.', 422, errors.array());
            return next(error);
        }
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const role = Role.CUSTOMER;
        
        const dobString = req.body.dob;
        const [day, month, year] = dobString.split('/').map(Number);
        const dob = new Date(Date.UTC(year, month-1, day, 0,0,0));

        try {
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ email, password: hashedPassword, name, role, dob });
            const result: IUser = await user.save();
            res.status(200).json({ message: 'User created!', userId: result._id });
        } catch (error: any) {
            const err = new CustomError(error.message || 'Internal Server Error', error.status || 500, error.data);
            next(err);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new CustomError('Login failed.', 422, errors.array());
            next(error);
        }
        const email = req.body.email;
        const password = req.body.password;
        let loadedUser: IUser;
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                const error = new CustomError('User not found', 404);
                return next(error);
            }
            loadedUser = user!;
            const isEqual = await bcrypt.compare(password, user!.password);
            if (!isEqual) {
                const error = new CustomError('Wrong password', 401);
                return next(error);
            }
            const token = jwt.sign({
                email: loadedUser!.email,
                userId: loadedUser._id!.toString(),
                role: loadedUser.role
            },
                'secret',
                { expiresIn: '1h' }
            );
            res.status(200).json({ userId: loadedUser._id!.toString(), jwtToken: token, role: loadedUser.role });
        } catch (error: any) {
            const err = new CustomError(error.message || 'Internal server error', error.status || 500, error.data)
            return next(err);
        }
    }

    static async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return next(new CustomError('User not found.', 404));
            }

            const buffer = await new Promise<Buffer>((resolve, reject) => {
                crypto.randomBytes(32, (err, buffer) => {
                    if (err) reject(err);
                    resolve(buffer);
                });
            });
            const token = buffer.toString('hex');

            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 3600000;
            await user.save();

            await sendResetPasswordEmail(email, token);
            res.status(200).json({ message: 'Password reset link sent to your email.' })
        } catch (error: any) {
            next(new CustomError(error.message || 'Internal server error. Could not sent resend reset password link by email. Please try again later.', error.status || 500, error.data));
        }
    }

}

export default AuthController;