import { useState,useEffect,useRef } from "react";
import axios from "axios";

const token=localStorage.getItem('token');

//Component for each task
function Task({task, tasks, setTasks})
{
    const [hide,setHide]= useState(true);
    const [input,setInput]= useState(task.description);
    const [marked,setMarked]=useState(task.isCompleted); //for marking as completed
    let isFirstRender = useRef(true);
    
    //update task function
    const updateTask=()=>{
        axios.patch(`http://localhost:3000/api/tasks/${task._id}`,{
             description: input,
             isCompleted: marked
            }, {
            headers: {
               Authorization: `Bearer ${token}`
             },          
         })
         .then(response => {
            setTasks(prevTasks =>
                prevTasks.map(t => t._id === task._id ? response.data.task : t)
              );
            setHide(true);
          })
          .catch(error => {
            console.error(error);
          });
    }
    //button to update clicked
    const startUpdate=()=>{
        setHide(false)
        setInput(task.description)
    }
    //enter preesed for saving the changes
    const updateOnKeyDown=(e)=>{
        if(e.key=='Enter')
        {
            updateTask();
        }
    }

    //delete task function
    const deleteTask=()=>{

        axios.delete(`http://localhost:3000/api/tasks/${task._id}`, {
            headers: {
               Authorization: `Bearer ${token}`
             },          
         })
         .then(response => {
           
            setTasks(prevTasks =>
                prevTasks.filter(t => t._id !== task._id)
              );
          })
          .catch(error => {
            console.error(error);
          });

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
        updateTask();
    },[marked])

    return(
    <li>
        <div className="task-left">
            <input type="checkbox" checked={marked} onChange={markTaskAsCompleted}  />
            {!hide && <input type="text" className="update-input" value={input} onChange={(e)=>{setInput(e.target.value)}} onBlur={updateTask} onKeyDown={updateOnKeyDown} />}
            {hide && <span className={marked? "completed": "incomplete"}>{task.description}</span>}
        </div>
        <div className="task-right">
          <i className="bi bi-pencil-square" onClick={startUpdate} ></i>
          <i className="bi bi-trash" onClick={deleteTask} ></i>
        </div>
    </li>
    )
}

export default Task;