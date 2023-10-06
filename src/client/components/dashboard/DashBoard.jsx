import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

export default function DashBoard({ token, setToken }) {
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="w-full p-8">
        <Outlet />
      </div>
    </div>
  );
}
