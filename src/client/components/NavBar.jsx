import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; 

export default function NavBar({token, setToken, isAdmin}) {
  const navigate = useNavigate();
  const handleLogout = () => {
    setToken(null);
    window.localStorage.clear();
    navigate("/");
  };
  return (
    <nav className="bg-gray-900 text-white p-4 fixed top-0 w-full z-50">
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
             {token ? (
            <Link to="/products" className="hover:text-blue-400">Home</Link>
             ) : null }
          </li>
          {token ? (
          <button>
            <FaShoppingCart />
          </button>
          ) : null }
          <li>
             {token ? (
             <span
             className="cursor-pointer hover:text-blue-400"
             onClick={handleLogout}
           >
             Logout
           </span>
              ) : null} 
          </li>
        </ul>
      </div>
    </nav>
  );
}
