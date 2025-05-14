import axios from "axios";
import { TaskApiClient } from "./clients/TaskApiClient";

const TaskUrl=import.meta.env.VITE_TASK_URL;

//Add task Api function
export const addTask=async(data)=>{

    return TaskApiClient.post('',data);
 }
//Update Task Api Function
 export const updateTask = async (taskId, updatedFields) => {
    return TaskApiClient.patch(`/${taskId}`, updatedFields);
  }

  //Delete task Api call
  export const deleteTask= async(taskId)=>{
    return TaskApiClient.delete(`/${taskId}`);
  }

  //Get tasks Api call
  export const getAllTasks=async()=>{
    return TaskApiClient.get('')
  }

  export const shareTask=async(taskId,email,setLoading)=>{
    setLoading(true);
    return TaskApiClient.post(`/${taskId}`, email);
  }