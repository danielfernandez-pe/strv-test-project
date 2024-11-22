import express from 'express';
import * as contactController from '../../domain/controllers/contactController.js';
import { verifyRequest } from '../../../authentication/presentation/middlewares/authMiddleware.js';
import { validateRequestFields } from '../middlewares/contactValidatorMiddleware.js';
import { contactErrors } from '../../domain/errors/contactErrors.js';
import logger from '../../../../utils/logger.js';

const router = express.Router();

router.post(
    '/contacts', 
    validateRequestFields(['name', 'lastName', 'phone', 'address']),
    verifyRequest,
    async (req, res) => {
        const { name, lastName, phone, address } = req.body;
        try {
            const contactId = await contactController.postContact(req.userId, name, lastName, phone, address);
            res.status(201).json({
                message: 'Contact added!',
                contactId: contactId 
            });
        } catch (error) {
            if (error.code === contactErrors.CONTACT_ALREADY_EXISTS) {
                res.status(400).json({ 
                    message: 'Contact already exists. Use PUT Http method to update contact' 
                });
            }

            logger.error(error);
            res.status(500).json({ 
                message: 'Failed to add contact' 
            });
        }
    }
);

router.put(
    '/contacts/:contactId',
    validateRequestFields(['phone', 'address']),
    verifyRequest,
    async (req, res) => {
        const { contactId } = req.params;
        const { phone, address } = req.body;
        
        try {
            await contactController.putContact(req.userId, contactId, phone, address);

            res.status(200).json({
                message: 'Contact updated!',
                contactId: contactId
            });
        } catch (error) {
            if (error.code === contactErrors.CONTACT_NOT_FOUND) {
                return res.status(404).json({ 
                    message: 'Contact not found' 
                });
            }

            logger.error(error);
            res.status(500).json({ 
                message: 'Failed to update contact' 
            });
        }
    }
);

router.delete(
    '/contacts/:contactId',
    verifyRequest,
    async (req, res) => {
        const { contactId } = req.params;
        try {
            await contactController.deleteContact(req.userId, contactId);

            res.status(200).json({
                message: 'Contact deleted!',
                contactId: contactId
            });
        } catch (error) {
            if (error.code === contactErrors.CONTACT_NOT_FOUND) {
                return res.status(404).json({ 
                    message: 'Contact not found' 
                });
            }

            logger.error(error);
            res.status(500).json({ 
                message: 'Failed to delete contact' 
            });
        }
    }
);

export default router;