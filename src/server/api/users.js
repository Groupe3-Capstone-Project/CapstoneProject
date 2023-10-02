const express = require('express')
const usersRouter = express.Router();
const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken')

const {
    createUser,
    getUser,
    getAllUsers,
    getUserByEmail,
    getUserByUsername,
    getUserById,
    updateUser,
    destroyUser
} = require('../db');
const { requireUser, requireAdmin, requiredNotSent } = require('./utils');


usersRouter.get('/', requireAdmin, async( req, res, next) => {
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
            message: 'Please supply both a username and a password'
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
            name, email, address, username, password, imgUrl, isAdmin });

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
});

usersRouter.patch('/:userId', requireUser, requiredNotSent({requiredParams: ['name', 'email', 'address', 'username', 'imgurl', 'isAdmin'], atLeastOne: true}), async (req, res, next) => {
    try {
        const userToUpdate = await  getUserById(req.params.userId);
        if (!userToUpdate) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        console.log('req.user.isAdmin:', req.user.isAdmin);
        console.log('userToUpdate.id:', userToUpdate.id);

        if (!req.user.isAdmin && userToUpdate.id !== req.user.id) {
            return res.status(403).json({
                message: 'Access denied. You can only update your own user profile or you must be an admin to update others.',
            });
        }

        const { name, email, address, imgUrl, isAdmin } = req.body;
        const fieldsToUpdate = { name, email, address, imgUrl, isAdmin };
        const updatedUser = await updateUser(req.params.userId, fieldsToUpdate)
        res.status(200).json({
            message: "User succesfully updated:",
            user: updatedUser});

    } catch (error) {
        next("Problem updating user:" , error);
    }
});

usersRouter.delete('/:userId', requireAdmin, async (req, res, next) => {
    try {
        const deletedUser = await destroyUser(req.params.userId);
        res.status(200).json({
            message: "User successfully deleted:",
            user: deletedUser})
    } catch (error) {
        next(error);
    }
});

module.exports = usersRouter;