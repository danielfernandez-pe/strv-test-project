import express from 'express';
import * as contactController from '../../domain/controllers/contactController.js';
import { verifyToken } from '../../../authentication/presentation/middlewares/authMiddleware.js';
import { validateRequestFields } from '../middlewares/contactValidatorMiddleware.js'

const router = express.Router();

router.post('/contacts', validateRequestFields(['name', 'lastName', 'phone', 'address']), verifyToken, contactController.postContact);
router.put('/contacts/:contactId', validateRequestFields(['phone', 'address']), verifyToken, contactController.putContact);
router.delete('/contacts/:contactId', verifyToken, contactController.deleteContact);

export default router;