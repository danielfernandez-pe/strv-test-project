import express, { Request, Response, NextFunction } from 'express';
import logger from '../../../../utils/logger';
import CustomError from '../../../../utils/customError';
import { authErrors } from '../../domain/errors/authErrors';
import { clientResponses } from '../strings/clientResponses';
import { AuthControllerType } from '../../domain/controllers/authController';

export default class AuthRoutes {
    public router = express.Router();
    authController: AuthControllerType;

    constructor(authController: AuthControllerType) {
        this.authController = authController;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            '/auth/signUp',
            (req: Request, res: Response, next: NextFunction) => this.signUp(req, res, next)
        );
        
        this.router.post(
            '/auth/login',
            (req: Request, res: Response, next: NextFunction) => this.login(req, res, next)
        );
    }

    private async signUp(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        try {
            const response = await this.authController.postRegister(email, password);
    
            res.status(201).json({
                user: {
                    id: response.user._id,
                    email: email,
                },
                token: response.token
            });
        } catch (error) {
            const customError = error as CustomError;
            if (customError.code === authErrors.EMAIL_IN_USE) {
                return res.status(400).json({
                    error: clientResponses.AUTH_EMAIL_ALREADY_EXISTS
                });
            }
            
            logger.error(error);
            res.status(500).json({
                error: clientResponses.ERROR_GENERIC
            });
        }
    }

    private async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
    
        try {
            const response = await this.authController.postLogin(email, password);
            res.json({
                user: {
                    id: response.user._id,
                    email: email,
                },
                token: response.token
            });
        } catch (error) {
            const customError = error as CustomError;
            if (customError.code === authErrors.USER_NOT_FOUND) {
                return res.status(404).json({
                    error: clientResponses.ERROR_USER_NOT_FOUND
                });
            }

            if (customError.code === authErrors.INCORRECT_PASSWORD) {
                return res.status(401).json({
                    error: clientResponses.ERROR_INCORRECT_PASSWORD
                });
            }

            logger.error(error);
            res.status(500).json({
                error: clientResponses.ERROR_GENERIC
            });
        }
    }
}