const express = require("express");
const usersRouter = express.Router();
const { createOrder } = require("../db");
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");

const {
  createUser,
  getUser,
  getAllUsers,
  getUserByEmail,
  getUserByUsername,
  getUserById,
  updateUser,
  destroyUser,
  getCartByUserId,
  updateOrderStatus,
} = require("../db");
const { requireUser, requireAdmin, requiredNotSent } = require("./utils");

// Get all users (Admin)
// GET /api/users
usersRouter.get("/", requireAdmin, async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send({
      users,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// Post login User
// POST /api/users/login
usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and a password",
    });
  }
  try {
    const user = await getUser({ username, password });
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
      res.status(200).json({
        message: "Login successful!",
        token: token,
        user: user,
      });
    } else {
      res.status(401).json({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// Post register new user
// POST api/users/register
usersRouter.post("/register", async (req, res, next) => {
  const {
    name,
    email,
    address,
    username,
    password,
    imgUrl,
    isAdmin,
    isActive,
  } = req.body;
  console.log("creating user with admin rights");
  console.log(isAdmin);
  try {
    const _user = await getUserByUsername(username);
    if (_user) {
      res.status(400).json({
        name: "UserExistsError",
        message: "A user with that email already exists",
      });
    }
    const user = await createUser({
      name,
      email,
      address,
      username,
      password,
      imgUrl,
      isAdmin,
      isActive,
    });
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );
    const order = await createOrder({
      userId: user.id,
      status: "created", // You can customize this as needed
    });
    res.status(201).json({
      message: "Sign up successful!",
      token: token,
      user: user,
      order: order,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// Get user by it's username for register function, error free if not found
// GET /api/users/check/:username
usersRouter.get("/check/:username", async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await getUserByUsername(username);

    if (user) {
      // Send the user's information without the password
      delete user.password;
      res.send({
        user,
      });
    } else {
        res.status(200).send({message: "username good to go"})
    }
  } catch (error) {
    next(error);
  }
});

// Get user by it's username
// GET /api/users/:username
usersRouter.get("/:username", async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await getUserByUsername(username);

    if (user) {
      // Send the user's information without the password
      delete user.password;
      res.send({
        user,
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
});

// Patch user by userId (User/Admin) needs at least one param
// PATCH /api/users/:userId
usersRouter.patch(
  "/:userId",
  requireUser,
  requiredNotSent({
    requiredParams: [
      "name",
      "email",
      "address",
      "username",
      "imgurl",
      "isAdmin",
      "isActive",
    ],
    atLeastOne: true,
  }),
  async (req, res, next) => {
    try {
      // The second argument specifies the radix (base 10).
      const userId = parseInt(req.params.userId, 10);
      const userToUpdate = await getUserById(userId);
      if (!userToUpdate) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      // console.log('req.user.isAdmin:', req.user.isAdmin);
      // console.log('userToUpdate.id:', req.params.userId);
      if (!req.user.isAdmin && userToUpdate.id !== req.user.id) {
        return res.status(403).json({
          message:
            "Access denied. You can only update your own user profile or you must be an admin to update others.",
        });
      }
      const { name, email, address, username, imgUrl, isAdmin, isActive } =
        req.body;
      const fieldsToUpdate = {
        name,
        email,
        address,
        username,
        imgUrl,
        isAdmin,
        isActive,
      };
      const updatedUser = await updateUser(userId, fieldsToUpdate);
      res.status(200).json({
        message: "User succesfully updated:",
        user: updatedUser,
      });
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

// Delete user by userId (Admin)
// DELETE /api/users/:userId
usersRouter.delete("/:userId", requireAdmin, async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).send({
        name: "UserNotFoundError",
        message: `User with ID ${userId} not found.`,
      });
    }
    if (req.user.id === userId) {
      return res.status(403).send({
        name: "CantDeleteYourselfError",
        message: "You can't delete your own account!",
      });
    }
    const deletedUser = await destroyUser(userId);
    let userCart = await getCartByUserId(userId);
    let deletedOrder = null;
    if (userCart) {
      deletedOrder = await updateOrderStatus(userCart.orderId, "cancelled");
      console.log("cancel order del us:", deletedOrder);
    }
    res.status(200).json({
      message: `User with id ${userId} successfully deactivated and cancelled user order`,
      user: deletedUser,
      cancelled_order: deletedOrder || null,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;
