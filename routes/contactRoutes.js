import express from 'express';
import * as contactController from '../controllers/contactController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add-contact', verifyToken, contactController.postAddContact);

export default router;