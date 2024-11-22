import express from 'express';
import * as authController from '../../domain/controllers/authController.js';
import { authErrors } from '../../domain/errors/authErrors.js';

const router = express.Router();

router.post('/auth/signUp',async  (req, res) => {
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
                error: 'Email already in use. Please choose a different email address'
            });
        } else {
            logger.error(error);
            res.status(500).json({
                error: 'Something went wrong'
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
                error: 'User not found'
            });
        }

        if (error.code === authErrors.INCORRECT_PASSWORD) {
            return res.status(401).json({
                error: 'Incorrect password'
            });
        }

        logger.error(error);
        res.status(500).json({
            error: 'Something went wrong'
        });
    }
});

export default router;