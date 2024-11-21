export const validateRequestFields = (requiredFields) => (req, res, next) => {
    const errors = [];

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