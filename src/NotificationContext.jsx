// NotificationContext.jsx (Working version)
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';

const NotificationContext = createContext();
const backendUrl=import.meta.env.VITE_BACKEND_URL;
export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    // Load from localStorage on initial load
    const stored = localStorage.getItem('notifications');
    return stored ? JSON.parse(stored) : [];
  })

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    let userId;
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id;
    } catch (err) {
      console.error('Invalid token', err);
      return;
    }

    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
      socket.emit('register', userId);
      console.log('Socket connected and user registered:', userId);
    });

    socket.on('notification', (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      socket.off('connect');
      socket.off('notification');
      socket.disconnect();
    };
  }, []);

  // Save to localStorage whenever notifications change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);


  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{ notifications,clearNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
