const { client } = require('./client');


async function createProduct({ title, artist, description, period, medium, price, year, dimensions, imgUrl }) {
    try {
        const { rows: [product] } = await client.query(`
        INSERT INTO products(title, artist, description, period, medium, price, year, dimensions, imgUrl)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
        `, [title, artist, description, period, medium, price, year, dimensions, imgUrl]);
        return (product)
    } catch (error) {
        console.error("Problem creating product into db", error);
    }
};

module.exports = {
    client,
    createProduct,
}