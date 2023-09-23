import React, { useState } from "react";
import { loginUser } from "../api/ajaxHelper";
import earingPerl from '../assets/IMG/earingPerl.jpg';

export default function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlerLogin = async () => {
    try {
      const response = await loginUser(username, password);
      if (response && response.token) {
        setToken(response.token);
      } else {
        setError("Login failed: Invalid username or password");
      }
    } catch (error) {
      setError("Login failed: " + error.message);
      console.error("Login failed: ", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className="hidden sm:block">
          <img className="w-full h-full object-cover" src={earingPerl} alt="" />
        </div>
        <div className="flex flex-col justify-center bg-gray-800">
          <form className="max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg">
            <h2 className="text-4xl dark:text-white font-bold text-center">Login</h2>
            <div className="flex flex-col text-gray-400 py-2">
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between text-gray-400 py-2">
              <p className="flex items-center"><input className="mr-2" type="checkbox" />Remember me</p>
              <p>Forgot Password</p>
            </div>
            <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" type="button" onClick={handlerLogin}>
              Login
            </button>
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
