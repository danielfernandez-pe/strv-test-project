import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post('/auth/signUp', authController.postRegister);
router.post('/auth/login', authController.postLogin);

export default router;