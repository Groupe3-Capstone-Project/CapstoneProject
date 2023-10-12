import React, { useState } from "react";
import { loginUser } from "../api/ajaxHelper";
import { clearCart } from "../api/initializeGuestCart";
import earingPerl from "../assets/IMG/earingPerl.jpg";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsAdmin, setToken, setUserId }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handlerLogin = async () => {
    try {
      if (username.length < 6) {
        setError("Username must be at least 6 characters.");
        return;
      }

      // Password validation
      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }
      setError("");
      const response = await loginUser(username, password);
      if (response) {
        const { token, user } = response;
        setToken(token);
        setIsAdmin(user.isAdmin);
        setUserId(user.id);
        navigate("/products");
        setSuccessMessage("Login successful!");
        setError(""); // Clear any previous error
        clearCart();
      } else {
        setError("Login failed: Invalid username or password");
      }
    } catch (error) {
      console.error("Login failed: Invalid username or password");
    }
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    // Check if the value is a string with no spaces
    if (typeof value === "string" && value.trim() === value) {
      setUsername(value);
      // Clear the error for the username field when the user types.
      setError("");
    } else {
      setError("Username must be a string with no spaces.");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    // Clear the error for the password field when the user types.
    setError("");
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className="hidden sm:block">
          <img className="w-full h-full object-cover" src={earingPerl} alt="" />
        </div>
        <div className="flex flex-col justify-center bg-gray-800">
          <form className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg">
            <h2 className="text-4xl dark:text-white font-bold text-center">
              Login
            </h2>
            {successMessage && (
              <p className="text-green-500 text-center">{successMessage}</p>
            )}
            <div className="flex flex-col text-gray-400 py-2">
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="flex justify-between text-gray-400 py-2">
              <p className="flex items-center">
                <input className="mr-2" type="checkbox" />
                Remember me
              </p>
              <p>Forgot Password</p>
            </div>
            <button
              className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
              type="button"
              onClick={handlerLogin}
            >
              Login
            </button>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
