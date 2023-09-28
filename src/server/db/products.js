const client = require('./client');


async function getAllProducts() {
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
    title, artist, description, period, medium, price, year, dimensions, imgUrl }) {
    try {
        // Insure placeholder img is attributed if none provided by user
        if (!imgUrl) {
            imgUrl = 'https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-default-male-avatar-png-image_2811083.jpg';
        }
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
        await client.query(`
        DELETE FROM order_products
        WHERE "productId" = $1;
    `, [id]);

    
    const { rows: [product] } = await client.query(`
        DELETE FROM products
        WHERE id = $1
        RETURNING *;
    `, [id]);
        return product;
    } catch (error) {
        console.error("Problem destroying product", error);
    }
}

module.exports = {
    client,
    getAllProducts,
    getProductById,
    createProduct,
    destroyProduct,
}