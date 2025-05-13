import { useState,useEffect,useRef } from "react";
import { useLocation } from "react-router-dom";
import { updateTask,deleteTask } from "../apis/TaskApis";


//Component for each task
function Task({task, tasks, setTasks ,token})
{
    const [hide,setHide]= useState(true);
    const [input,setInput]= useState(task.description);
    const [marked,setMarked]=useState(task.isCompleted); //for marking as completed
    let isFirstRender = useRef(true);
    
    //update task function
    const handleUpdateTask = async () => {
        try {
          const response = await updateTask(token, task._id, {
            description: input,
            isCompleted: marked,
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
            await deleteTask(token, task._id);
        
            setTasks(prevTasks =>
              prevTasks.filter(t => t._id !== task._id)
            );
          } catch (error) {
            console.error('Delete task error:', error);
          }

    }

    //Checked/Unchecked
    const markTaskAsCompleted=()=>{
        if(marked==true)
        {
            setMarked(false);
        }
        else if(marked==false)
        {
            setMarked(true);
        }
    }
    useEffect(()=>{ //DOnt call the updateTask for the first time//when component rendered
        if(isFirstRender.current)
        {
            isFirstRender.current=false;
            return;
        }
        handleUpdateTask();
    },[marked])

    return(
    <li>
        <div className="task-left">
            <input type="checkbox" checked={marked} onChange={markTaskAsCompleted}  />
            {!hide && <input type="text" className="update-input" value={input} onChange={(e)=>{setInput(e.target.value)}} onBlur={handleUpdateTask} onKeyDown={updateOnKeyDown} />}
            {hide && <span className={marked? "completed": "incomplete"}>{task.description}</span>}
        </div>
        <div className="task-right">
          <i className="bi bi-pencil-square" onClick={startUpdate} ></i>
          <i className="bi bi-trash" onClick={handleDeleteTask} ></i>
        </div>
    </li>
    )
}

export default Task;