const express = require("express");
productsRouter = express.Router();
const { requireAdmin, requireUser, requiredNotSent } = require('./utils');
const { getAllProducts, getProductById, updateProduct, destroyProduct, createProduct } = require('../db/products');


// Get all products
// GET /api/products
productsRouter.get('/', async (req, res, next) => {
    try {
        const allProducts = await getAllProducts();
        res.send(allProducts);
    } catch ({ name, message }) {
        next({ name, message });
    }
});

// Get product by productId
// GET /api/products/:productId
productsRouter.get('/:productId', async (req, res, next) => {
    try {
        const product = await getProductById(req.params.productId);
        res.send(product)
    } catch ({ name, message }) {
        next({ name, message });
    }
});

// Post new product (Admin)
// POST /api/products
productsRouter.post('/', requireAdmin, async (req, res, next) => {
    const {
        title, artist, description, period, medium, price, year, dimensions, imgUrl } = req.body.post;
    try {
        const createdProduct = await createProduct({
            title, artist, description, period, medium, price, year, dimensions, imgUrl
        });
        res.send(createdProduct);
    } catch ({ name, message }) {
        next({ name, message });
    }
});

// Patch product by productId (Admin) needs at least one param
// PATCH /api/products/:productId
productsRouter.patch('/:productId', requireAdmin, requiredNotSent({ requiredParams: ['title', 'artist', 'description', 'period', 'medium', 'price', 'year', 'dimensions', 'imgUrl'], atLeastOne: true }), async (req, res, next) => {
    try {
        const productId = parseInt(req.params.productId, 10);
        // console.log("productId:", productId)
        const productToUpdate = await getProductById(productId);
        if (!productToUpdate) {
            return res.status(404).json({
                message: 'product not found',
            });
        }
        const { title, artist, description, period, medium, price, year, dimensions, imgUrl } = req.body;
        const fieldsToUpdate = { title, artist, description, period, medium, price, year, dimensions, imgUrl };
        const updatedProduct = await updateProduct(productId, fieldsToUpdate);
        // console.log("Updated Product",updatedProduct)
        res.status(200).json({
            message: "Product succesfully updated:",
            product: updatedProduct
        });
    } catch ({ name, message }) {
        next({ name, message });
    }
});

// Delete product by productId (Admin)
// DELETE /api/products/:productId
productsRouter.delete('/:productId', requireAdmin, async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const product = await getProductById(productId)
        if (!product) {
            return res.status(404).send({
                name: "ProductNotFoundError",
                message: `Product with ID ${productId} not found.`,
            });
        }
        const deletedProduct = await destroyProduct(req.params.productId);
        res.send(deletedProduct);
    } catch ({ name, message }) {
        next({ name, message });
    }
});



module.exports = productsRouter;