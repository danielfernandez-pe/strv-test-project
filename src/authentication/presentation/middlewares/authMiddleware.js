import jwt from 'jsonwebtoken';
import logger from '../../../../utils/logger.js';

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    const extractedToken = token.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            error: 'Access denied'
        });
    }

    try {
        const decoded = jwt.verify(extractedToken, process.env.JWT_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        logger.error(error);
        res.status(401).json({
            error: 'Invalid token'
        });
    }
};