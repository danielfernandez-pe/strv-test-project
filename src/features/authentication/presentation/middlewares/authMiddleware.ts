import { Request, Response, NextFunction } from 'express';
import logger from '../../../../utils/logger';
import { verifyToken } from '../../domain/useCases/manageTokenUseCase';
import { clientResponses } from '../strings/clientResponses';

export const verifyRequest = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            error: clientResponses.ACCESS_DENIED
        });
    }

    const extractedToken = token.split(' ')[1];

    try {
        const decoded = verifyToken(extractedToken);
        res.locals.userId = decoded.userId;
        next();
    } catch (error) {
        logger.error(error);
        res.status(401).json({
            error: clientResponses.ACCESS_DENIED
        });
    }
};