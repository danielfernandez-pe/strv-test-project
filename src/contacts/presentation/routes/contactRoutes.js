import express from 'express';
import * as contactController from '../../domain/controllers/contactController.js';
import { verifyRequest } from '../../../authentication/presentation/middlewares/authMiddleware.js';
import { validateRequestFields } from '../middlewares/contactValidatorMiddleware.js'

const router = express.Router();

router.post('/contacts', validateRequestFields(['name', 'lastName', 'phone', 'address']), verifyRequest, contactController.postContact);
router.put('/contacts/:contactId', validateRequestFields(['phone', 'address']), verifyRequest, contactController.putContact);
router.delete('/contacts/:contactId', verifyRequest, contactController.deleteContact);

export default router;