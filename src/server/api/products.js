const express = require("express");
productsRouter = express.Router();
const { requireAdmin } = require('./utils');
const { getAllProducts } = require('../db/products');

productsRouter.get("/", async (req, res, next) => {
    try {
      const allProducts = await getAllProducts();
  
      res.send(allProducts);
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  module.exports = productsRouter;