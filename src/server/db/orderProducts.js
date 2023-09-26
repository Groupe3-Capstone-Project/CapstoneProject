const client = require('./client'); // Import your PostgreSQL client

async function createOrderProduct({
    orderId, 
    productId, 
    price,
    quantity 
}) {
  try {
    // Use the PostgreSQL client to execute an INSERT query to create a new order product record.
    const { rows: [order_product] } = await client.query(`
      INSERT INTO order_products("orderId", "productId", price, quantity)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [orderId, productId, price, quantity]);

    // Return the newly created order product.
    return order_product;
  } catch (error) {
    // Handle errors here (e.g., log the error or throw an exception).
    console.error('Error creating order product:', error);
    throw error;
  }
}

module.exports = { createOrderProduct };