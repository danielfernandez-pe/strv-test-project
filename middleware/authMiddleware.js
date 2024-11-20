import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    const extractedToken = token.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            error: 'Access denied'
        });
    }

    try {
        const decoded = jwt.verify(extractedToken, 'daniel');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            error: 'Invalid token'
        });
    }
};