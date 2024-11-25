import { User, UserType } from '../models/user';

export default class AuthRepository {
    async createUser(email: string, password: string): Promise<UserType> {
        const user = new User({
            email: email,
            password: password
        })

        await user.save();
        return user;
    }

    async findUser(email: string): Promise<UserType | null> {
        return await User.findOne({ email })
    }
}