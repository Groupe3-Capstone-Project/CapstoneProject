import React from "react";
import { Routes, Route } from "react-router-dom";




export default function MainContainer() {
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </div>
    )
}