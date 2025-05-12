import Task from "./Task";
import axios from "axios";
import { useState ,useEffect} from "react";
import { useLocation } from 'react-router-dom';
import { addTask,getAllTasks } from "../apis/TaskApis";


//List of all the tasks plus adding task input
function TaskList()
{
   const [tasks,setTasks]=useState([]);
   const [input,setInput]=useState();

   const location = useLocation();
   const tokenFromNav = location.state?.token; //saved by login function

   //All tasks from backend taken for first time
   useEffect(()=>{
      const fetchTasks = async () => {
         try {
           const response = await getAllTasks(tokenFromNav);
           setTasks(response.data.tasks);
         } catch (error) {
           console.log('Getting all tasks error', error);
         }
       };

      fetchTasks();

   },[])

   const handleAddTask = async (e) => {
      if (e.key === 'Enter') {
        try {
          const response = await addTask(tokenFromNav, input);
          setTasks([...tasks, response.data.task]);
        } catch (error) {
          console.error('Add task error:', error);
        }
      }
    };

   return(
        <div>
            <input  type="text" id="task-input" placeholder="Input task and then press Enter to add" onChange={(e)=>{setInput(e.target.value)}} onKeyDown={handleAddTask}/>
            <hr/>
            <ul id="task-list">
               { tasks.map (task=>(
                  <Task key={task._id} task={task} tasks={tasks} setTasks={setTasks} />
               ))}
            </ul>
        </div>
   )
   
}

export default TaskList;