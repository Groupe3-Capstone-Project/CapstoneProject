const client = require('./client'); // Import your PostgreSQL client

async function addProductToOrder({
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
};

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

async function getOrderProductByOrderId(id) {
    try {
        const { rows: orderProduct } = await client.query(`
            SELECT * FROM order_products
            WHERE "orderId" = $1
        `, [id]);
        console.log("fired from getOrderProductByOrderId:", orderProduct)
        return (orderProduct);
    } catch (error) {
        console.error("Couldn't get OrderProduct by order:", error)
    }
};

async function updateOrderProduct(orderProductId, quantity, price) {
    try {
        // Use the PostgreSQL client to execute an UPDATE query to update the order product.
        const { rows: [updatedOrderProduct] } = await client.query(`
            UPDATE order_products
            SET quantity = $2, price = $3
            WHERE id = $1
            RETURNING *;
        `, [orderProductId, quantity, price]);

        // Return the updated order product.
        return updatedOrderProduct;
    } catch (error) {
        // Handle errors here (e.g., log the error or throw an exception).
        console.error('Error updating order product:', error);
        throw error;
    }
}

async function destroyOrderProduct(id) {
    try {
        const { rows: [orderProduct]} = await client.query(`
            DELETE FROM order_products
            WHERE id = $1;
            RETURNING *
        `, [id]);
        return orderProduct;
    } catch (error) {
        console.error("Problem destroying product", error);
    }
};

module.exports = { 
    addProductToOrder,
    getAllOrderProducts,
    getOrderProductByOrderId,
    updateOrderProduct,
    destroyOrderProduct
};