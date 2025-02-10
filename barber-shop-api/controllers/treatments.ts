import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/custom-error";
import Treatment from "../models/treatment";

class TreatmentsController {

    static async getTreatments(req: Request, res: Response, next: NextFunction) { 
        try {
            const treatments = await Treatment.find();
            res.status(200).json(treatments);
        } catch (error: any) {
            const err = new CustomError(error.message || 'Failed to fetch treatments.', error.status || 404, error.data);
            next(err);
        }
    };

}

export default TreatmentsController;