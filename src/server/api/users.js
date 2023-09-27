const express = require('express')
const usersRouter = express.Router();
const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken')

const {
    createUser,
    getUser,
    getAllUsers,
    getUserByEmail,
    getUserByUsername
} = require('../db');


usersRouter.get('/', async( req, res, next) => {
    try {
        const users = await getAllUsers();

        res.send({
            users
        });
    } catch ({name, message}) {
        next({name, message})
    }
});

usersRouter.post('/login', async(req, res, next) => {
    const { username, password } = req.body;
    if(!username || !password) {
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply both an email and password'
        });
    }
    try {
        const user = await getUser({username, password});
        if(user) {
            const token = jwt.sign({
                id: user.id,
                username: user.username
            }, JWT_SECRET, {
                expiresIn: '1w'
            });

            res.status(200).json({
                message: 'Login successful!',
                token: token,
                user: user
            });
        }
        else {
            res.status(401).json({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect'
            });
        }
    } catch(error) {
        next(error);
    }
});

usersRouter.post('/register', async(req, res, next) => {
    const { name, email, address, username, password, imgUrl, isAdmin } = req.body;

    try {
        const _user = await getUserByUsername(username);

        if(_user) {
            res.status(400).json({
                name: 'UserExistsError',
                message: 'A user with that email already exists'
            });
        }

        const user = await createUser({
            name,
            email,
            address,
            username,
            password,
            imgUrl,
            isAdmin
        });

        const token = jwt.sign({
            id: user.id,
            username: user.username
        }, JWT_SECRET, {
            expiresIn: '1w'
        });

        res.status(201).json({
            message: 'Sign up successful!',
            token: token,
            user: user
        });
    } catch({name, message}) {
        next({name, message})
    }
})

module.exports = usersRouter;