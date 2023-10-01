const express = require("express");
const ordersRouter = express.Router();
const { requireUser, requireAdmin } = require('./utils');
const {
    createOrder,
    getAllOrders,
    getOrderById,
    addProductToOrder,
    getOrderByUserId,
    updateOrderProduct,
    getCartByUserId,
    getOrderProductByOrderId,
    destroyOrder
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
        
        
        const userId = req.user.id; // Get the user's ID from req.user
        const { productId, quantity, price } = req.body;
        
        // Check if the user already has a cart (order)
        let userCart = await getCartByUserId(userId);
        
        if (!req.user.isAdmin && userCart[0].user_id !== req.user.id) {
            return res.status(403).json({ message: 'Access denied, current user does not match cart user id'})
        }
        // If the user doesn't have a cart, create a new order
        if (!userCart) {
        const newOrder = await createOrder({userId, status: 'created' });
        // Use the newly created order for the user's cart
        userCart = [newOrder];
        }
  
        // Check if the product is already in the cart
        const existingCartItem = userCart[0].find(item => item.product_Id === productId);
        console.log(existingCartItem)
        if (existingCartItem) {
            // Update the quantity and price of the existing cart item
            existingCartItem.quantity += quantity;
            existingCartItem.price += price;
            await updateOrderProduct(existingCartItem.id, quantity, price)
        } else {
            // Add the product as a new cart item
            await addProductToOrder(userCart[0].id, productId, quantity, price);
            userCart.push({ productId, quantity, price }); // Add to the user's cart array
        }

        res.status(200).json({ 
            message: 'Product added to cart successfully',
            userCart: userCart });
    } catch (error) {
      next(error);
    }
});

ordersRouter.get('/cart/:userId', requireUser, async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const cartOrder = await getCartByUserId(userId);
        const cartItems = await getOrderProductByOrderId(cartOrder[0].order_id);
        
        if (cartOrder.length === 0) {
            return res.status(404).json({ message: 'User cart not found' });
        }

        if (!req.user.isAdmin && cartOrder[0].userId !== req.user.id) {
            return res.status(403).json({ message: 'Access denied, current user does not match cart user id'})
        }
        const response = {
            user_id: cartOrder[0].user_id,
            order_id: cartOrder[0].order_id,
            status: cartOrder[0].status,
            cart_items: cartItems
        };
        res.status(200).json(response);
        console.log("response:", response)
    }catch (error) {
        next(error);
    }
});

// ordersRouter.get('/cart/:userId', requireUser, async (req, res, next) => {
//     try {
//         const userCart = await getCartByUserId(req.params.userId);
        
//         if (!userCart) {
//             return res.status(404).json({ message: 'User cart not found' });
//         }

//         if (!req.user.isAdmin && userCart[0].user_id !== req.user.id) {
//             return res.status(403).json({ message: 'Access denied, current user does not match cart user id'})
//         }
        
//         res.status(200).json( userCart );
//         console.log(userCart)
//     }catch (error) {
//         next(error);
//     }
// });

ordersRouter.get('/user/:userId', requireAdmin, async (req, res, next) =>{
    try {
        const userId = req.params.userId
        const order = await getOrderByUserId(userId);
        if (order.length === 0) {
            return res.status(404).json({
                message: `'Order(s) for user ${userId}  not found'`,
            });
        }
        console.log("order:", order)
        res.status(200).json(order)
    } catch (error) {
        next(error);
    }
});

ordersRouter.get('/:orderId', requireAdmin, async (req, res, next) =>{
    try {
        const order = await getOrderByUserId(req.params.orderId);
        if (order.length === 0) {
            return res.status(404).json({
                message: 'Order not found',
            });
        }
        res.status(200).json(order)
    } catch (error) {
        next(error);
    }
});

ordersRouter.delete('/:orderId', requireAdmin, async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const deletedOrder = await destroyOrder(orderId); 
        res.status(200).json({message:`deleted order ${orderId} and it's appended orderProducts:`, deletedOrder});
    } catch ({name, message}) {
        next({name, message});
    }
});









 




module.exports = ordersRouter;