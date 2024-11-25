import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../domain/useCases/manageTokenUseCase';
import logger from '../../../../utils/logger';

export const verifyRequest = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            error: 'Access denied'
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
            error: 'Invalid token'
        });
    }
};