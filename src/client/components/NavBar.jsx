import React from "react";
import { Link } from "react-router-dom";


export default function NavBar() {

    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/logout">Logout</Link>
        </div>
    )
}