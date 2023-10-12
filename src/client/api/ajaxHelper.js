const BASE_URL = "http://localhost:4000/api";

function getHeaders() {
  let headers = {
    "Content-Type": "application/json",
  };
  const currentToken = localStorage.getItem("token");
  if (currentToken != null) {
    headers["Authorization"] = "Bearer " + currentToken;
    // console.log("getHeaders current token:", currentToken);
  }
  return headers;
}
export async function registerUser(
  name,
  email,
  address,
  username,
  password,
  imgUrl,
  isAdmin
) {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      headers: getHeaders(),
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        address,
        username,
        password,
        imgUrl,
        isAdmin,
      }),
    });

    const data = await response.json();
    const token = data.token;
    const userIsAdmin = data.user.isAdmin;
    window.localStorage.setItem("isAdmin", userIsAdmin);
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("userId", data.user.id);
    // console.log("from the ajax register:", data);
    return data;
  } catch (error) {
    console.error("An error occurred: ", error);
    throw error;
  }
}

// creating user using admin dashboard
export async function createUser({
  name,
  email,
  address,
  username,
  password,
  imgUrl,
  isAdmin,
  isActive,
}) {
  try {
    // console.log("is admin in ajax");
    // console.log(isAdmin);
    await fetch(`${BASE_URL}/users/register`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        address,
        username,
        password,
        imgUrl,
        isAdmin,
        isActive,
      }),
    });
    return "ok";
  } catch (error) {
    console.error("An error occurred: ", error);
    throw error;
  }
}

export async function loginUser(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      headers: getHeaders(),
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (response) {

    }
    const data = await response.json();
    if (response.status === 200) {
      const token = data.token;
      const isAdmin = data.user.isAdmin;
      window.localStorage.setItem("isAdmin", isAdmin);
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("userId", data.user.id);
      console.log("Logged as user: ", data);
    } else {
      throw new Error("Login failed: Invalid username or password");
    }
    return data;
  } catch (error) {
    console.error("An error freeee occurred: ", error);
    throw error;
  }
}

export async function fetchUserByUsername(username) {
  try {
    const response = await fetch(`${BASE_URL}/users/check/${username}`, {
      headers: getHeaders(),
      method: "GET",
    });
    const data = response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user by username:", error);
    return { message: "An error occurred" };
  }
}

export async function fetchAllProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      headers: getHeaders(),
    });
    const data = await res.json();
    console.log("Fetched all products: ", data);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchPaginatedProducts(currentPage, itemsPerPage) {
  try {
    const response = await fetch(
      `/api/products/paginated?page=${currentPage}&limit=${itemsPerPage}`,
      {
        headers: getHeaders(),
      }
    );
    const data = await response.json();
    console.log("Fetched paginated products: ", data);
    return data;
  } catch (error) {
    console.error("Error fetching paginated products:", error);
    throw error;
  }
}

export async function addProduct(productId) {
  try {
    const response = await fetch(`${BASE_URL}/orders/add_to_cart`, {
      headers: getHeaders(),
      method: "POST",
      body: JSON.stringify({
        productId,
      }),
    });
    const data = await response.json();
    console.log("Added product: ", data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function removeProduct(productId) {
  try {
    console.log("From ajax remove:", productId);
    const response = await fetch(`${BASE_URL}/orders/remove_from_cart`, {
      headers: getHeaders(),
      method: "DELETE",
      body: JSON.stringify({
        productId,
      }),
    });
    const data = await response.json();
    console.log("Removed Product: ", data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchAllUsers() {
  try {
    const res = await fetch(`${BASE_URL}/users`, {
      headers: getHeaders(),
    });
    const data = await res.json();
    console.table(data.users);
    return data.users;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchSingleProduct(productId) {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      headers: getHeaders(),
    });
    const data = await response.json();
    console.log("Fetched single product: ", data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getCart(userId) {
  try {
    console.log("From ajax cart:", userId);
    const response = await fetch(`${BASE_URL}/orders/cart/${userId}`, {
      headers: getHeaders(),
    });
    // console.log(userId)
    const data = await response.json();
    console.log("fire from getCart", data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(productId) {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      headers: getHeaders(),
      method: "DELETE",
    });
    const result = await response.json();
    console.log("Deleted product:", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteUser(userId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      headers: getHeaders(),
      method: "DELETE",
    });
    const result = await response.json();
    console.log("deleted user:", result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createProduct({
  title,
  artist,
  description,
  price,
  imgUrl,
  year,
  medium,
  period,
  dimensions,
}) {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      headers: getHeaders(),
      method: "POST",
      body: JSON.stringify({
        post: {
          title,
          artist,
          description,
          price,
          imgUrl,
          year,
          medium,
          period,
          dimensions,
        },
      }),
    });
    const result = await response.json();
    console.log("Created product:", result);
  } catch (error) {
    console.error(error);
  }
}

export async function editProduct({
  title,
  artist,
  description,
  price,
  imgUrl,
  year,
  medium,
  period,
  dimensions,
  postId,
}) {
  const sendData = {
    title,
    artist,
    description,
    price,
    imgUrl,
    year,
    period,
    dimensions,
    medium,
  };
  // console.log("SEND DAta ");
  // console.log(sendData);
  try {
    const res = await fetch(`${BASE_URL}/products/${postId}`, {
      headers: getHeaders(),
      method: "PATCH",
      body: JSON.stringify(sendData),
    });
    const data = await res.json();
    console.log("Edited product:", data);
    return data.data.post;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function editUser({
  name,
  email,
  address,
  username,
  password,
  imgUrl,
  isAdmin,
  isActive,
  userId,
}) {
  const sendData = {
    name,
    email,
    address,
    username,
    password,
    imgUrl,
    isAdmin,
    isActive,
  };
  // console.log("SEND DAta ");
  // console.log(sendData);
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}`, {
      headers: getHeaders(),
      method: "PATCH",
      body: JSON.stringify(sendData),
    });
    const data = await res.json();
    console.log("Edited user:", data);
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function completeOrder(orderId) {
  try {
    const response = await fetch(`${BASE_URL}/orders/${orderId}/completed`, {
      headers: getHeaders(),
      method: "PATCH",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function cancelOrder(orderId) {
  try {
    const response = await fetch(`${BASE_URL}/orders/${orderId}/cancelled`, {
      headers: getHeaders(),
      method: "DELETE",
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
