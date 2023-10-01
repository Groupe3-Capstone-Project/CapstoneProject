import React from 'react';
import { useNavigate } from "react-router-dom";



function Logout({setToken}) {
  const navigate = useNavigate();
  const handleLogout = () => {
    setToken(null);
    window.localStorage.clear();
    navigate("/");
  };

  return (
    <div className="logout-container">
      <h2 className='logout-header'>Logout</h2>
      <button type="button" onClick={handleLogout} className='button-logout'>
        Logout
      </button>
    </div>
  );
}

export default Logout;
