import { Request, Response, NextFunction } from 'express';

export const validateRequestFields = (requiredFields: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = [];

    requiredFields.forEach(field => {
        if (!req.body[field]) {
            errors.push(`${field} is required`);
        }
    });

    if (errors.length > 0) {
        return res.status(400).json({
            message: 'Missing field',
            errors: errors
        });
    }

    next();
};