import React from "react";
import { Link } from "react-router-dom";

export default function NavBar({ token, isAdmin }) {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Capstone
        </Link>
        <ul className="flex space-x-4">
          <li>
            {!token ? (
              <Link to="/" className="hover:text-blue-400">
                Welcome Page
              </Link>
            ) : null}
          </li>
          <li>
            {token && isAdmin && isAdmin != "false" ? (
              <Link to="/dashboard/users" className="hover:text-blue-400">
                Admin
              </Link>
            ) : null}
          </li>

          <li>
            <Link to="/home" className="hover:text-blue-400">
              Home
            </Link>
          </li>

          <li>
            {token ? (
              <Link to="/products" className="hover:text-blue-400">
                Products
              </Link>
            ) : null}
          </li>
          <li>
            {token ? (
              <Link to="/logout" className="hover:text-blue-400">
                Logout
              </Link>
            ) : null}
          </li>
        </ul>
      </div>
    </nav>
  );
}
