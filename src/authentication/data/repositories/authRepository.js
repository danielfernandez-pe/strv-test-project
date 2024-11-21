import User from '../models/user.js';

export const createUser = async (email, password) => {
    const user = new User({
        email: email,
        password: password
    });
    await user.save();
    return user;
};

export const findUser = async (email) => {
    return await User.findOne({ email })
};