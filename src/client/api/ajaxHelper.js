
const BASE_URL = "http://localhost:3000/api";


function getHeaders() {
  let headers = {
    "Content-Type": "application/json",
  };
  const currentToken = localStorage.getItem("auth_token");
  if (currentToken != null) {
    headers["Authorization"] = "Bearer " + currentToken;
    console.log("getHeaders current token:", currentToken);
  }
  // console.log("Current Headers: " + JSON.stringify(headers));
  return headers;
};


export async function registerUser( name, email, address, username, password, imgUrl, isAdmin) {
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
          headers: getHeaders(),
            method: 'POST',
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

        const data = await response.json()
        const token = data.token;
        window.localStorage.setItem("token", token);
        console.log(data);
        return token;
    } catch (error) {
        console.error("An error occurred: ", error);
        throw error;
    }
}


export async function loginUser(username, password) {
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
          headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify({
                    username,
                    password,
            }),
        });


        const data = await response.json();
        const token = data.token;
        window.localStorage.setItem("token", token)
        console.log(data)
        return token;
    } catch (error) {
        console.error("An error occurred: ", error)
        throw error;
    }
}

export async function fetchAllPosts() {
    try {
      const res = await fetch(`${BASE_URL}/products`, {
        headers: getHeaders(),
      });
      const data = await res.json();
      console.log(data)
      return data;
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
      console.log(error)
    }
};

  export async function deletePost(postId){
    try {
        const response = await fetch(`${BASE_URL}/posts/postId`, {
          headers: getHeaders(),
            method: "DELETE",
        });
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
        throw error;
    }
  }

  export async function createPost() {
    try {
        const response = await fetch(`${BASE_URL}/posts`, {
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
  };

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


  export async function editPost(
    postId,
    newTitle,
    newArtist,
    newDescription,
    newPrice,
    newImgUrl,
    token
  ) {
  
    const sendData = {
      post: {
        title: newTitle,
        artist: newArtist,
        description: newDescription,
        price: newPrice,
        imgUrl: newImgUrl,
      },
    };
  
    try {
      const res = await fetch(`${BASE_URL}/posts/postId`, {
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
      console.log(userData)
      } else {
        console.log("Failed to fetch user data");
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  }