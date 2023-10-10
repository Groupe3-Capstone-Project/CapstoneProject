# TO START

1. Install packages & dependencies

```bash
npm install
```

2. Add a `.env` file, in the root of your project, with your secret value for auth

```
JWT_SECRET='somesecretvalue'
```

3. Create the database

- In your terminal:

```bash
- psql
- CREATE DATABASE capstone_groupe3;
```
(The ';' after the database name is crucial)

--------------------------------------------------------------------

#  API DOCUMENTATION

### ROUTES INDEX :
- USERS
- PRODUCTS
- ORDERS
- ORDER_PRODUCTS


## USERS ROUTES

## Get all users (Admin)

**Route:** `GET /api/users`

**Description:** This route is accessible only by administrators. It retrieves a list of all users in the system.

**Response:**
- `users`: An array containing user objects.

**Errors:** If there's an error in retrieving users, an error response will be sent.

---

## Post login User

**Route:** `POST /api/users/login`

**Description:** This route allows users to log in by providing their username and password. If the credentials are correct, it returns an authentication token and user information.

**Request Body:**
- `username`: User's username.
- `password`: User's password.

**Response:**
- `message`: A success message.
- `token`: An authentication token.
- `user`: User information.

**Errors:** If the credentials are missing or incorrect, appropriate error messages will be sent.

---

## Post register new user

**Route:** `POST /api/users/register`

**Description:** This route allows users to register by providing their details. If registration is successful, it returns an authentication token and user information.

**Request Body:**
- `name`: User's name.
- `email`: User's email address.
- `address`: User's address.
- `username`: User's desired username.
- `password`: User's desired password.
- `imgUrl`: URL of the user's profile image.
- `isAdmin`: Boolean indicating whether the user is an admin.

**Response:**
- `message`: A success message.
- `token`: An authentication token.
- `user`: User information.

**Errors:** If the username already exists, a user exists error message will be sent.

---

## Patch user by userId (User/Admin)

**Route:** `PATCH /api/users/:userId`

**Description:** This route allows users (including admins) to update their user profile information. At least one parameter from `name`, `email`, `address`, `username`, `imgUrl`, and `isAdmin` must be provided.

**Request Parameters:**
- `userId`: ID of the user to be updated.

**Request Body:**
- `name`: Updated name (optional).
- `email`: Updated email (optional).
- `address`: Updated address (optional).
- `username`: Updated username (optional).
- `imgUrl`: Updated profile image URL (optional).
- `isAdmin`: Updated admin status (optional).

**Response:**
- `message`: A success message.
- `user`: Updated user information.

**Errors:** If the user is not found or the requester doesn't have permission, appropriate error messages will be sent.

---

## Delete user by userId (Admin)

**Route:** `DELETE /api/users/:userId`

**Description:** This route allows administrators to delete a user by providing their user ID. It makes the user inactive by changing the value of isActive to false

**Request Parameters:**
- `userId`: ID of the user to be deleted.

**Response:**
- `message`: A success message.
- `user`: Deleted user information.

**Errors:** If there's an error in deleting the user, an error message will be sent.

--------------------------------------------------------------------------------------------------------------

# PRODUCTS ROUTES

## Get all products

**Route:** `GET /api/products`

**Description:** This route retrieves a list of all products. Administrators see all products, both active and inactive, while regular users see only active products.

**Response:**
- `products`: An array containing product objects.

**Errors:** If there's an error in retrieving products, an error response will be sent.

---

## Get all products paginated

**Route:** `GET /api/products/paginated`

**Description:** This route retrieves a paginated list of products, allowing clients to specify the page number and the number of products per page using query parameters.

**Request Parameters:**
- `page` (optional): The page number to retrieve (default: 1).
- `limit` (optional): The number of products per page (default: 10).

**Response:**
- `products` (array): An array of product objects representing the products on the requested page.
- `totalProducts` (number): The total number of active products in the system.
- `page` (number): The current page number.
- `limit` (number): The number of products displayed per page.

**Errors:** Returns a 404 error if there is a problem retrieving the list of products.
 
---

## Get product by productId

**Route:** `GET /api/products/:productId`

**Description:** This route retrieves a product by its ID. Administrators see all products, both active and inactive, while regular users see only active products.

**Request Parameters:**
- `productId`: ID of the product to be retrieved.

**Response:**
- `product`: The product information.

**Errors:** If the product is not found or the requester doesn't have permission, appropriate error messages will be sent.

---

## Post new product (Admin)

**Route:** `POST /api/products`

**Description:** This route allows administrators to create a new product.

**Request Body:**
- `title`: Product title.
- `artist`: Artist's name.
- `description`: Product description.
- `period`: Artistic period.
- `medium`: Art medium.
- `price`: Product price.
- `year`: Year of creation.
- `dimensions`: Product dimensions.
- `imgUrl`: URL of the product image.
- `isActive`: Boolean indicating whether the product is active.

**Response:**
- `message`: A success message.
- `product`: The newly created product.

**Errors:** If a product with the same title already exists, a conflict error message will be sent.

---

## Patch product by productId (Admin)

**Route:** `PATCH /api/products/:productId`

**Description:** This route allows administrators to update a product's information. At least one parameter from `title`, `artist`, `description`, `period`, `medium`, `price`, `year`, `dimensions`, `imgUrl`, and `isActive` must be provided.

**Request Parameters:**
- `productId`: ID of the product to be updated.

**Request Body:**
- `title`: Updated product title (optional).
- `artist`: Updated artist's name (optional).
- `description`: Updated product description (optional).
- `period`: Updated artistic period (optional).
- `medium`: Updated art medium (optional).
- `price`: Updated product price (optional).
- `year`: Updated year of creation (optional).
- `dimensions`: Updated product dimensions (optional).
- `imgUrl`: Updated URL of the product image (optional).
- `isActive`: Updated active status (optional).

**Response:**
- `message`: A success message.
- `product`: The updated product information.

**Errors:** If the product is not found, a not found error message will be sent.

---

## Delete product by productId (Admin)

**Route:** `DELETE /api/products/:productId`

**Description:** This route allows administrators to make a product inactive by changing its `isActive` status to false.

**Request Parameters:**
- `productId`: ID of the product to be deleted.

**Response:**
- `message`: A success message.
- `deletedProduct`: The product information of the deactivated product.

**Errors:** If there's an error in making the product inactive, an error message will be sent.

--------------------------------------------------------------------------------------------------------------

# ORDERS ROUTES

## Get all orders (Admin)

**Route:** `GET /api/orders`

**Description:** This route retrieves a list of all orders. It is accessible only by administrators.

**Response:**
- `orders`: An array containing order objects.

**Errors:** If there's an error in retrieving orders, an error response will be sent.

---

## Post Item to cart / create order if none (User/Admin)

**Route:** `POST /api/orders/add_to_cart`

**Description:** This route allows users (including admins) to add items to their cart or create a new order if they don't have one.

**Request Body:**
- `productId`: ID of the product to be added to the cart.

**Response:**
- `message`: A success message.
- `userCart`: The updated user cart information.

**Errors:** If the user doesn't have permission, appropriate error messages will be sent.

---

## Delete cart item (User)

**Route:** `DELETE /api/orders/remove_from_cart`

**Description:** This route allows users to remove an item from their cart.

**Request Body:**
- `productId`: ID of the product to be removed from the cart.

**Response:**
- `message`: A success message.
- `userCart`: The updated user cart information.

**Errors:** If the user doesn't have permission or the item is not found in the cart, appropriate error messages will be sent.

---

## Get cart by userId (User)

**Route:** `GET /api/orders/cart/:userId`

**Description:** This route retrieves a user's cart by their user ID. It is accessible only by the user whose cart is being retrieved.

**Request Parameters:**
- `userId`: ID of the user whose cart is to be retrieved.

**Response:**
- `cartOrder`: The user's cart information.

**Errors:** If the user doesn't have permission or the cart is not found, appropriate error messages will be sent.

---

## Get order by userId (Admin)

**Route:** `GET /api/order/user/:userId`

**Description:** This route retrieves orders by a user's ID. It is accessible only by administrators.

**Request Parameters:**
- `userId`: ID of the user whose orders are to be retrieved.

**Response:**
- `order`: An array containing order objects.

**Errors:** If the user or their orders are not found, appropriate error messages will be sent.

---

## Get order by userId (Admin)

**Route:** `GET /api/orders/:orderId`

**Description:** This route retrieves an order by its ID. It is accessible only by administrators.

**Request Parameters:**
- `orderId`: ID of the order to be retrieved.

**Response:**
- `order`: An array containing order objects.

**Errors:** If the order is not found, an error message will be sent.

---

## Patch order by orderId (Admin)

**Route:** `PATCH /api/orders/:orderId`

**Description:** This route allows administrators to update an order's information.

**Request Parameters:**
- `orderId`: ID of the order to be updated.

**Request Body:**
- `userId`: Updated user ID (optional).
- `orderDate`: Updated order date (optional).
- `status`: Updated order status (optional).

**Response:**
- `message`: A success message.
- `updatedOrder`: The updated order information.

**Errors:** If the order is not found, an error message will be sent.

---

## Patch order by orderId to make status 'completed' (User/Admin)

**Route:** `PATCH /api/orders/:orderId/completed`

**Description:** This route allows users (including admins) to mark an order as 'completed.'

**Request Parameters:**
- `orderId`: ID of the order to be marked as completed.

**Response:**
- `message`: A success message.
- `completedOrder`: The updated order information.

**Errors:** If the order is not found or is already completed, appropriate error messages will be sent.

---

## Delete order by orderId to make status 'cancelled' (User/Admin)

**Route:** `DELETE /api/orders/:orderId/cancelled`

**Description:** This route allows users (including admins) to cancel an order by marking it as 'cancelled.'

**Request Parameters:**
- `orderId`: ID of the order to be marked as cancelled.

**Response:**
- `message`: A success message.
- `deletedOrder`: The updated order information.

**Errors:** If the order is not found, is already cancelled, or the user doesn't have permission, appropriate error messages will be sent.

--------------------------------------------------------------------------------------------------------------

# ORDER_PRODUCTS ROUTES

## Get all order products (Admin)

**Route:** `GET /api/order_products`

**Description:** This route retrieves a list of all order products. It is accessible only by administrators.

**Response:**
- `orderProducts`: An array containing order product objects.

**Errors:** If there's an error in retrieving order products, an error response will be sent.

---

## Patch order product by orderProductId (Admin)

**Route:** `PATCH /api/order_products/:orderProductId`

**Description:** This route allows administrators to update an order product's information.

**Request Parameters:**
- `orderProductId`: ID of the order product to be updated.

**Request Body:**
- `quantity`: Updated quantity (optional).
- `price`: Updated price (optional).

**Response:**
- `message`: A success message.
- `updatedOrderProduct`: The updated order product information.

**Errors:** If the order product is not found, an error message will be sent.

---

## Delete order product by orderProductId (User/Admin)

**Route:** `DELETE /api/order_products/:orderProductId`

**Description:** This route allows users (including admins) to delete an order product by its ID.

**Request Parameters:**
- `orderProductId`: ID of the order product to be deleted.

**Response:**
- `message`: A success message.
- `orderProduct`: The deleted order product information.

**Errors:** If the order product is not found, an error message will be sent.

--------------------------------------------------------------------------------------------------------------


#  🚀 Capstone Boilerplate

A template for building web applications using the PERN (PostgreSQL, Express.js, React, Node.js) stack. 

##  🏁 Getting Started

1. **Don't fork or clone this repo!** Instead, create a new, empty directory on your machine and `git init` (or create an _empty_ repo on GitHub and clone it to your local machine)

2. Add this template as a remote and merge it into your own repository

```bash
git remote add boilermaker git@github.com:FullstackAcademy/capstone-app-template.git
git fetch boilermaker
git merge boilermaker/main
```

3. Install packages

```bash
npm i
```

4. Add a `.env` file with your secret value for auth
```
JWT_SECRET='somesecretvalue'
```

5. Create the database

```bash
createdb your-database-name
```

6. Update `src/server/db/client.js` to reflect the name of your database

```js
const connectionString = process.env.DATABASE_URL || 'https://localhost:5432/your-database-name';
```

7. Seed the database
```bash
npm run seed
```

8. Start the server
```bash
npm run dev
```

9. Open your browser at `http://localhost:3000`

10. Build something cool! 😎