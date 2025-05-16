import Task from "./Task";
import { useState ,useEffect} from "react";
import { addTask,getAllTasks } from "../../apis/TaskApis";



//List of all the tasks plus adding task input
function TaskList({ token })
{
   const [tasks,setTasks]=useState([]);
   const [input,setInput]=useState("");
   const [deadline,setDeadline] =useState("");
   const [error,setError]=useState("");
  
  // Fetch tasks only when token is available
  useEffect(() => {
    if (!token) return;
    const fetchTasks = async () => {
      try {
        const response = await getAllTasks();
        setTasks(response.data.tasks);
      } catch (error) {
        console.log('Getting all tasks error', error);
      }
    };
  
    fetchTasks();
  }, [token]);

  //Add task after selection of date
  const handleDateBlur=async(e)=>{
    if(!deadline)
      {
        setError('Select deadline')
      }
    else if(!input || input.trim()=="")
      {
        setError('Enter Task');
        console.error('Task input not set' )
        return
      }
      
      else
      {
        callAddTask();
        setError("");
      }

  }

  const callAddTask =async()=>{
    try {
      const data={
        description:input,
        deadline:deadline,
      }
      const response = await addTask( data);
      setInput("");
      setDeadline("");
      setTasks([...tasks, response.data.task]);
    } catch (error) {
      console.error('Add task error:', error);
    }
  }
  
    //Add task after adding input
   const handleAddTask = async (e) => {
      if(e.key!=='Enter')
      {
        setError("");
        return;
      }
      if (e.key === 'Enter' && deadline && input) {
        callAddTask(); 
      }
      else if(e.key === 'Enter' && !deadline)
      {
        setError('Select a deadline');
        console.error('Deadline not set' )
      }
      else if(e.key === 'Enter' && !input)
        {
          setError('Enter Task');
          console.error('Task input not set' )
        }

    };

   return(
        <div>
            <div className="input-date">
              <input  type="text" className="task-input" value={input} placeholder="Input task" onChange={(e)=>{setInput(e.target.value)}} onKeyDown={handleAddTask}/>
              <input type="datetime-local" className="task-deadline task-input" placeholder="input deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} onBlur={handleDateBlur}/>
            </div>
            {error && <div className="error-prompt">{error}</div>}
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