import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function NavBar({
  token,
  setToken,
  isAdmin,
  setIsAdmin,
  setUserId,
}) {
  const navigate = useNavigate();
  const handleLogout = () => {
    setToken(null);
    window.localStorage.clear();
    setToken(null);
    setUserId(null);
    setIsAdmin(null);
    navigate("/");
  };
  return (
    <nav className="bg-gray-900 text-white p-4 top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          - The Online Gallery -
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
              <Link to="/products" className="hover:text-blue-400">
                Home
              </Link>
            ) : null}
          </li>
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

// LOL the logout component is not actually used, hence why we were getting ghost ID post logout, fixed it!!! that was so so soooooooooo annoying!! we did it!!!!!! -G
