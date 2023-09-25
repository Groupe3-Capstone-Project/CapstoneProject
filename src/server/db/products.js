const client = require('./client');


async function getAllProduct() {
    try {
        const { rows: products } = await client.query(`
        SELECT * FROM products;
        `);
        return products
    } catch (error) {
        console.error("Problem retrieving products from db", error);
    }
}

async function getProductById(id) {
    try {
        const { rows: [product] } = await client.query(`
        SELECT * FROM products
        WHERE id = $1;
        `, [id]);
        return product;
    } catch (error) {
        console.error("Problem getting product by id", error);
    }
}

async function createProduct({ 
    title, 
    artist, 
    description, 
    period, 
    medium, 
    price, 
    year, 
    dimensions, 
    imgUrl 
}) {
    try {
        const { rows: [product] } = await client.query(`
        INSERT INTO products(title, artist, description, period, medium, price, year, dimensions, "imgUrl")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
        `, [title, artist, description, period, medium, price, year, dimensions, imgUrl]);
        
        if (product) {
            return product;
        } else {
            console.error("Product not created");
            return null;
        }
    } catch (error) {
        console.error("Problem creating product into db", error);
    }
};

async function destroyProduct(id) {
    try {
        const { rows: [product] } = await client.query(`
        DELETE FROM order_products
        USING products
        WHERE products.id = order_products."productId"
        AND products.id = $1;
        DELETE FROM products
        WHERE products.id = $1
        RETURNING *;
        `, [id]);
        return product;
    } catch (error) {
        console.error("Problem destroying product", error);
    }
}

module.exports = {
    client,
    getAllProduct,
    getProductById,
    createProduct,
    destroyProduct,
}