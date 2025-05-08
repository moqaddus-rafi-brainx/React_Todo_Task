import TaskList from "./TaskList";

//MAIN COMPONENT
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