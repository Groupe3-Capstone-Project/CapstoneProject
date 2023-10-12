const client = require("./client");
const bcrypt = require("bcrypt");
const { dbFields } = require("./utils");
const SALT_COUNT = 10;

// Create a new user / register
async function createUser({
  name,
  email,
  address,
  username,
  password,
  imgUrl,
  isAdmin,
  isActive,
}) {
  try {
    // Insure default imgUrl value is place holder if none provided, and not null
    if (!imgUrl) {
      imgUrl =
        "https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-default-male-avatar-png-image_2811083.jpg";
    }
    // Insure default isAdmin value is false if none provided, and not null
    if (!isAdmin) {
      isAdmin = false;
    }
    // Insure default value of isActive is true, incase none provided
    if (!isActive) {
      isActive = true;
    }
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users(name, email, address, username, password, "imgUrl", "isAdmin", "isActive")
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            ON CONFLICT (username) DO NOTHING
            RETURNING *`,
      [
        name,
        email,
        address,
        username,
        hashedPassword,
        imgUrl,
        isAdmin,
        isActive,
      ]
    );
    delete user.password;
    return user;
  } catch (error) {
    console.error("Problem creating user into db", error);
  }
}

// Get all users
async function getAllUsers() {
  try {
    const { rows: users } = await client.query(`
        SELECT * FROM users; 
        `);
    users.forEach((user) => {
      delete user.password;
    });
    return users;
  } catch (error) {
    console.error("Couldn't get all users:", error);
  }
}

// Get user / login
async function getUser({ username, password }) {
  try {
    if (!username || !password) {
      throw new Error("Both username and password are required.");
    }
    const user = await getUserByUsername(username);
    if (!user) {
      throw new Error("User not found.");
    }
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordsMatch) {
      throw new Error("Incorrect password.");
    }
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

// Get user from userId
async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT *
            FROM users
            WHERE id = $1;
        `,
      [id]
    );
    delete user.password;
    return user;
  } catch (error) {
    console.error("Couldn't get User by Id:", error);
  }
}

// Get user from username
async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT *
            FROM users
            WHERE username = $1;
        `,
      [username]
    );
    if (!user) {
      return null;
    }
    // delete user.password
    return user;
  } catch (error) {
    console.error("Couldn't get user by username", error);
  }
}

// Get user fron email
const getUserByEmail = async (email) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT * 
            FROM users
            WHERE email = $1;
        `,
      [email]
    );
    if (!user) {
      return;
    }
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
};

// Update user from id with it's fields
async function updateUser(id, fields) {
  try {
    const toUpdate = {};

    for (let column in fields) {
      if (fields[column] !== undefined) {
        toUpdate[column] = fields[column];
      }
    }
    // console.log("toUpdate:", toUpdate)
    // console.log("id is:", id)
    if (toUpdate.hasOwnProperty("username")) {
      // Check if the new username already exists in the database, return early if it's the case
      const existingUser = await getUserByUsername(toUpdate.username);
      // console.log("Existing user:", existingUser)
      if (existingUser) {
        // Check if the existing username belongs to the same user
        if (existingUser.id === id) {
          console.log("Same user re-entering the same username.");
        } else {
          // A different user already has this username
          throw new Error("Username already exists.");
        }
      }
    }
    let user;
    if (dbFields(toUpdate).insert.length > 0) {
      const { rows } = await client.query(
        `
                UPDATE users
                SET ${dbFields(toUpdate).insert}
                WHERE id=${id}
                RETURNING *;
            `,
        Object.values(toUpdate)
      );
      user = rows[0];
    }
    // console.log("Updated user correctly:", user);
    delete user.password;
    return user;
  } catch (error) {
    console.error("DB can't update user:", error);
    throw error;
  }
}

// Destroy User
async function destroyUser(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            UPDATE users
            SET "isActive" = false
            WHERE id = $1
            RETURNING *;
        `,
      [id]
    );
    delete user.password;
    return user;
  } catch (error) {
    console.error("Problem destroying user", error);
  }
}

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserByUsername,
  updateUser,
  destroyUser,
};
// async function updateUser(id, fields) {
//     try {
//         const toUpdate = {};
//         const queryValues = [id];

//         for(let column in fields) {
//           if(fields[column] !== undefined) {
//             toUpdate[column] = fields[column];
//             queryValues.push(fields[column]);
//           }
//         }

//         if (toUpdate.hasOwnProperty('username')) {
//             // Check if the new username already exists in the database, return early if it's the case
//             const existingUser = await getUserByUsername(toUpdate.username);
//             if (existingUser && existingUser.id !== id) {
//               throw new Error('Username already exists.');
//             }
//         }

//         let user;
//         if (Object.keys(toUpdate).length > 0) {
//             const setClauses = Object.keys(toUpdate)
//         .map((column, index) => `"${column}" = $${index + 2}`)
//         .join(', ');

//             const queryString = `
//             UPDATE users
//             SET ${setClauses}
//             WHERE id = $1
//             RETURNING *;
//           `;

//           // Log the generated query and values for debugging
//           console.log('Generated Query:', queryString);
//           console.log('Query Values:', queryValues);

//           const { rows } = await client.query(queryString, queryValues);
//           user = rows[0];
//         }
//         return user;
//     } catch (error) {
//         console.error("DB can't update user:", error);
//         throw error
//     }
// };
