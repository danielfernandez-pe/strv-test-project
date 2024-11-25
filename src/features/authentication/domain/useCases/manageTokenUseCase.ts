import jwt, { JwtPayload } from 'jsonwebtoken';

interface JwtPayloadWithUserId extends JwtPayload {
    userId: string;
  }

export const createToken = (id: string): string => {
    const jwtKey = process.env.JWT_KEY;

    if (!jwtKey) {
        throw new Error('JWT_KEY not defined');
    }

    return jwt.sign({ userId: id }, jwtKey, { expiresIn: '1h'});
};

export const verifyToken = (token: string): JwtPayloadWithUserId => {
    const jwtKey = process.env.JWT_KEY;

    if (!jwtKey) {
        throw new Error('JWT_KEY not defined');
    }

    return jwt.verify(token, jwtKey) as JwtPayloadWithUserId;
}