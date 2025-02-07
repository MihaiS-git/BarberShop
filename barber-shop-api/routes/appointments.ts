import express from 'express';
import AppointmentsController from '../controllers/appointments';
import { body } from 'express-validator';
import isAuth from '../middlewares/is-auth';

const router = express.Router();

router.post('/appointments', isAuth, AppointmentsController.saveAppointment);

export default router;