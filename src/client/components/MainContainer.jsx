import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./Home"
import Register from "./Register"
import Login from "./Login"
import Logout from "./Logout";
import WelcomePage from "./WelcomePage";
import Products from "./Products";
import SingleProduct from "./SingleProduct";
import Cart from "./Cart";
import NavBar from "./NavBar";

import ProtectedRoute from "./protectedRoute";
import DashBoard from "./dashboard/DashBoard";
import UsersDashboard from "./dashboard/usersDashboard";
import ProductsDashboard from "./dashboard/productsDashboard";



export default function MainContainer() {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [isAdmin, setIsAdmin] = useState(
        window.localStorage.getItem("isAdmin"));

    return (
        <div>
            <NavBar token={token} setToken={setToken} isAdmin={isAdmin} />
            <Routes>
                <Route path="/" element={<WelcomePage token={token} setToken={setToken} />} />
                <Route path="/home" element={<Home token={token} setToken={setToken} />} />
                <Route path="/register" element={<Register token={token} setToken={setToken} />} />
                <Route path="/products" element={<Products token={token} setToken={setToken} />} />
                <Route
                    path="/login"
                    element={<Login setToken={setToken} setIsAdmin={setIsAdmin} />}
                />
                <Route
                    path="/logout"
                    element={<Logout setToken={setToken} setIsAdmin={setIsAdmin} />}
                />
                <Route path="/products/:id" element={<SingleProduct token={token} setToken={setToken} />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute isAdmin={isAdmin}>
                            <DashBoard token={token} />
                        </ProtectedRoute>
                    }
                >
                    <Route path="users" element={<UsersDashboard token={token} />} />
                    <Route
                        path="products"
                        element={<ProductsDashboard token={token} />}
                    />
                </Route>
                <Route path="/cart" element={<Cart token={token} setToken={setToken} />} />
            </Routes>
        </div>
    )
}