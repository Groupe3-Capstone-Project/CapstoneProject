import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Capstone</Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-blue-400">Welcome Page</Link>
          </li>
          <li>
            <Link to="/home" className="hover:text-blue-400">Home</Link>
          </li>
          <li>
            <Link to="/register" className="hover:text-blue-400">Register</Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-blue-400">Login</Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-blue-400">Products</Link>
          </li>
          <li>
            <Link to="/logout" className="hover:text-blue-400">Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

