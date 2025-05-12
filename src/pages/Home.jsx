import TaskList from "../components/TaskList";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";


//Main page after login
function Home()
{
    const location = useLocation();
    const tokenFromNav = location.state?.token; //saved by login function
    const navigate = useNavigate();

    //If unauthorized access is made
    useEffect(() => {
        if (!tokenFromNav) {
          navigate('/login');
        }
      }, [navigate, tokenFromNav]);
    
      if (!tokenFromNav) return null;
    

    return(
    <div className="todo-container">
        <h1>MY Todo App</h1>
    <TaskList/>
    </div>
    )
}

export default Home;