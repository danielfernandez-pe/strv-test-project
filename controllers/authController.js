import User from '../models/user.js';

export const postRegister = async (req, res, next) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    
    try {
        await register(email, password);
        res.json({
            user: {
                id: 'something',
                email: email,
            },
            token: 'something here too'
        });
    } catch (error) {
        console.log(error);
    }
};

export const postLogin = (req, res, next) => {
    res.json({
        text: 'login WIP'
    });
};

async function register(email, password) {
    const user = new User({
        email: email,
        password: password
    });
    await user.save();
}