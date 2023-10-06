const client = require('./client'); // Import your PostgreSQL client


// Create a new orderProduct
async function addProductToOrder({
    orderId, productId, quantity, price
}) {
    // console.log("From apto value:", orderId)
    try {
    // Use the PostgreSQL client to execute an INSERT query to create a new order product record.
        const { rows: [order_product] } = await client.query(`
            INSERT INTO order_products("orderId", "productId", quantity, price)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [orderId, productId, quantity, price]);
    // Return the newly created order product.
    // console.log("Fired from addProductToOrder:", order_product);
    return order_product;
    } catch (error) {
    // Handle errors here (e.g., log the error or throw an exception).
    console.error('Error creating order product:', error);
    throw error;
    }
};

// Get all orderProducts
async function getAllOrderProducts() {
    try {
        const { rows: orderProduct } = await client.query(`
            SELECT * FROM order_products
        `);
        return orderProduct;  
    } catch (error) {
        console.error("Couldn't get all orderProducts:", error);
    }
}; 

// Get orderProduct from orderPorductid
async function getOrderProductById(id) {
    try {
        const { rows: [orderProduct] } = await client.query(`
            SELECT * FROM order_products
            WHERE id = $1
        `, [id]);
        if (!orderProduct) {
            return null;
        }
        return orderProduct;
    } catch (error) {
        console.error("Couldn't get orderProduct by id: ", error);
    }
};

// Get orderProduct from orderId
async function getOrderProductByOrderId(id) {
    try {
        const { rows: [orderProduct] } = await client.query(`
            SELECT * FROM order_products
            WHERE "orderId" = $1
        `, [id]);
        if (!orderProduct) {
            return null;
        }
        // console.log("fired from getOrderProductByOrderId:", orderProduct);
        return (orderProduct);
    } catch (error) {
        console.error("Couldn't get OrderProduct by order:", error)
    }
};

// Update orderProduct from orderPorductId with it's values
async function updateOrderProduct(orderProductId, quantity, price) {
    try {
        // Use the PostgreSQL client to execute an UPDATE query to update the order product.
        const { rows: [orderProduct] } = await client.query(`
            UPDATE order_products
            SET quantity = $2, price = $3
            WHERE id = $1
            RETURNING *;
        `, [orderProductId, quantity, price]);
        if (!orderProduct) {
            return null;
        }
        // Return the updated order product.
        // console.log("Fired from updateOrderProduct:", orderProduct);
        return orderProduct;
    } catch (error) {
        // Handle errors here (e.g., log the error or throw an exception).
        console.error('Error updating order product:', error);
        throw error;
    }
}

// Destroy orderProduct from orderProductId
async function destroyOrderProduct(id) {
    try {
        const { rows: [orderProduct]} = await client.query(`
            DELETE FROM order_products
            WHERE id = $1
            RETURNING *;
        `, [id]);

        if (!orderProduct) {
            return null;
        }
        return orderProduct;
    } catch (error) {
        console.error("Problem destroying product", error);
    }
};

module.exports = { 
    addProductToOrder,
    getAllOrderProducts,
    getOrderProductById,
    getOrderProductByOrderId,
    updateOrderProduct,
    destroyOrderProduct
};