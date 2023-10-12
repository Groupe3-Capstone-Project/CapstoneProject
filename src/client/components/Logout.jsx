import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout({ setToken, setIsAdmin, setUserId }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear state
    setToken(null);
    setUserId(null);
    setIsAdmin(null);
    // Clear user-related information from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");

    console.log("from logout!!!")
    // Redirect to the home page
    navigate("/");
  }, [setToken, setIsAdmin, setUserId, navigate]);

  return (
    <div>
      Logging out...
    </div>
  );
}

export default Logout;