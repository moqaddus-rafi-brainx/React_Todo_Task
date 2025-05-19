import { createContext, useContext, useEffect, useState } from 'react';
import { useTaskContext } from './TaskContext';
import { useSocket } from './SocketContext';

//Notification Context for Navbar
const NotificationContext = createContext();
export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState(() => {
    const stored = localStorage.getItem('notifications'); //load the already stored notifications
    return stored ? JSON.parse(stored) : [];
  })

  const socket = useSocket();
  const { fetchTasks } = useTaskContext();

  useEffect(() => {
    console.log('NotificationProvider mounted');
  }, []);

  useEffect(() => {
    if(!socket) return;

  const handleShare = (n) => {
    setNotifications(prev => [n, ...prev]);
    fetchTasks();
  };

  const handleDeadline = (n) => {
    setNotifications(prev => [n, ...prev]);
  };

  socket.on('shareNotification', handleShare);
  socket.on('deadlineNotification', handleDeadline);

  return () => {
    socket.off('shareNotification', handleShare);
    socket.off('deadlineNotification', handleDeadline);
  };
  }, [socket]);


  //Save to localStorage whenever notifications change (for making refresh resistent)
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
