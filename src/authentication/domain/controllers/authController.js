import { createUser, findUser } from '../../data/repositories/authRepository.js';
import { hashPassword, isPasswordValid } from '../useCases/hashPasswordUseCase.js';
import { createToken } from '../useCases/createTokenUseCase.js';
import logger from '../../../../utils/logger.js';

export const postRegister = async (req, res, next) => {
    const { email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    
    // I need an interface to depend on so domain doesn't depend on data. Typescript?
    try {
        const user = createUser(email, hashedPassword);
        const token = createToken(user._id);

        res.status(201).json({
            user: {
                id: user._id,
                email: email,
            },
            token: token
        });
    } catch (error) {
        // TODO: put the error codes somewhere else as constants
        if (error.code === 11000) {
            res.status(400).json({
                error: 'Email already in use. Please choose a different email address'
            });
        } else {
            logger.error(error);
            res.status(500).json({
                error: 'Something went wrong'
            });
        }
    }
};

export const postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await findUser(email);

    if (!user) {
        return res.status(404).json({
            error: 'User not found'
        });
    }

    try {
        const passwordMatched = await isPasswordValid(user.password, password);
        
        if (!passwordMatched) {
            return res.status(401).json({
                error: 'Incorrect password'
            });
        }

        const token = createToken(user._id);
        res.json({
            user: {
                id: user._id,
                email: email,
            },
            token: token
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            error: 'Something went wrong'
        });
    }
};