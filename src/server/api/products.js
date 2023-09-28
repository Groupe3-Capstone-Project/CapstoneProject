const express = require("express");
productsRouter = express.Router();
const { requireAdmin } = require('./utils');
const { getAllProducts, getProductById } = require('../db/products');

productsRouter.get('/', async (req, res, next) => {
    try {
      const allProducts = await getAllProducts();
  
      res.send(allProducts);
    } catch ({ name, message }) {
      next({ name, message });
    }
});

productsRouter.get('/:productId', async (req, res, next) => {
    try {
        const product = await getProductById(req.params.productId);
        res.send(product)
    } catch (error) {
        console.error("Failed to get product:", error);
    }
});



  module.exports = productsRouter;