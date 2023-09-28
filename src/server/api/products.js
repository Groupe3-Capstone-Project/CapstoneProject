const express = require("express");
productsRouter = express.Router();
const { requireAdmin } = require('./utils');
const { getAllProducts, getProductById, destroyProduct, createProduct } = require('../db/products');

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
        next("Failed to get product:", error);
    }
});

productsRouter.post('/', requireAdmin, async (req, res, next) => {
    const {
    title, artist, description, period, medium, price,year, dimensions, imgUrl } = req.body;
    try {
        const createdProduct = await createProduct({
            title, artist, description, period, medium, price,year, dimensions, imgUrl
        });
        res.send(createdProduct);
    } catch (error) {
        next("Couldn't post product:", error);
    }
});

productsRouter.delete('/:productId', requireAdmin, async (req, res, next) => {
    try {
        const deletedProduct = await destroyProduct(req.params.productId);
        res.send(deletedProduct);
    } catch (error) {
        next("Couldn't delete product:", error);
    }
});



  module.exports = productsRouter;