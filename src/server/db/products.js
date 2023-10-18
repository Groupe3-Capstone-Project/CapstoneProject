const client = require("./client");
const { dbFields } = require("./utils");

// Get all products
async function getAllProducts() {
  try {
    const { rows: products } = await client.query(`
            SELECT * FROM products;
        `);
    return products;
  } catch (error) {
    console.error("Problem retrieving products from db", error);
  }
}

// Get product from productId
async function getProductById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            SELECT * FROM products
            WHERE id = $1;
        `,
      [id]
    );
    return product;
  } catch (error) {
    console.error("Problem getting product by id", error);
  }
}

// Get product from title
async function getProductByTitle(title) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            SELECT * 
            FROM products
            WHERE title = $1;
        `,
      [title]
    );
    return product;
  } catch (error) {
    console.error("DB couldn't get product by name", error);
  }
}

// Create product
async function createProduct({
  title,
  artist,
  description,
  period,
  medium,
  price,
  year,
  dimensions,
  imgUrl,
  isActive,
}) {
  try {
    // Insure placeholder img is attributed if none provided by user
    if (!imgUrl) {
      imgUrl =
        "https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-default-male-avatar-png-image_2811083.jpg";
    }
    if (!isActive || isActive === undefined) {
      isActive = true;
    }
    const {
      rows: [product],
    } = await client.query(
      `
        INSERT INTO products(title, artist, description, period, medium, price, year, dimensions, "imgUrl", "isActive")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *;
        `,
      [
        title,
        artist,
        description,
        period,
        medium,
        price,
        year,
        dimensions,
        imgUrl,
        isActive,
      ]
    );

    if (product) {
      return product;
    } else {
      console.error("Product not created");
      return null;
    }
  } catch (error) {
    console.error("Problem creating product into db", error);
  }
}

// Update product from productId with it's fields
async function updateProduct(id, fields) {
  try {
    const toUpdate = {};
    for (let column in fields) {
      if (fields[column] !== undefined) {
        toUpdate[column] = fields[column];
      }
    }
    if (toUpdate.hasOwnProperty("title")) {
      const existingProduct = await getProductByTitle(toUpdate.title);
      // console.log("Existing: ", existingProduct);
      if (existingProduct && existingProduct.id !== id) {
        throw new Error("Another painting already has this title");
      }
    }
    let product;
    if (dbFields(toUpdate).insert.length > 0) {
      const { rows } = await client.query(
        `
            UPDATE products
            SET ${dbFields(toUpdate).insert}
            WHERE id = ${id}
            RETURNING *;
            `,
        Object.values(toUpdate)
      );
      product = rows[0];
    }
    console.log(`Updated product with id ${id} successfully`, product);
    return product;
  } catch (error) {
    console.error(`DB couldn't update product with id ${id}`, error);
  }
}

// Makes product inactive and deletes it's corresponding orderProducts if present
async function destroyProduct(id, isActive) {
  try {
    await client.query(
      `
        DELETE FROM order_products
        WHERE "productId" = $1;
    `,
      [id]
    );
    const {
      rows: [product],
    } = await client.query(
      `
        UPDATE products
        SET "isActive" = $2
        WHERE id = $1
        RETURNING *;
    `,
      [id, isActive]
    );
    return product;
  } catch (error) {
    console.error("Problem destroying product", error);
  }
}

module.exports = {
  client,
  getAllProducts,
  getProductById,
  getProductByTitle,
  createProduct,
  updateProduct,
  destroyProduct,
};
// // Destroy product from productId
// async function destroyProduct(id) {
//     try {
//         await client.query(`
//         DELETE FROM order_products
//         WHERE "productId" = $1;
//     `, [id]);

//     const { rows: [product] } = await client.query(`
//         DELETE FROM products
//         WHERE id = $1
//         RETURNING *;
//     `, [id]);
//         return product;
//     } catch (error) {
//         console.error("Problem destroying product", error);
//     }
// };
