import Task from "./Task";
import axios from "axios";
import { useState ,useEffect} from "react";
import { useLocation } from 'react-router-dom';
import { addTask,getAllTasks } from "../../apis/TaskApis";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";


//List of all the tasks plus adding task input
function TaskList({ token })
{
   const [tasks,setTasks]=useState([]);
   const [input,setInput]=useState("");
   const [deadline,setDeadline] =useState("");
  
  // Fetch tasks only when token is available
  useEffect(() => {
    if (!token) return;
    const fetchTasks = async () => {
      try {
        const response = await getAllTasks(token);
        setTasks(response.data.tasks);
      } catch (error) {
        console.log('Getting all tasks error', error);
      }
    };
  
    fetchTasks();
  }, [token]);
  

   const handleAddTask = async (e) => {
      if (e.key === 'Enter' && deadline) {
        try {
          const data={
            description:input,
            deadline:deadline,
          }
          const response = await addTask(token, data);
          setInput("");
          setDeadline("");
          setTasks([...tasks, response.data.task]);
        } catch (error) {
          console.error('Add task error:', error);
        }
      }
      else if(e.key === 'Enter' && !deadline)
      {
        console.error('Deadline not set' )
      }
    };

   return(
        <div>
            <div className="input-date">
              <input  type="text" className="task-input" value={input} placeholder="Input task and then press Enter to add" onChange={(e)=>{setInput(e.target.value)}} onKeyDown={handleAddTask}/>
              <input type="datetime-local" className="task-deadline task-input" value={deadline} onChange={(e) => setDeadline(e.target.value)}/>
            </div>
            <hr/>
            <ul id="task-list">
               { tasks.map (task=>(
                  <Task key={task._id} task={task} tasks={tasks} setTasks={setTasks} token={token} />
               ))}
            </ul>
        </div>
   )
   
}

export default TaskList;