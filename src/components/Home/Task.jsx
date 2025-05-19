import { useState,useEffect,useRef } from "react";
import { useLocation } from "react-router-dom";
import { updateTask,deleteTask,shareTask } from "../../apis/TaskApis";
import {jwtDecode} from "jwt-decode";
import ShareModal from "./ShareModal";
import { useTaskContext } from "../../contexts/TaskContext";



//Component for each task
function Task({task,token})
{
    const { setTasks } = useTaskContext();       
    const [hide,setHide]= useState(true);
    const [input,setInput]= useState(task.description);
    const [sharing,setSharing]=useState(false);
    const [emailToShare,setEmailToShare]=useState("");//Email of the recipient/collaborator
    const [loading,setLoading]=useState(false);
    const [backendError,setBackendError]=useState("");
    //let isFirstRender = useRef(true);
    const decoded = jwtDecode(token);
    const isOwner = task.userId === decoded.id;

    //update task function
    const handleUpdateTask = async () => {
        try {
          const response = await updateTask(task._id, {
            description: input,
            isCompleted: task.isCompleted,
          });
      
          setTasks(prevTasks =>
            prevTasks.map(t =>
              t._id === task._id ? response.data.task : t
            )
          );
          setHide(true);
        } catch (error) {
          console.error('Update task error:', error);
        }
      };

    //button to update clicked
    const startUpdate=()=>{
        setHide(false)
        setInput(task.description)
    }
    //enter pressed for saving the changes
    const updateOnKeyDown=async(e)=>{
        if(e.key=='Enter')
        {
            handleUpdateTask();
        }
    }

    //delete task function
    const handleDeleteTask=async()=>{

        try {
            await deleteTask(task._id);
        
            setTasks(prevTasks =>
              prevTasks.filter(t => t._id !== task._id)
            );
          } catch (error) {
            console.error('Delete task error:', error);
          }
    }

    //Toggle completed status
  const toggleCompleted = async () => {
    try {
      await updateTask(task._id, { 
        description: task.description, 
        isCompleted: !task.isCompleted 
      });
    } catch (error) {
      console.error("Toggle complete failed:", error);
    }
  };

    const handleShareTask=async()=>{
      try {
        setBackendError("");
        const response = await shareTask(task._id, {
          email:emailToShare
      },setLoading)
      setEmailToShare("");
      setLoading(false);
      setSharing(false);

    }catch (error) {
      console.error('Share task error:', error.response.data?.message);
      setBackendError(error.response.data?.message || error.message)
      setLoading(false);

    }
    
  }

    return(
    <li>
        <div className="task-left">
            <input type="checkbox" checked={task.isCompleted} onChange={toggleCompleted}  />
            {!hide && <input type="text" className="update-input" value={input} onChange={(e)=>{setInput(e.target.value)}} onBlur={handleUpdateTask} onKeyDown={updateOnKeyDown} />}
            {hide && <span className={task.isCompleted? "completed": "incomplete"}>{task.description}</span>}
        </div>
        <div className="task-right">
          <i className="bi bi-pencil-square" onClick={startUpdate} ></i>
          {isOwner && (
          <>
            <i className="bi bi-trash" onClick={handleDeleteTask} ></i>
            <i className="bi bi-share" onClick={() => setSharing(true)}></i>
            {sharing && (
                
                <ShareModal
                  onClose={() => setSharing(false)}
                  onShare={handleShareTask}
                  email={emailToShare}
                  setEmail={setEmailToShare}
                  loading={loading}
                  backendError={backendError}
                />
            )}
          </>
        )}
        </div>
    </li>
    )
}

export default Task;