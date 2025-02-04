import { NextFunction, Router } from "express";
import { body } from 'express-validator';

import User from '../models/user';

import AuthController from '../controllers/auth';

const router = Router();

router.put("/signup",
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, { req }) => {
                console.log("Request body: ", req.body);

                return User.findOne({ email: value })
                    .then(userDoc => {
                        if (userDoc) {
                            return Promise.reject('E-Mail address already exists');
                        }
                    });
            })
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({ min: 5 }),
        body('name')
            .trim()
            .not()
            .isEmpty()
    ],
    AuthController.signup);

router.post('/login',
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.'),
        body('password')
            .trim()
            .isLength({ min: 5 })
    ],
    AuthController.login);

router.post('/reset', AuthController.resetPassword);

export default router;