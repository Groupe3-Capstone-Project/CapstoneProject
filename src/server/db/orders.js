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
      console.log("db order:", userId);
      return order;
    } catch (error) {
      // Handle errors here (e.g., log the error or throw an exception).
      console.error('Error creating order:', error);
      throw error;
    }
};

async function getAllOrders() {
    try {
        const { rows: orders } = await client.query(`
            SELECT *
            FROM orders
        `)
        return orders
    } catch (error) {
        console.error("Couldn't get all orders:", error);
    }
};

async function getOrderById(id) {
    try {
        const { rows: [order] } = await client.query(`
            SELECT *
            FROM orders
            WHERE id = $1; 
        `, [id]);
        return order;
    } catch (error) {
        console.error("Couldn't get order by id:", error);
    }
};

async function getCartByUserId(id) {
    try {
        const { rows } = await client.query(`
        SELECT
            orders."userId" as user_id,
            orders.id AS order_id,
            products.id AS product_id,
            products.title,
            products.artist,
            order_products.quantity,
            order_products.price
        FROM 
            orders
        JOIN
            order_products ON orders.id = order_products."orderId"
        JOIN
            products ON order_products."productId" = products.id
        WHERE
            orders."userId" = $1
        AND 
            orders.status = 'created'
        `, [id]);
        if (rows.length === 0) {
            return null; // Return null if no cart is found
        }
        return rows 
    } catch (error) {
        console.error("Could get order by userId:", error);
        throw error;
    }
};

module.exports = { 
    createOrder,
    getAllOrders,
    getOrderById,
    getCartByUserId
};


// async function getCartByUserId(id) {
//     try {
//         const query = `
//             SELECT * FROM orders
//             WHERE "userId" = $1 AND status = 'created';
//         `;

//         const { rows: [order] } = await client.query(query, [id]);
//         console.log('SQL Query:', query);
//         console.log('User Cart:', order);

//         if (!order) {
//             return null; // Return null if no cart is found
//         }
//         return order;
//     } catch (error) {
//         console.error("Error getting user cart by userId:", error);
//         throw error;
//     }
// }

// async function getCartByUserId(id) {
//     try {
//         const { rows: [order] } = await client.query(`
//         SELECT * FROM orders
//         WHERE "userId" = $1 AND status = 'created';
//         `, [id]);
//         console.log('User Cart:', order);
//         if (!order) {
//             return null; // Return null if no cart is found
//         }
//         return order;
//     } catch (error) {
//         console.error("Could get order by userId:", error);
//         throw error;
//     }
// };
  