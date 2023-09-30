const express = require("express");
const ordersRouter = express.Router();
const { requireUser, requireAdmin } = require('./utils');
const {
    createOrder,
    getAllOrders,
    getOrderById,
    addProductToOrder,
    getCartByUserId
} = require('../db');


ordersRouter.get('/', requireAdmin, async (req, res, next) => {
    try {
        const allOrders = await getAllOrders();
        res.status(200).json(allOrders)
    } catch (error) {
        next(error);
    }
});

ordersRouter.post('/add_to_cart', requireUser, async (req, res, next) => {
    try {
        const { id: userId } = req.user; // Get the user's ID from req.user
        const { productId, quantity, price } = req.body;
  
        // Check if the user already has a cart (order)
        let userCart = await getCartByUserId(userId);
  
        // If the user doesn't have a cart, create a new order
        if (!userCart) {
        const newOrder = await createOrder({userId, status: 'created' });
        // Use the newly created order for the user's cart
        userCart = newOrder;
        }
  
        // Add the product to the user's cart (order)
        await addProductToOrder(userCart.id, productId, quantity, price);
  
        res.status(200).json({ 
            message: 'Product added to cart successfully',
            userCart: userCart });
    } catch (error) {
      next(error);
    }
});

ordersRouter.get('/cart/:userId', requireUser, async (req, res, next) => {
    try {
        const userCart = await getCartByUserId(req.params.userId);
        
        if (!userCart) {
            return res.status(404).json({ message: 'User cart not found' });
        }

        if (!req.user.isAdmin && userCart[0].user_id !== req.user.id) {
            return res.status(403).json({ message: 'Access denied, current user does not match cart user id'})
        }
        
        res.status(200).json( userCart );
        console.log(userCart[0].user_id)
    }catch (error) {
        next(error);
    }
});

ordersRouter.get('/:orderId', requireAdmin, async (req, res, next) =>{
    try {
        const order = await getOrderByUserId(req.params.orderId);
        if (!order) {
            return res.status(404).json({
                message: 'Order not found',
            });
        }
        res.status(200).json(order)
    } catch (error) {
        next(error);
    }
});





















module.exports = ordersRouter;