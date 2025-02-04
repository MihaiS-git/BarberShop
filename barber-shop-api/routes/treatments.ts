import express from "express";
import TreatmentsController from "../controllers/treatments";

const router = express.Router();

router.get('/treatments', TreatmentsController.getTreatments);

export default router;