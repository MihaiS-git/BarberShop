import express from 'express';
import UsersController from '../controllers/users';
import isAuth from '../middlewares/is-auth';

const router = express.Router();

router.get('/barbers', UsersController.getBarbers);

router.get('/account/:userId', isAuth, UsersController.getAccount);

router.put('/account/:userId', isAuth, UsersController.updateAccount);

export default router;