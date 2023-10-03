const express = require("express");
const orderProductsRouter = express.Router();
const { requireUser, requireAdmin } = require('./utils');
const { getAllOrderProducts, getOrderProductByOrderId, getOrderProductById, destroyOrderProduct, updateOrderProduct } = require('../db');


orderProductsRouter.get('/', requireAdmin, async (req, res, next) => {
    try {
        const allOrderProducts = await getAllOrderProducts();
        res.status(200).json(allOrderProducts);
    } catch (error) {
        next(error);
    }
});

orderProductsRouter.patch('/:orderProductId', requireAdmin, async (req, res, next) => {
    try {
        const orderProductId = req.params.orderProductId;
        const orderProductToUpdate = await getOrderProductByOrderId(orderProductId);

        if (!orderProductToUpdate) {
            return res.status(404).json({
                message: "orderProduct not found!"
            });
        }

        const { quantity, price } = req.body;

        const updatedOrderProduct = await updateOrderProduct(orderProductId, quantity, price);
        res.status(200).json({
            message: "Order product patched successfully",
            updatedOrderProduct: updatedOrderProduct
        });

    } catch ({ name, message }) {
        next({ name, message });
    }
})

orderProductsRouter.delete('/:orderProductId', requireUser, async (req, res, next) => {
    try {
        const orderProductId = req.params.orderProductId;
        deletedOrderProduct = await destroyOrderProduct(orderProductId)
    } catch ({ name, message }) {
        next({ name, message });
    }
})


















module.exports = orderProductsRouter