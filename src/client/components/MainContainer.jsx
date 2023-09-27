import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./Home"
import Register from "./Register"
import Login from "./Login"

import WelcomePage from "./WelcomePage";
import Products from "./Products";
import SingleProduct from "./SingleProduct";




export default function MainContainer() {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    return (
        <div>
            <Routes>
                <Route path="/" element={<WelcomePage token={token} setToken={setToken} />} />
                <Route path="/home" element={<Home token={token} setToken={setToken} />} />
                <Route path="/register" element={<Register setToken={setToken} />} />
                <Route path="/products" element={<Products token={token} setToken={setToken} />} />
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/products/:id" element={<SingleProduct token={token} setToken={setToken} />} />
            </Routes>
        </div>
    )
}