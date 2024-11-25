import argon2 from 'argon2';

export const hashPassword = async (password: string): Promise<string> => {
    return await argon2.hash(password);
};

export const isPasswordValid = async (hashedPassword: string, password: string): Promise<boolean> => {
    return await argon2.verify(hashedPassword, password);
};