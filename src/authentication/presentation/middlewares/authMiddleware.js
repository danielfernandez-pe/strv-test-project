import { verifyToken } from '../../domain/useCases/manageTokenUseCase.js';
import logger from '../../../../utils/logger.js';

export const verifyRequest = (req, res, next) => {
    const token = req.header('Authorization');
    const extractedToken = token.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            error: 'Access denied'
        });
    }

    try {
        const decoded = verifyToken(extractedToken);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        logger.error(error);
        res.status(401).json({
            error: 'Invalid token'
        });
    }
};