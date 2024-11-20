import express from 'express';
import * as contactController from '../controllers/contactController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/contacts', verifyToken, contactController.postContact);
router.put('/contacts/:id', verifyToken, contactController.putContact);
router.delete('/contacts/:id', verifyToken, contactController.deleteContact);

export default router;