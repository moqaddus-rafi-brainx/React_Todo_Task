import TaskList from "../components/TaskList";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";


//Main page after login
function Home()
{
    const navigate = useNavigate();
    const [loading,setLoading]=useState();
    const [token,setToken]=useState();
    const storedToken = localStorage.getItem('token');

    useEffect(() => {
      if (storedToken) {
        setToken(storedToken);
      }
      setLoading(false); // done loading
    }, []);
  

    //If unauthorized access is made
    useEffect(() => {
        if (!storedToken) {
          navigate('/login');
        }
      }, [navigate, storedToken]);
    
      if (!storedToken) return null;
    
    if (loading) return <p>Loading...</p>;

    return(
      <>
    <Navbar />
    <div className="todo-container">
        <h1>MY Todo App</h1>
    <TaskList token={token}/>
    </div>
    </>
    )
}

export default Home;