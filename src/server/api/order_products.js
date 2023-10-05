const express = require("express");
const orderProductsRouter = express.Router();
const { requireUser, requireAdmin } = require('./utils');
const { getAllOrderProducts, getOrderProductByOrderId, getOrderProductById, destroyOrderProduct, updateOrderProduct } = require('../db');


orderProductsRouter.get('/', requireAdmin, async (req, res, next) => {
    try {
        const allOrderProducts = await getAllOrderProducts();
        res.status(200).json(allOrderProducts);
    } catch ({ name, message }) {
        next({ name, message });
    }
});

orderProductsRouter.patch('/:orderProductId', requireAdmin, async (req, res, next) => {
    try {
        const orderProductId = parseInt(req.params.orderProductId, 10);
        console.log("orderProductId :", orderProductId)
        const orderProductToUpdate = await getOrderProductById(orderProductId);
        console.log("to update", orderProductToUpdate)

        if (orderProductToUpdate === null) {
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
});

orderProductsRouter.delete('/:orderProductId', requireUser, async (req, res, next) => {
    try {
        const orderProductId = parseInt(req.params.orderProductId, 10);
        console.log("OrderP id:", orderProductId);
        const orderProductToDelete = await getOrderProductById(orderProductId);
        console.log("OrderP to delete", orderProductToDelete)

        if (orderProductToDelete === null) {
            return res.status(404).json({
                message: "orderProduct not found!"
            });
        }

        const deletedOrderProduct = await destroyOrderProduct(orderProductId);
        res.status(200).json({
            message: `Deleted orderPorduct id ${orderProductId}`,
            orderProduct: deletedOrderProduct
        });

    } catch ({ name, message }) {
        next({ name, message });
    }
});






module.exports = orderProductsRouter