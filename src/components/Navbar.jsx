import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  ///To share your tasks with other users
  const handleShare = () => {
  };

  const handleChangePassword=()=>{
    navigate('/change-password');
  }



  return (
    <nav className="navbar">
      <div className="navbar-title">My Todo App</div>
      <div className="navbar-buttons">
        <button onClick={handleShare}>Share</button>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
    </nav>
  );
};

export default Navbar;
