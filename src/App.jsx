import { useRef, useState } from "react"
import { addTask, toggleTask, deleteTask, editTask } from "./slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import Switch from "react-switch"

const App = () => {
  const dispatch = useDispatch();
  const [taskFeedback, setTaskFeedback] = useState("Task Feedback");
  const [taskId, setTaskId] = useState(-1);

  // const tasks = JSON.parse(JSON.stringify(useSelector((state)=>state.tasks)))
  const tasks = useSelector((state)=>state.tasks.slice())
  console.log(`Test Get Tasks: ${tasks}`)

  const taskAttr = useRef({
    taskName:useRef(null),
    taskDesc:useRef(null)
  });

  const handleOnChange = (e) => {
    const {name, value} = e.target;
    taskAttr.current[name] = value;
  }

  const handleAddTask = () => {
    console.log(`taskAttr ${taskAttr.current}`)
    const {taskName,taskDesc} = taskAttr.current;
    console.log(`Getting what? ${taskName} ${taskDesc}`)
    if(!taskName.current.value || !taskDesc.current.value){
      setTaskFeedback("Please Fill All the Fields");
      setTimeout(()=>{
        setTaskFeedback("Task Feedback")
      },3000)
    }
    else{
      const taskData = {
        taskName:taskName.current.value,
        taskDesc:taskDesc.current.value,
        taskCompleted:false
      }
    console.log("taskData", taskData)
      dispatch(addTask(taskData));
      setTaskFeedback("Task Added Successfully!")
      setTimeout(()=>{
        setTaskFeedback("Task Feedback")
      },3000)
      taskAttr.current.taskName.current.value = "";
      taskAttr.current.taskDesc.current.value = "";
    }
  }

  const handleDeleteTask = (taskName) => {
    console.log(`Button Task Name? ${taskName}`)
    dispatch(deleteTask(taskName))
  }

  const handleToggleTask = (id) => {
    console.log("id", id)
    dispatch(toggleTask(id));
  }

  const handleEditTask = (taskName, taskId) => {
    const editTaskTemp = tasks.find((task)=>task.taskName === taskName)
    taskAttr.current.taskName.current.value = editTaskTemp.taskName;
    taskAttr.current.taskDesc.current.value = editTaskTemp.taskDesc;
    setTaskId(taskId);
  }

  const handleUpdateTask = () => {
    const {taskName,taskDesc} = taskAttr.current;
    const taskData = {
      taskId,
      taskName:taskName.current.value,
      taskDesc:taskDesc.current.value,
    }
    dispatch(editTask(taskData))
    if(taskName.current.value && taskDesc.current.value){
      setTaskFeedback("Task Details Updated Successfully")
      setTimeout(()=>{
        setTaskFeedback("Task Feedback")
      },3000)
    }
    taskAttr.current.taskName.current.value = "";
    taskAttr.current.taskDesc.current.value = "";
  }

  return (
    <>
    <div style={{margin:"2rem"}}>
      <h1>Task Manager</h1>
      <h2>Add Tasks</h2>
      <input type="text" placeholder="Task Name" ref={taskAttr.current.taskName} onChange={handleOnChange}/>
      <hr />
      <textarea type="text" placeholder="Task Description" ref={taskAttr.current.taskDesc} onChange={handleOnChange} rows="10" cols="100"/>
      <br />
      <button onClick={handleAddTask} style={{backgroundColor:"grey", margin:"2rem 2rem"}}>Add Task</button>
      <button onClick={()=>handleDeleteTask(taskAttr.current.taskName.current.value)} style={{backgroundColor:"grey", margin:"2rem 2rem"}}>Delete Task</button>
      <button onClick={()=>handleUpdateTask(taskAttr.current.taskName.current.value)} style={{backgroundColor:"grey", margin:"2rem 2rem"}}>Update Task</button>
      <h3>{taskFeedback}</h3>

      <h2>Task Details</h2>
      <div>
        {
          tasks.map((task, id)=>{
            const {taskName, taskDesc, taskCompleted} = task;
            return(
            <>
            <h5>Task Name: {taskName}</h5>
            <h6>Task Description: {taskDesc}</h6>
            <h6>Task Status: {taskCompleted?"Completed":"Incomplete"}</h6>
            <Switch
              key={id}
              checked={taskCompleted}
              onChange={()=>handleToggleTask(id)}
            />
            <button onClick={()=>handleDeleteTask(taskName)} style={{backgroundColor:"grey"}}>Delete</button>
            <button onClick={()=>handleEditTask(taskName,id)} style={{backgroundColor:"grey"}}>Edit</button>
            {/* <button onClick={()=>handleToggleTask(id)}>Toggle</button> */}
            </>
            )
          })
        }
      </div>
    </div>
    </>
  )
}

export default App