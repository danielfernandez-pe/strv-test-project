
import express, { Request, Response, NextFunction } from 'express';
import ContactController from '../../domain/controllers/contactController';
import { validateRequestFields } from '../middlewares/contactValidatorMiddleware';
import { verifyRequest } from '../../../authentication/presentation/middlewares/authMiddleware';
import { contactErrors } from '../../domain/errors/contactErrors';
import { clientResponses } from '../strings/clientResponses';
import CustomError from '../../../../utils/customError';
import logger from '../../../../utils/logger';

export default class ContactRoutes {
    public router = express.Router();
    contactController: ContactController;

    constructor(contactController: ContactController) {
        this.contactController = contactController
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            '/contacts',
            validateRequestFields(['name', 'lastName', 'phone', 'address']),
            verifyRequest,
            (req: Request, res: Response, next: NextFunction) => this.createContact(req, res, next)
        );

        this.router.put(
            '/contacts/:contactId',
            validateRequestFields(['phone', 'address']),
            verifyRequest,
            (req: Request, res: Response, next: NextFunction) => this.updateContact(req, res, next)
        );

        this.router.delete(
            '/contacts/:contactId',
            verifyRequest,
            (req: Request, res: Response, next: NextFunction) => this.deleteContact(req, res, next)
        );
    }

    private async createContact(req: Request, res: Response, next: NextFunction) {
        const { name, lastName, phone, address } = req.body;
        try {
            const contactId = await this.contactController.postContact(res.locals.userId, name, lastName, phone, address);
            res.status(201).json({
                message: clientResponses.CONTACT_CREATE_SUCCESS,
                contactId: contactId 
            });
        } catch (error) {
            // if (error.code === contactErrors.CONTACT_ALREADY_EXISTS) {
            //     res.status(400).json({ 
            //         message: clientResponses.CONTACT_CREATE_ERROR_ALREADY_EXISTS
            //     });
            // }

            logger.error(error);
            res.status(500).json({ 
                message: clientResponses.CONTACT_CREATE_ERROR_GENERIC
            });
        }
    }

    private async updateContact(req: Request, res: Response, next: NextFunction) {
        const { contactId } = req.params;
        const { phone, address } = req.body;

        try {
            await this.contactController.putContact(res.locals.userId, contactId, phone, address);

            res.status(200).json({
                message: clientResponses.CONTACT_UPDATE_SUCCESS,
                contactId: contactId
            });
        } catch (error) {
            // if (error.code === contactErrors.CONTACT_NOT_FOUND) {
            //     return res.status(404).json({ 
            //         message: clientResponses.CONTACT_NOT_FOUND
            //     });
            // }

            logger.error(error);
            res.status(500).json({ 
                message: clientResponses.CONTACT_UPDATE_ERROR_GENERIC
            });
        }
    }

    private async deleteContact(req: Request, res: Response, next: NextFunction) {
        const { contactId } = req.params;
        try {
            await this.contactController.deleteContact(res.locals.userId, contactId);

            res.status(200).json({
                message: clientResponses.CONTACT_DELETE_SUCCESS,
                contactId: contactId
            });
        } catch (error) {
            // if (error.code === contactErrors.CONTACT_NOT_FOUND) {
            //     return res.status(404).json({ 
            //         message: clientResponses.CONTACT_NOT_FOUND
            //     });
            // }

            logger.error(error);
            res.status(500).json({ 
                message: clientResponses.CONTACT_DELETE_ERROR_GENERIC
            });
        }
    }
}