import AuthRepositoryType from '../repositories/authRepositoryType';
import CustomError from '../../../../utils/customError';
import { UserDOM } from '../models/userDOM';
import { hashPassword, isPasswordValid } from '../useCases/managePasswordUseCase';
import { createToken } from '../useCases/manageTokenUseCase';
import { authErrors } from '../errors/authErrors';

export interface AuthControllerType {
    postRegister(email: string, password: string): Promise<{ user: UserDOM, token: string}>
    postLogin(email: string, password: string): Promise<{ user: UserDOM, token: string}>
}

export class AuthController implements AuthControllerType {
    authRepository: AuthRepositoryType

    constructor(authRepository: AuthRepositoryType) {
        this.authRepository = authRepository
    }

    async postRegister(email: string, password: string): Promise<{ user: UserDOM, token: string}> {
        const hashedPassword = await hashPassword(password);
        const user = await this.authRepository.createUser(email, hashedPassword);
        const token = createToken(user._id);
        return { user, token };
    }

    async postLogin(email: string, password: string): Promise<{ user: UserDOM, token: string}> {
        const user = await this.authRepository.findUser(email);

        if (!user) {
            const error = new CustomError(authErrors.USER_NOT_FOUND);
            throw error;
        }

        const passwordMatched = await isPasswordValid(user.password, password);
        if (!passwordMatched) {
            const error = new CustomError(authErrors.INCORRECT_PASSWORD);
            throw error;
        }

        const token = createToken(user._id);
        return { user, token };
    }
}