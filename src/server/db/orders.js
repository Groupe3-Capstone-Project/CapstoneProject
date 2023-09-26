const client = require('./client');



async function createOrder({userId, status}) {
    try {
      // Use the PostgreSQL client to execute an INSERT query to create a new order.
      const { rows: [order] } = await client.query(`
        INSERT INTO orders("userId", status)
        VALUES ($1, $2)
        RETURNING *;
      `, [userId, status]);
  
      // Return the newly created order.
    //   console.log("db order:", userId);
      return order;
    } catch (error) {
      // Handle errors here (e.g., log the error or throw an exception).
      console.error('Error creating order:', error);
      throw error;
    }
  }
  
  module.exports = { createOrder };