import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';

export const postRegister = async (req, res, next) => {
    const { email, password } = req.body;
    const hashedPassword = await argon2.hash(password);
    
    try {
        const user = new User({
            email: email,
            password: hashedPassword
        });
        await user.save();
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h'});

        res.status(201).json({
            user: {
                id: user._id,
                email: email,
            },
            token: token
        });
    } catch (error) {
        console.log(error);
    }
};

export const postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (!user) {
        return res.status(404).json({
            error: 'User not found'
        });
    }

    try {
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            return res.status(401).json({
                error: 'Incorrect password'
            });
        }

        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h'});
        res.json({
            user: {
                id: user._id,
                email: email,
            },
            token: token
        });
    } catch (error) {
        console.log(error);
    }
};