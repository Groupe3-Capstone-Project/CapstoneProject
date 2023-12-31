const client = require("./client");

// Create new order
async function createOrder({ userId, status }) {
  try {
    // console.log("Createorder id:", userId);
    // Use the PostgreSQL client to execute an INSERT query to create a new order.
    const {
      rows: [order],
    } = await client.query(
      `
            INSERT INTO orders("userId", status)
            VALUES ($1, $2)
            RETURNING *;
        `,
      [userId, status]
    );
    // Return the newly created order.
    //   console.log("db order:", userId);
    return order;
  } catch (error) {
    // Handle errors here (e.g., log the error or throw an exception).
    console.error("Error creating order:", error);
    throw error;
  }
}

// Get all orders
async function getAllOrders() {
  try {
    const { rows: orders } = await client.query(`
            SELECT *
            FROM orders
        `);
    return orders;
  } catch (error) {
    console.error("Couldn't get all orders:", error);
  }
}

// Get order by orderId
async function getOrderById(id) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
            SELECT *
            FROM orders
            WHERE id = $1; 
        `,
      [id]
    );
    if (!order) {
      return null;
    }
    return order;
  } catch (error) {
    console.error("Couldn't get order by id:", error);
  }
}

// Get order by userId
async function getOrderByUserId(id) {
  try {
    const { rows: order } = await client.query(
      `
            SELECT *
            FROM orders
            WHERE "userId" = $1; 
        `,
      [id]
    );
    if (!order) {
      return null;
    }
    return order;
  } catch (error) {
    console.error("Couldn't get order by id:", error);
  }
}

// Get cart from orderId
async function getCartByOrderId(orderId) {
  try {
    // console.log("getCart order:", orderId);
    const { rows } = await client.query(
      `
        SELECT
            orders."userId" as user_id,
            users.username,
            orders.id AS order_id,
            orders.status,
            order_products.id AS cart_item_id,
            order_products."productId",
            order_products.quantity,
            order_products.price,
            products.title AS product_title,
            products."imgUrl" AS product_img
        FROM 
            orders
        LEFT JOIN
            users ON orders."userId" = users.id    
        LEFT JOIN
            order_products ON orders.id = order_products."orderId"
        LEFT JOIN
            products ON order_products."productId" = products.id
        WHERE
            orders.id = $1
        AND 
            orders.status = 'created'
        `,
      [orderId]
    );
    if (rows.length === 0) {
      return null; // Return null if no cart order with status 'created' is found
    }
    const result = {
      userId: rows[0].user_id,
      username: rows[0].username,
      orderId: rows[0].order_id,
      status: rows[0].status,
      cart_items: [],
    };
    rows.forEach((row) => {
      if (row.cart_item_id) {
        result.cart_items.push({
          id: row.cart_item_id,
          orderId: row.order_id,
          productId: row.productId,
          product_title: row.product_title,
          product_img: row.product_img,
          quantity: row.quantity,
          price: row.price,
        });
      }
    });
    // console.log("Fired from getCartByUserId:", result)
    return result;
  } catch (error) {
    console.error("Could not get cart order by userId:", error);
    throw error;
  }
}

// Get cart from userId
async function getCartByUserId(userId) {
  try {
    // console.log("getCart id:", userId);
    const { rows } = await client.query(
      `
        SELECT
            orders."userId" as user_id,
            users.username,
            orders.id AS order_id,
            orders.status,
            order_products.id AS cart_item_id,
            order_products."productId",
            order_products.quantity,
            order_products.price,
            products.title AS product_title,
            products."imgUrl" AS product_img
        FROM
            orders
        LEFT JOIN
            users ON orders."userId" = users.id    
        LEFT JOIN
            order_products ON orders.id = order_products."orderId"
        LEFT JOIN
            products ON order_products."productId" = products.id
        WHERE
            orders."userId" = $1
        AND 
            orders.status = 'created'
        `,
      [userId]
    );
    if (rows.length === 0) {
      return null; // Return null if no cart order with status 'created' is found
    }
    const result = {
      userId: rows[0].user_id,
      username: rows[0].username,
      orderId: rows[0].order_id,
      status: rows[0].status,
      cart_items: [],
    };
    rows.forEach((row) => {
      if (row.cart_item_id) {
        result.cart_items.push({
          id: row.cart_item_id,
          orderId: row.order_id,
          productId: row.productId,
          product_title: row.product_title,
          product_img: row.product_img,
          quantity: row.quantity,
          price: row.price,
        });
      }
    });
    // console.log("Fired from getCartByUserId:", result)
    return result;
  } catch (error) {
    console.error("Could not get cart order by userId:", error);
    throw error;
  }
}

// Update order
async function updateOrder(id, userId, orderDate, status) {
  try {
    console.log("DB update:", status);
    const {
      rows: [order],
    } = await client.query(
      `
        UPDATE orders
        SET "userId" = $2, "orderDate" = $3, status = $4
        WHERE id = $1
        RETURNING *; 
        `,
      [id, userId, orderDate, status]
    );

    if (!order) {
      return null;
    }

    return order;
  } catch (error) {
    console.error(`DB couldn't update order with id ${id}:`, error);
  }
}

// Update order status
async function updateOrderStatus(id, status) {
  try {
    console.log("DB update:", status);
    const {
      rows: [order],
    } = await client.query(
      `
        UPDATE orders
        SET status = $2
        WHERE id = $1
        RETURNING *; 
        `,
      [id, status]
    );

    if (!order) {
      return null;
    }
    console.log(`Cancelled Order id ${id}`);
    return order;
  } catch (error) {
    console.error(`DB couldn't update order with id ${id}:`, error);
  }
}

// Destroy Order
async function destroyOrder(id) {
  try {
    await client.query(
      `
        DELETE FROM order_products
        WHERE "orderId" = $1;
        `,
      [id]
    );

    const {
      rows: [product],
    } = await client.query(
      `
        DELETE FROM orders
        WHERE id = $1
        RETURNING *
        `,
      [id]
    );
    return product;
  } catch (error) {
    console.error("Couldn't destroy order", error);
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderByUserId,
  getCartByOrderId,
  getCartByUserId,
  updateOrder,
  updateOrderStatus,
  destroyOrder,
};

// async function getCartByUserId(userId) {
//     try {
//         const { rows } = await client.query(`
//         SELECT
//             orders."userId" as user_id,
//             orders.id AS order_id,
//             orders.status
//         FROM
//             orders
//         WHERE
//             orders."userId" = $1
//         AND
//             orders.status = 'created'
//         `, [userId]);

//         if (rows.length === 0) {
//             return null; // Return null if no cart order with status 'created' is found
//         }
// console.log("Fired from getCartByUserId:", rows)
//         return rows;
//     } catch (error) {
//         console.error("Could not get cart order by userId:", error);
//         throw error;
//     }
// }

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
