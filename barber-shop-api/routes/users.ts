import express from 'express';
import UsersController from '../controllers/users';

const router = express.Router();

router.get('/barbers', UsersController.getBarbers);

export default router;