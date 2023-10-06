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
    getCartByOrderId,
    getCartByUserId,
    getOrderProductByOrderId,
    updateOrder,
    updateOrderStatus,
    destroyOrder,
    getProductById
} = require('../db');

// Get all orders (Admin)
// GET /api/orders
ordersRouter.get('/', requireAdmin, async (req, res, next) => {
    try {
        const allOrders = await getAllOrders();
        res.status(200).json(allOrders)
    } catch ({ name, message }) {
        next({ name, message });
    }
});

// Post Item to cart / create order if none (User/Admin)
// POST /api/orders/add_to_cart
ordersRouter.post('/add_to_cart', requireUser, async (req, res, next) => {
    try {
        const userId = parseInt(req.user.id, 10); // Get the user's ID from req.user
        console.log("User id int?", userId)
        const { productId, quantity, price } = req.body;
        
        // Check if the user already has a cart (order)
        let userCart = await getCartByUserId(userId);
        console.log("userCart?:", userCart);
        
        // If the user doesn't have a cart, create a new order
        if (userCart === null) {
        const newOrder = await createOrder({ userId: userId, status: 'created' });
        console.log("newOrder?:", newOrder);
        // Use the newly created order for the user's cart
        userCart = await getCartByOrderId(newOrder.id);
        }
        
        if (!req.user.isAdmin && userCart.userId !== req.user.id) {
            return res.status(403).json({ message: 'Access denied, current user does not match cart user id, or is not admin'})
        }
        console.log("if cart: ",userCart)
        
        // Check if the product is already in the cart
        const existingCartItem = userCart.cart_items.find(item => item.productId === productId);

        console.log("Existing cartItem:", existingCartItem)
        if (existingCartItem !== undefined) {
            // Update the quantity and price of the existing cart item
            existingCartItem.quantity += 1;
            existingCartItem.price += price;
            console.log("userCart quantity:", quantity);
            await updateOrderProduct(existingCartItem.id, existingCartItem.quantity, existingCartItem.price);
        } else {
            // Add the product as a new cart item
            console.log("else cart: ",userCart)
            await addProductToOrder({orderId: userCart.orderId, productId, quantity: 1, price});
            // userCart.push({ productId, quantity, price }); // Add to the user's cart array
        }
        const updatedCart = await getCartByUserId(userId);
        console.log("do I got a cart:", updatedCart);
        res.status(200).json({ 
            message: 'Product added to cart successfully',
            userCart: updatedCart });
    } catch ({ name, message }) {
      next({ name, message });
    }
});


// Get cart by userId (User)
// GET /api/orders/cart/:userId
ordersRouter.get('/cart/:userId', requireUser, async (req, res, next) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        // console.log("get cart params id:", userId);
        const cartOrder = await getCartByUserId(userId);
        // console.log("cartOrder:", cartOrder);
        if (!cartOrder) {
            return res.status(404).json({ message: 'User cart not found' });
        }
        if (!req.user.isAdmin && cartOrder.userId !== req.user.id) {
            return res.status(403).json({ message: 'Access denied, current user does not match cart user id, or is not admin'})
        }
        // console.log("response:", cartOrder);
        res.status(200).json(cartOrder);
    }catch ({name, message}) {
        next({name, message});
    }
});

// Get order by userId (Admin)
// GET /api/order/user/:userId
ordersRouter.get('/user/:userId', requireAdmin, async (req, res, next) =>{
    try {
        const userId = req.params.userId
        const order = await getOrderByUserId(userId);
        if (order.length === 0) {
            return res.status(404).json({
                message: `'Order(s) for user ${userId}  not found'`,
            });
        }
        // console.log("order:", order)
        res.status(200).json(order)
    } catch ({ name, message }) {
        next({ name, message });
    }
});

// Get order by userId (Admin)
// GET /api/orders/:userId
ordersRouter.get('/:orderId', requireAdmin, async (req, res, next) =>{
    try {
        const order = await getOrderByUserId(req.params.orderId);
        if (order.length === 0) {
            return res.status(404).json({
                message: 'Order not found',
            });
        }
        res.status(200).json(order)
    } catch ({ name, message }) {
        next({ name, message });
    }
});

// Patch order by orderId (Admin)
// PATCH /api/orders/:orderId
ordersRouter.patch('/:orderId', requireAdmin, async (req, res, next) => {
    try {
        const orderId = parseInt(req.params.orderId, 10);
        const { userId, orderDate, status } = req.body;
        const orderToUpdate = await getOrderById(orderId);
        // console.log("to update:", orderToUpdate)
        if (!orderToUpdate) {
            return res.status(400).json({
                message: `Order Product id${orderId} not found!`
            })
        }
        const updatedOrder = await updateOrder(orderId, userId, orderDate, status)
        res.status(200).json({
            message:` updated order ${orderId} :`, 
            updatedOrder: updatedOrder});
    } catch ({name, message}) {
        next({name, message});
    }
});

// Patch order by orderId to make status 'completed' (User/Admin)
// PATCH /api/orders/:orderId/completed
ordersRouter.patch('/:orderId/completed', requireUser, async (req, res, next) => {
    try {
        const orderId = parseInt(req.params.orderId);
        const toBeCompleted = await getOrderById(orderId);
        // console.log("to update:", toBeCompleted);
        if (toBeCompleted === null) {
            return res.status(404).json({
                message: 'Order not found',
            });
        }
        if (toBeCompleted.status === 'cancelled') {
            return res.status(400).json({ message: 'Order is already cancelled' });
        }
        if (toBeCompleted.status === 'completed') {
            return res.status(400).json({ message: 'Order is already completed' });
        }
        if (!req.user.isAdmin && toBeCompleted.userId !== req.user.id) {
            return res.status(403).json({ message: 'Access denied, current user does not match order user id, or is not admin'})
        }
        const completedOrder = await updateOrderStatus(orderId, 'completed'); 
        res.status(200).json({
            message:`Completed order ${orderId}:`,
            completedOrder: completedOrder
        });
    } catch ({name, message}) {
        next({name, message});
    }
});

// Delete order by orderId to make status 'cancelled' (User/Admin)
// DELETE /api/orders/:orderId/cancelled
ordersRouter.delete('/:orderId/cancelled', requireUser, async (req, res, next) => {
    try {
        const orderId = parseInt(req.params.orderId);
        const toBeDeleted = await getOrderById(orderId);
        // console.log("to update:", toBeDeleted);
        if (toBeDeleted === null) {
            return res.status(404).json({
                message: 'Order not found',
            });
        }
        if (toBeDeleted.status === 'cancelled') {
            return res.status(400).json({ message: 'Order is already cancelled' });
        }
        if (toBeDeleted.status === 'completed') {
            return res.status(400).json({ message: 'Order is already completed' });
        }
        if (!req.user.isAdmin && toBeDeleted.userId !== req.user.id) {
            return res.status(403).json({ message: 'Access denied, current user does not match order user id, or is not admin'})
        }
        const deletedOrder = await updateOrderStatus(orderId, 'cancelled'); 
        res.status(200).json({
            message:`Cancelled order ${orderId} and it's appended orderProducts:`,
            deletedOrder: deletedOrder
        });
    } catch ({name, message}) {
        next({name, message});
    }
});

module.exports = ordersRouter;

// ordersRouter.delete('/:orderId', requireAdmin, async (req, res, next) => {
//     try {
//         const orderId = req.params.orderId;
//         const deletedOrder = await destroyOrder(orderId); 
//         res.status(200).json({message:`deleted order ${orderId} and it's appended orderProducts:`, deletedOrder});
//     } catch ({name, message}) {
//         next({name, message});
//     }
// });


// ordersRouter.get('/cart/:userId', requireUser, async (req, res, next) => {
//     try {
//         const userId = req.params.userId;
//         const cartOrder = await getCartByUserId(userId);
//         const cartItems = await getOrderProductByOrderId(cartOrder[0].order_id);
        
//         if (cartOrder.length === 0) {
//             return res.status(404).json({ message: 'User cart not found' });
//         }

//         if (!req.user.isAdmin && cartOrder[0].userId !== req.user.id) {
//             return res.status(403).json({ message: 'Access denied, current user does not match cart user id'})
//         }
//         const response = {
//             user_id: cartOrder[0].user_id,
//             order_id: cartOrder[0].order_id,
//             status: cartOrder[0].status,
//             cart_items: cartItems
//         };
//         res.status(200).json(response);
//         console.log("response:", response)
//     }catch (error) {
//         next(error);
//     }
// });

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