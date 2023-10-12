import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
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

export default function MainContainer({
  userId,
  setUserId,
  token,
  setToken,
  isAdmin,
  setIsAdmin,
}) {
  return (
    <div>
      <NavBar
        token={token}
        setToken={setToken}
        isAdmin={isAdmin}
        setUserId={setUserId}
        setIsAdmin={setIsAdmin}
      />
      <Routes>
        <Route
          path="/"
          element={<WelcomePage token={token} setToken={setToken} />}
        />
        <Route
          path="/register"
          element={
            <Register
              token={token}
              setToken={setToken}
              setUserId={setUserId}
              setIsAdmin={setIsAdmin}
            />
          }
        />
        <Route
          path="/products"
          element={
            <Products userId={userId} token={token} setToken={setToken} />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setToken={setToken}
              setIsAdmin={setIsAdmin}
              setUserId={setUserId}
            />
          }
        />
        <Route
          path="/products/:id"
          element={
            <SingleProduct token={token} setToken={setToken} userId={userId} />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout userId={userId} token={token} setToken={setToken} />
          }
        />
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
        <Route
          path="/cart"
          element={<Cart token={token} setToken={setToken} />}
        />
      </Routes>
    </div>
  );
}
