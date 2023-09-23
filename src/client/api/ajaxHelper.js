


export async function registerUser(username, password) {
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username,
                    password
                },
            }),
        });

        const data = await response.json()
        window.localStorage.setItem("token", data);
        console.log(data);
    } catch (error) {
        console.error("An error occurred: ", error);
    }
}


export async function loginUser(username, password) {
    try {
        const response = await fetch(`${BASE_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                user: {
                    username,
                    password
                },
            }),
        });

        const data = await response.json();
        window.localStorage.setItem("token")
        console.log(data)
    } catch (error) {
        console.error("An error occurred: ", error)
    }
}

export async function fetchAllPosts() {
    try {
      const res = await fetch(`${BASE_URL}/posts`, {
        headers: getHeaders(),
      });
      const data = await res.json();
  
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  export async function deletePost(postId){
    try {
        const response = await fetch(`${BASE_URL}/posts/postId`, {
            method: "DELETE",
            headers: {
                "content-type" : "application/json",
                "Authorization" : `Bearer ${token}`,
            },
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
            method: "POST",
            heather: {
                "Authorization" : `Bearer ${token}`,
            },
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
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`,
            },
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
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
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
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
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