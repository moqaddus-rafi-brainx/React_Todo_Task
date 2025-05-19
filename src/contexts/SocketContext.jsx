import { createContext, useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';

const SocketContext = createContext(null);
export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }) {
  const socketRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const { id: userId } = jwtDecode(token);

    socketRef.current = io(import.meta.env.VITE_BACKEND_URL);

    //register after connection
    socketRef.current.on('connect', () => {
      socketRef.current.emit('register', userId);
    });

    return () => socketRef.current.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
}
