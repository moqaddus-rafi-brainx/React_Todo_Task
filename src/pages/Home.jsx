import TaskList from "../components/Home/TaskList";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { NotificationProvider } from "../NotificationContext";


//Main page after login
function Home()
{
    const [loading,setLoading]=useState();
    const [token,setToken]=useState();
    const storedToken = localStorage.getItem('token');
    const username=localStorage.getItem('name');

    useEffect(() => {
      if (storedToken) {
        setToken(storedToken);
      }
      setLoading(false); // done loading
    }, []);
  
    if (loading) return <p>Loading...</p>;

    return(
      <>
    <NotificationProvider>
      <Navbar/>
      </NotificationProvider>
    <div className="todo-container">
        <h1>{username}'s Todo App</h1>
    <TaskList token={token}/>
    </div>
    </>
    )
}

export default Home;