const express = require("express");
productsRouter = express.Router();
const { requireAdmin, requireUser, requiredNotSent } = require('./utils');
const { getAllProducts, getProductById,
    getProductByTitle, updateProduct, destroyProduct, createProduct } = require('../db/products');


// Get all products
//Admin sees all products isActive and !isActive, reg user sees only isActive products
// GET /api/products
productsRouter.get('/', async (req, res, next) => {
    try {
        const isAdmin = req.user && req.user.isAdmin;
        const allProducts = await getAllProducts();
        if (!allProducts) {
            res.status(404).json({
                message: "Problem getting allProducts"
            });
        }
        const filteredProducts = isAdmin
            ? allProducts // Admin sees all products
            : allProducts.filter(allProduct => allProduct.isActive); // Regular user sees only active products
        res.status(200).json(filteredProducts);
    } catch ({ name, message }) {
        next({ name, message });
    }
});

// Get product by productId
//Admin sees all products isActive and !isActive, reg user sees only isActive products
// GET /api/products/:productId
productsRouter.get('/:productId', async (req, res, next) => {
    try {
        const isAdmin = req.user && req.user.isAdmin;
        const productId = parseInt(req.params.productId, 10);
        const product = await getProductById(productId);
        if (!product) {
            res.status(404).json({
                message: `Problem getting product with id${productId}`
            });
        } else if (!isAdmin && !product.isActive) {
            // If the user is not an admin and the product is not active, return a 404
            res.status(404).json({
                message: `Product with id ${productId} not found`
            });
        } else {
            // Return the product if it exists and meets the criteria
            res.status(200).json(product);
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});

// Post new product (Admin)
// POST /api/products
productsRouter.post('/', requireAdmin, async (req, res, next) => {
    const {
        title, artist, description, period, medium, price, year, dimensions, imgUrl, isActive } = req.body;
    try {
        const existingProduct = await getProductByTitle(title);
        if (existingProduct) {
            return res.status(409).json({ 
                message: 'A product with the same title already exists' 
            });
        }
        const createdProduct = await createProduct({
            title, artist, description, period, medium, price, year, dimensions, imgUrl, isActive
        });
        res.send(createdProduct);
    } catch ({ name, message }) {
        next({ name, message });
    }
});

// Patch product by productId (Admin) needs at least one param
// PATCH /api/products/:productId
productsRouter.patch('/:productId', requireAdmin, requiredNotSent({ requiredParams: ['title', 'artist', 'description', 'period', 'medium', 'price', 'year', 'dimensions', 'imgUrl', 'isActive'], atLeastOne: true }), async (req, res, next) => {
    try {
        const productId = parseInt(req.params.productId, 10);
        // console.log("productId:", productId)
        const productToUpdate = await getProductById(productId);
        if (!productToUpdate) {
            return res.status(404).json({
                message: 'product not found',
            });
        }
        const { title, artist, description, period, medium, price, year, dimensions, imgUrl, isActive } = req.body;
        const fieldsToUpdate = { title, artist, description, period, medium, price, year, dimensions, imgUrl, isActive };
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

// Delete product by productId by changing it's isActive to false (Admin)
// DELETE /api/products/:productId
productsRouter.delete('/:productId', requireAdmin, async (req, res, next) => {
    try {
        const productId = parseInt(req.params.productId, 10);
        const product = await getProductById(productId)
        if (!product) {
            return res.status(404).send({
                name: "ProductNotFoundError",
                message: `Product with ID ${productId} not found.`,
            });
        }
        const deletedProduct = await destroyProduct(productId, false);
        res.status(200).json({
            message: `Product with id ${productId} was successfully made inactive`,
            deletedProduct: deletedProduct});
    } catch ({ name, message }) {
        next({ name, message });
    }
});


module.exports = productsRouter;