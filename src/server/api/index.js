const express = require('express');
const apiRouter = express.Router();
const { getUserById } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// const volleyball = require('volleyball')
// apiRouter.use(volleyball)

// TO BE COMPLETED - set `req.user` if possible, using token sent in the request header
apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  
  if (!auth) { 
    next();
  } 
  else if (auth.startsWith(prefix)) {
    // TODO - Get JUST the token out of 'auth'
    const token = auth.slice(prefix.length);
    
    try {
      const { id, isAdmin } = jwt.verify(token, JWT_SECRET);
      
      if (id) {
        req.user = await getUserById(id);
        next(); 
      }
      // TODO - Call 'jwt.verify()' to see if the token is valid. If it is, use it to get the user's 'id'. Look up the user with their 'id' and set 'req.user'
    } catch ({ name, message }) {
      next({ name, message });
    }
  } 
  else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with 'Bearer'`
    });
  }
});

// ROUTER: /api/users
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

// ROUTER: /api/products
const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

// ROUTER: /api/orders
const ordersRouter = require('./orders');
apiRouter.use('/orders', ordersRouter);

// ROUTER: /api/order_products
const orderProductsRouter = require('./order_products');
apiRouter.use('/order_products', orderProductsRouter)

apiRouter.use((err, req, res, next) => {
    res.status(500).send(err)
  })

module.exports = apiRouter;