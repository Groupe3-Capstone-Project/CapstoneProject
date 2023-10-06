import React from "react";
import { Link } from "react-router-dom";
// import '../css/sidebar.css'
export default function SideBar() {
  return (
    <div className="flex h-screen w-1/6">
      <ul className="flex flex-col gap-4 pt-[30vh] bg-gray-100 items-center w-full font-medium text-xl">
        <Link to="/dashboard/users">
          <li>Users</li>
        </Link>

        <Link to="/dashboard/products">
          <li>Products</li>
        </Link>
      </ul>
    </div>
  );
}
