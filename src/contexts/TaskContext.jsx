import { createContext, useContext, useState, useEffect } from 'react';
import { getAllTasks } from '../apis/TaskApis';
import { useSocket } from './SocketContext';

const TaskContext = createContext();
export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const socket=useSocket();

  const fetchTasks = async () => {
    try {
      const response = await getAllTasks();
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Fetching tasks failed', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (!socket) return;               

    const handleTaskUpdated = (updatedTask) => {
      setTasks(prev =>
        prev.map(t => (t._id === updatedTask._id ? { ...t, ...updatedTask } : t))
      );
    };

    //listen update task event(for owner and collaborator)
    socket.on('taskUpdated', handleTaskUpdated);

    const handleTaskDeleted = ({ _id }) => {
      setTasks(prev => prev.filter(t => t._id !== _id));
    };

    //listen delete task event(for collaborator)
    socket.on('taskDeleted', handleTaskDeleted);

    return () => {
      socket.off('taskUpdated', handleTaskUpdated);
      socket.off('taskDeleted', handleTaskDeleted);
    };
  }, [socket, setTasks]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
