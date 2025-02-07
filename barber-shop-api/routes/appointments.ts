import express from 'express';
import AppointmentsController from '../controllers/appointments';
import { body } from 'express-validator';
import isAuth from '../middlewares/is-auth';

const router = express.Router();

router.get('/appointments/user/:userId', isAuth, AppointmentsController.getAppointmentsByUserId);

router.post('/appointments', isAuth, AppointmentsController.saveAppointment);

router.put('/appointments/:appointmentId', isAuth, AppointmentsController.updateAppointment);

router.delete('/appointments/:appointmentId', isAuth, AppointmentsController.deleteAppointmentById);

export default router;