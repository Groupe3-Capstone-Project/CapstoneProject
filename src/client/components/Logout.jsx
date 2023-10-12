import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout({ setToken, setIsAdmin }) {
  const navigate = useNavigate();
  useEffect(() => {
    setToken(null);
    setIsAdmin(null);
    window.localStorage.clear();
    navigate("/");
    window.location.reload();
  }, []);
}

export default Logout;
