import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout({ setToken, setIsAdmin }) {
  const navigate = useNavigate();
  useEffect(() => {
    setToken(null);
    setIsAdmin(null);
    window.localStorage.clear();
    navigate("/");
  }, []);
}

export default Logout;
