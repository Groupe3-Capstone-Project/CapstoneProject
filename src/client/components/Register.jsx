import React, { useState } from "react";
import { registerUser, fetchUserByUsername } from "../api/ajaxHelper";
import { clearCart } from "../api/initializeGuestCart";
import earingPerl from "../assets/IMG/earingPerl.jpg";
import { useNavigate } from "react-router-dom";

export default function Register({ setIsAdmin, setToken, setUserId }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [passwordMismatchError, setPasswordMismatchError] = useState("");
  const navigate = useNavigate();

  const handlerRegister = async () => {
    try {
      if (username.length < 6) {
        setError("Username must be at least 6 characters.");
        return;
      }
      if (name.length < 1) {
        setError("Name must not be empty.");
        return;
      }
      if (!validateEmail(email)) {
        setError("Invalid email address.");
        return;
      }
      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        setPassword("");
        setConfirmPassword("");
        return;
      }
      if (password !== confirmPassword) {
        setPasswordMismatchError("Passwords do not match");
        setPassword("");
        setConfirmPassword("");
        return;
      }

      const usernameExists = await fetchUserByUsername(username);
      if (usernameExists && usernameExists.message === "username good to go") {
        setError("");
      } else {
        setError("Username is already taken.");
        console.log("Username?:", usernameExists);
        return;
      }

      const response = await registerUser(
        name,
        email,
        address,
        username,
        password
      );
      const token = response.token;
      const userId = response.user.id;
      if (!response.user.isAdmin) {
        setIsAdmin(null);
      }
      // const userId = response.user.id;
      console.log("user from register:", userId);
      setToken(token);
      setUserId(userId);
      navigate("/products");
      setError("");
      // clearCart();
    } catch (error) {
      setError("Registration failed, try again but better");
      console.error("Registration failed: ", error);
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

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    // Clear the error for the name field when the user types.
    setError("");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    // Clear the error for the password field when the user types.
    setError("");
    // Clear the password mismatch error when the password field changes.
    setPasswordMismatchError("");
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    // Clear the error for the password confirmation field when the user types.
    setError("");
    // Clear the password mismatch error when the password confirmation field changes.
    setPasswordMismatchError("");
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    // Clear the error for the email field when the user types.
    setError("");
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    // Clear the error for the address field when the user types.
    setError("");
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className="hidden sm:block">
          <img
            className=" w-full h-full object-cover"
            src={earingPerl}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center bg-gray-800">
          <form className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg">
            <h2 className="text-4xl dark:text-white font-bold text-center">
              Register
            </h2>
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
                type="text"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                name="address"
                type="text"
                placeholder="Address"
                value={address}
                onChange={handleAddressChange}
              />
            </div>

            <div className="flex flex-col text-gray-400 py-2">
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {passwordMismatchError && (
              <p className="text-red-500">{passwordMismatchError}</p>
            )}
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
              onClick={handlerRegister}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
