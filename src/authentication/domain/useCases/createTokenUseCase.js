import jwt from 'jsonwebtoken';

export const createToken = (id) => {
    return jwt.sign({ userId: id }, process.env.JWT_KEY, { expiresIn: '1h'});
};