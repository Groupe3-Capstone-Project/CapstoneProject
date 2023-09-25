const client = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

async function createUser({ 
    name, 
    email, 
    address, 
    username, 
    password,
    imgUrl,
    isAdmin,
}) {
    try {
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
        const { rows: [user] } = await client.query(`
        INSERT INTO users(name, email, address, username, password, "imgUrl", "isAdmin")
        VALUES($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (username) DO NOTHING
        RETURNING *`, 
        [name, email, address, username, hashedPassword, imgUrl, isAdmin]);

        return user;
    } catch (error) {
        console.error("Problem creating user into db", error);
    }
};

async function getUser({ username, password}) {
    if(!username || !password) {
        return;
    }
    try {
        const user = await getUserByUsername(username);
        if(!user) return;
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if(!passwordsMatch) return;
        delete user.password;
        return user;
    } catch (error) {
        throw error;
    }
}

async function getUserByUsername(username) {
    try {
        const { rows: [ user ] } = await client.query(`
        SELECT *
        FROM users
        WHERE username=$1
        `, [ username ]);
        return user; 
    } catch (error) {
        console.error("Couldn't get user by username", error)
    }
}

const getUserByEmail = async(email) => {
    try {
        const { rows: [ user ] } = await client.query(`
        SELECT * 
        FROM users
        WHERE email=$1;`, [ email ]);

        if(!user) {
            return;
        }
        return user;
    } catch (errot) {
        throw error;
    }
}

module.exports = {
    createUser,
    getUser,
    getUserByEmail,
    getUserByUsername,
};