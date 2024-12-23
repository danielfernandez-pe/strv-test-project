
import express, { Request, Response, NextFunction } from 'express';
import logger from '../../../../utils/logger';
import CustomError from '../../../../utils/customError';
import { ContactControllerType } from '../../domain/controllers/contactController';
import { validateRequestFields } from '../middlewares/contactValidatorMiddleware';
import { verifyRequest } from '../../../authentication/presentation/middlewares/authMiddleware';
import { contactErrors } from '../../domain/errors/contactErrors';
import { clientResponses } from '../strings/clientResponses';

export default class ContactRoutes {
    public router = express.Router();
    contactController: ContactControllerType;

    constructor(contactController: ContactControllerType) {
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
            logger.info(`User ${res.locals.userId} created contact successfully`);

            res.status(201).json({
                message: clientResponses.CONTACT_CREATE_SUCCESS,
                contactId: contactId 
            });
        } catch (error) {
            const customError = error as CustomError;
            if (customError.code === contactErrors.CONTACT_ALREADY_EXISTS) {
                logger.error(`User ${res.locals.userId} couldn't add contact because it already exists`);
                res.status(400).json({ 
                    message: clientResponses.CONTACT_CREATE_ERROR_ALREADY_EXISTS
                });
            }

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
            logger.info(`User ${res.locals.userId} updated contact successfully`);

            res.status(200).json({
                message: clientResponses.CONTACT_UPDATE_SUCCESS,
                contactId: contactId
            });
        } catch (error) {
            const customError = error as CustomError;
            if (customError.code === contactErrors.CONTACT_NOT_FOUND) {
                logger.error(`User ${res.locals.userId} couldn't update contact because is not in the database`);
                return res.status(404).json({ 
                    message: clientResponses.CONTACT_NOT_FOUND
                });
            }

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
            logger.info(`User ${res.locals.userId} deleted contact successfully`);

            res.status(200).json({
                message: clientResponses.CONTACT_DELETE_SUCCESS,
                contactId: contactId
            });
        } catch (error) {
            const customError = error as CustomError;
            if (customError.code === contactErrors.CONTACT_NOT_FOUND) {
                logger.error(`User ${res.locals.userId} couldn't update contact because is not in the database`);
                return res.status(404).json({ 
                    message: clientResponses.CONTACT_NOT_FOUND
                });
            }

            logger.error(error);
            res.status(500).json({ 
                message: clientResponses.CONTACT_DELETE_ERROR_GENERIC
            });
        }
    }
}