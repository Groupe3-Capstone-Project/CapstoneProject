import React, { useState } from "react";
import { registerUser } from "../api/ajaxHelper";
import earingPerl from '../assets/IMG/earingPerl.jpg';
import { useNavigate } from "react-router-dom";

export default function Register({ token, setToken }) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [passwordMismatchError, setPasswordMismatchError] = useState('');
  const navigate = useNavigate();

  const handlerRegister = async () => {
    try {
      if (password !== confirmPassword) {
        setPasswordMismatchError('Passwords do not match');
        return;
      }

      const user = await registerUser(name, email, address, username, password); // Get the token
      console.log(user);
      navigate("/products")
    } catch (error) {
      setError("Registration failed: " + error.message);
      console.error("Registration failed: ", error);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Clear the password mismatch error when the password field changes.
    setPasswordMismatchError('');
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    // Clear the password mismatch error when the password confirmation field changes.
    setPasswordMismatchError('');
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className="hidden sm:block">
          <img className=" w-full h-full object-cover" src={earingPerl} alt="" />
        </div>
        <div className="flex flex-col justify-center bg-gray-800">
          <form className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg">
            <h2 className="text-4xl dark:text-white font-bold text-center">Register</h2>
            <div className="flex flex-col text-gray-400 py-2">
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
            <div className="flex flex-col text-gray-400 py-2">
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
            {passwordMismatchError && <p className="text-red-500">{passwordMismatchError}</p>}
            <div className="flex justify-between text-gray-400 py-2">
              <p className="flex items-center"><input className="mr-2" type="checkbox" />Remember me</p>
              <p>Forgot Password</p>
            </div>
            <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" type="button" onClick={handlerRegister}>
              Register
            </button>
            {error && <p className=" text-white">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

