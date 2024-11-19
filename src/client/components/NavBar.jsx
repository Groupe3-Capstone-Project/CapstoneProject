import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchUserByUsername } from "../api/ajaxHelper";

export default function NavBar({
  token,
  setToken,
  isAdmin,
  setIsAdmin,
  setUserId,
  currentUser,
  setCurrentUser,
}) {
  const [theUser, setTheUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserByName() {
      try {
        if (currentUser) {
          const response = await fetchUserByUsername(currentUser);
          console.log("theUser:", response);
          setTheUser(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserByName();
  }, [currentUser]);

  const handleLogout = () => {
    setToken(null);
    window.localStorage.clear();
    setToken(null);
    setUserId(null);
    setIsAdmin(null);
    setCurrentUser("");
    navigate("/");
  };
  return (
    <nav className="bg-gray-900 text-white p-4 top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          - The Online Gallery -
        </Link>
        {currentUser ? (
          <div className="flex items-center gap-1">
            <p className="navuser">Welcome {currentUser}</p>
            {theUser && theUser.user && (
              <div className="mask mask-squircle w-9 h-9">
                <img src={theUser.user.imgUrl} alt="Profile avatar" />
              </div>
            )}
          </div>
        ) : (
          <p>Welcome guest user</p>
        )}
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
