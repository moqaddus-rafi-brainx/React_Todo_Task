import Task from "./Task";
import axios from "axios";
import { useState ,useEffect} from "react";

//token got after user login
const token=import.meta.env.VITE_TOKEN;
localStorage.setItem("token",token);

//List of all the tasks plus adding task input
function TaskList()
{
   const [tasks,setTasks]=useState([]);
   const [input,setInput]=useState();
   //All tasks from backend taken for first time
   useEffect(()=>{
      axios.get('http://localhost:3000/api/tasks', {
         headers: {
            Authorization: `Bearer ${token}`
          }
      })
.then(response => {
  setTasks(response.data.tasks);
})
.catch(error => {
  console.error(error);
});
   },[])
   //Add task function
   const addTask=async(e)=>{
      if(e.key=='Enter')
      {
      axios.post('http://localhost:3000/api/tasks',{ description: input }, {
         headers: {
            Authorization: `Bearer ${token}`
          },          
      })
      .then(response => {
         setTasks([...tasks, response.data.task])
       })
       .catch(error => {
         console.error(error);
       });
      }
      

   }

   return(
        <div>
            <input  type="text" id="task-input" placeholder="Input task and then press Enter to add" onChange={(e)=>{setInput(e.target.value)}} onKeyDown={addTask}/>
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