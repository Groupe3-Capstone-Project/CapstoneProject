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




export default function MainContainer() {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [userId, setUserId] = window.localStorage.getItem("userId")

    return (
        <div >
             < NavBar token={token} setToken={setToken} />
            <Routes>
                <Route path="/" element={<WelcomePage token={token} setToken={setToken} />} />
                <Route path="/register" element={<Register token={token} setToken={setToken} />} />
                <Route path="/products" element={<Products userId={userId} token={token} setToken={setToken} />} />
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/logout" element={<Logout setToken={setToken} />} />
                <Route path="/products/:id" element={<SingleProduct token={token} setToken={setToken} />} />
                <Route path="/cart" element={<Cart token={token} setToken={setToken} />} />
            </Routes>
        </div>
    )
}