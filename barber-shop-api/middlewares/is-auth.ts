import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/custom-error";
import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
}

interface AuthRequest extends Request {
    user?: JwtPayload;
}

const isAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        throw new CustomError("Authorization header missing.", 401);
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        throw new CustomError("Token not provided.", 401);
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.user = decodedToken;
        next();
    } catch (err: any) {
        throw new CustomError("Invalid token.", 401, err.message);
    }
}

export default isAuth;