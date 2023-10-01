const express = require("express");
const orderProductsRouter = express.Router();
const { requireUser, requireAdmin } = require('./utils');
const { getAllOrderProducts, getOrderProductByOrderId, destroyOrderProduct } = require('../db');


orderProductsRouter.get('/', requireAdmin, async (req, res, next) =>{
    try {
        const allOrderProducts = await getAllOrderProducts();
        res.status(200).json(allOrderProducts);
    } catch (error) {
        next(error);
    }
});

orderProductsRouter.delete('/:orderProductId', requireUser, async (req, res, next) => {
    try {
        const orderProductId = req.params.orderProductId;
        deletedOrderProduct = await destroyOrderProduct(orderProductId)
    } catch ({ name, message }) {
        next({ name, message });
    }
})


















module.exports = orderProductsRouter