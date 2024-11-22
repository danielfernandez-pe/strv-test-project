import express from 'express';
import * as authController from '../../domain/controllers/authController.js';
import { authErrors } from '../../domain/errors/authErrors.js';
import { clientResponses } from '../strings/clientResponses.js';

const router = express.Router();

router.post('/auth/signUp', async  (req, res) => {
    const { email, password } = req.body;

    try {
        const response = await authController.postRegister(email, password);

        res.status(201).json({
            user: {
                id: response.user._id,
                email: email,
            },
            token: response.token
        });
    } catch (error) {
        if (error.code === authErrors.EMAIL_IN_USE) {
            res.status(400).json({
                error: clientResponses.AUTH_EMAIL_ALREADY_EXISTS
            });
        } else {
            logger.error(error);
            res.status(500).json({
                error: clientResponses.ERROR_GENERIC
            });
        }
    }
});

router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const response = await authController.postLogin(email, password);
        res.json({
            user: {
                id: response.user._id,
                email: email,
            },
            token: response.token
        });
    } catch (error) {
        if (error.code === authErrors.USER_NOT_FOUND) {
            return res.status(404).json({
                error: clientResponses.ERROR_USER_NOT_FOUND
            });
        }

        if (error.code === authErrors.INCORRECT_PASSWORD) {
            return res.status(401).json({
                error: clientResponses.ERROR_INCORRECT_PASSWORD
            });
        }

        logger.error(error);
        res.status(500).json({
            error: clientResponses.ERROR_GENERIC
        });
    }
});

export default router;