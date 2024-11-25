import { User } from '../models/user';
import UserDOM from '../../domain/models/userDOM';
import AuthRepositoryType from '../../domain/repositories/authRepositoryType';

export default class AuthRepository implements AuthRepositoryType {
    async createUser(email: string, password: string): Promise<UserDOM> {
        const user = new User({
            email: email,
            password: password
        })

        await user.save();
        return user;
    }

    async findUser(email: string): Promise<UserDOM | null> {
        return await User.findOne({ email })
    }
}