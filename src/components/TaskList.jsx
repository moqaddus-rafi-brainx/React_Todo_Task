import Task from "./Task";
import axios from "axios";
import { useState ,useEffect} from "react";

//token got after user login
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODFjMzBkMTBjMGQyZGRlZDA1NWJiY2EiLCJpYXQiOjE3NDY2Nzc5Njl9.eMI7QxfHLpjG2VeQlNjivYgvXbu9mwZn3awDVR-rjio"
localStorage.setItem("token",token);

function TaskList()
{
   const [tasks,setTasks]=useState([]);
   const [input,setInput]=useState();

   useEffect(()=>{
      axios.get('http://localhost:3000/api/tasks', {
         headers: {
            Authorization: `Bearer ${token}`
          }
      })
.then(response => {
  console.log(response.data);
  setTasks(response.data.tasks);
})
.catch(error => {
  console.error(error);
});
   },[])

   const addTask=async(e)=>{
      if(e.key=='Enter')
      {
      axios.post('http://localhost:3000/api/tasks',{ description: input }, {
         headers: {
            Authorization: `Bearer ${token}`
          },          
      })
      .then(response => {
         console.log(response.data);
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