import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
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
import Checkout from "./Checkout";



export default function MainContainer({ userId, setUserId }) {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    // const [userId, setUserId] = useState(window.localStorage.getItem("userId"));
    const [isAdmin, setIsAdmin] = useState(window.localStorage.getItem("isAdmin"));


    return (
        <div>
            <NavBar token={token} setToken={setToken} isAdmin={isAdmin} />
            <Routes>
                <Route path="/" element={<WelcomePage token={token} setToken={setToken} />} />
                <Route path="/register" element={<Register token={token} setToken={setToken} setUserId={setUserId} />} />
                <Route path="/products" element={<Products userId={userId} token={token} setToken={setToken} />} />
                <Route path="/login" element={<Login setToken={setToken} setIsAdmin={setIsAdmin} setUserId={setUserId} />} />
                <Route path="/logout" element={<Logout setToken={setToken} setIsAdmin={setIsAdmin} />} />
                <Route path="/products/:id" element={<SingleProduct token={token} setToken={setToken} />} />
                <Route path="/checkout" element={<Checkout token={token} setToken={setToken} />} />
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
                        element={<ProductsDashboard userId={userId} token={token} />}
                    />
                </Route>
                <Route path="/cart" element={<Cart token={token} setToken={setToken} />} />
            </Routes>
        </div>
    )
}