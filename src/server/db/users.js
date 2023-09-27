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
        // Insure default imgUrl value is place holder if none provided, and not null
        if (!imgUrl) {
            imgUrl = 'https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-default-male-avatar-png-image_2811083.jpg';
        }
        // Insure default isAdmin value is false if none provided, and not null
        if (!isAdmin) {
            isAdmin = false;
        } 
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

async function getAllUsers() {
    try {
        const { rows: users } = await client.query(`
        SELECT * FROM users; 
        `);
        return users;
    } catch (error) {
        console.error("Couldn't get all users:", error);
    }
}

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

async function getUserById(id) {
    try {
        const { rows: [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE id = $1;
        `, [id]);
        return user
    } catch (error) {
        console.error("Couldn't get User by Id:", error);
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
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByUsername,
};