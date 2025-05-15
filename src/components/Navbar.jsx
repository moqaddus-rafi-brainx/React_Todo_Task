import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useNotifications } from '../NotificationContext';

const Navbar = () => {
  const { notifications,clearNotifications } = useNotifications();
  console.log('notification', notifications)
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  

  const handleChangePassword=()=>{
    navigate('/change-password');
  }



  return (
    <nav className="navbar">
      <div className="navbar-title">My Todo App</div>
      <div className="navbar-buttons">
  <span className="bell-wrapper">
    <button className="no-bg" onClick={() => setOpen(!open)}>
      <i className="bi bi-bell bell">
        {notifications.length > 0 && (
          <span className="badge">{notifications.length}</span>
        )}
      </i>
    </button>

    {open && notifications.length > 0 && (
      <div className="dropdown">
        {notifications.map((n, i) => (
          <div key={i} className="dropdown-item">
          <div className="message-text">{n.message}</div>
          <div className="timestamp">{new Date(n.timestamp).toLocaleString()}</div>
        </div>
          
        ))}
        <div className="dropdown-item mark-read" onClick={() => { clearNotifications();  setOpen(false); }}>
          Mark all as read
        </div>
      </div>
    )}
  </span>

  <button onClick={handleLogout}>Logout</button>
  <button onClick={handleChangePassword}>Change Password</button>
</div>

    </nav>
  );
};

export default Navbar;
