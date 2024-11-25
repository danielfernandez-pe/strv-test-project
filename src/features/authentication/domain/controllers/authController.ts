import AuthRepository from '../../data/repositories/authRepository';
import { UserType } from '../../data/models/user';
import { hashPassword, isPasswordValid } from '../useCases/managePasswordUseCase';
import { createToken } from '../useCases/manageTokenUseCase';
import { authErrors } from '../errors/authErrors';
import CustomError from '../../../../utils/customError';

export default class AuthController {
    authRepository: AuthRepository

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository
    }

    async postRegister(email: string, password: string): Promise<{ user: UserType, token: string}> {
        const hashedPassword = await hashPassword(password);
        const user = await this.authRepository.createUser(email, hashedPassword);
        const token = createToken(user._id);
        return { user, token };
    }

    async postLogin(email: string, password: string): Promise<{ user: UserType, token: string}> {
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