


export async function registerUser() {
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: 'POST',
            header: {
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


export async function loginUser() {
    try {
        const response = await fetch(`${BASE_URL}/user/login`, {
            method: 'POST',
            header: {
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
        console.error("An error accurred: ", error)
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
      console.log(error);
      return [];
    }
  }