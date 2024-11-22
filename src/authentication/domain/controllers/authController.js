import { createUser, findUser } from '../../data/repositories/authRepository.js';
import { hashPassword, isPasswordValid } from '../useCases/managePasswordUseCase.js';
import { createToken } from '../useCases/manageTokenUseCase.js';
import { authErrors } from '../errors/authErrors.js';

export const postRegister = async (email, password) => {
    const hashedPassword = await hashPassword(password);
    
    // I need an interface to depend on so domain doesn't depend on data. Typescript?
    const user = await createUser(email, hashedPassword);
    const token = createToken(user._id);
    return { user, token };
};

export const postLogin = async (email, password) => {
    const user = await findUser(email);

    if (!user) {
        const error = new Error('User not found');
        error.code = authErrors.USER_NOT_FOUND;
        throw error;
    }

    const passwordMatched = await isPasswordValid(user.password, password);
    if (!passwordMatched) {
        const error = new Error('Incorrect password');
        error.code = authErrors.INCORRECT_PASSWORD;
        throw error;
    }

    const token = createToken(user._id);
    return { user, token };
};