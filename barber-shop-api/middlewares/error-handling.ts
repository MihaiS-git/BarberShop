import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/custom-error';
import logger from '../utils/logger';

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email || 'Not Provided';
    const ip = req.headers['x-forwarded-for'] || req.ip || 'Unknown IP';

    logger.error({
        message: err.message,
        status: err.status,
        stack: err.stack,
        data: err.data,
        email,
        ip
    });

    res.status(err.status || 500).json({ message: err.message, data: err.data });
};

export default errorHandler;
