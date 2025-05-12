import TaskList from "../components/TaskList";

//Main page after login
function Home()
{
    return(
    <div className="todo-container">
        <h1>MY Todo App</h1>
    <TaskList/>
    </div>
    )
}

export default Home;