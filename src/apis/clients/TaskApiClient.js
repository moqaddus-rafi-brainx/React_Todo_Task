import axios from 'axios';
const TaskUrl=import.meta.env.VITE_TASK_URL;

export const TaskApiClient = axios.create({
  baseURL: TaskUrl,
});

TaskApiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
