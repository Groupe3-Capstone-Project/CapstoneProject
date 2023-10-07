const BASE_URL = "http://localhost:3000/api";

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
    window.localStorage.setItem("token", token);
    console.log(data);
    return token;
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
  isAdmin
}) {
  try {
    console.log("is admin in ajax");
    console.log(isAdmin);
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

    const data = await response.json();
    const token = data.token;
    const isAdmin = data.user.isAdmin;
    window.localStorage.setItem("isAdmin", isAdmin);
    window.localStorage.setItem("token", token);
    // console.log(data)
    return { token, isAdmin };
  } catch (error) {
    console.error("An error occurred: ", error);
    throw error;
  }
}

export async function fetchAllProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      headers: getHeaders(),
    });
    const data = await res.json();
    // console.log(data)
    return data;
  } catch (error) {
    console.error(error);
    return [];
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
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(postId) {
  try {
    const response = await fetch(`${BASE_URL}/products/${postId}`, {
      headers: getHeaders(),
      method: "DELETE",
    });
    const result = await response.json();
    console.log(result);
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
    console.log(result);
    return result;
  } catch (error){
    console.error(error);
    throw error;
  }
}

export async function createProduct() {
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
        },
      }),
    });
    const result = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

export async function sendMessage(postId, content) {
  try {
    const response = await fetch(`${BASE_URL}/posts/postId/messages`, {
      headers: getHeaders(),
      method: "POST",
      body: JSON.stringify({
        message: {
          content: content,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
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
  console.log("SEND DAta ");
  console.log(sendData);
  try {
    const res = await fetch(`${BASE_URL}/products/${postId}`, {
      headers: getHeaders(),
      method: "PATCH",
      body: JSON.stringify(sendData),
    });
    const data = await res.json();
    console.log(data);
    return data.data.post;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function fetchUserData() {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: getHeaders(),
      method: "GET",
    });

    if (response.ok) {
      const userData = await response.json();
      console.log(userData);
    } else {
      console.log("Failed to fetch user data");
    }
  } catch (error) {
    console.log("Error fetching user data:", error);
  }
}
