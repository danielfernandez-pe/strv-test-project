import argon2 from 'argon2';

export const hashPassword = async (password) => {
    return await argon2.hash(password);
};

export const isPasswordValid = async (hashedPassword, password) => {
    return await argon2.verify(hashedPassword, password);
};