import axios from "axios";

const TaskUrl=import.meta.env.VITE_TASK_URL;

//Add task Api function
export const addTask=async(tokenFromNav,data)=>{
   
    return axios.post(`${TaskUrl}`,data, {
       headers: {
          Authorization: `Bearer ${tokenFromNav}`
        },          
    })
 }
//Update Task Api Function
 export const updateTask = async (token, taskId, updatedFields) => {
    return axios.patch(`${TaskUrl}/${taskId}`, updatedFields, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  //Delete task Api call
  export const deleteTask= async(tokenFromNav,taskId)=>{
    return axios.delete(`${TaskUrl}/${taskId}`, {
        headers: {
           Authorization: `Bearer ${tokenFromNav}`
         },          
     });
  }

  //Get tasks Api call
  export const getAllTasks=async(tokenFromNav)=>{
    return axios.get(`${TaskUrl}`, {
        headers: {
           Authorization: `Bearer ${tokenFromNav}`
         }
     })
  }

  export const shareTask=async(taskId,email,token,setLoading)=>{
    setLoading(true);
    return axios.post(`${TaskUrl}/${taskId}`, email, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }