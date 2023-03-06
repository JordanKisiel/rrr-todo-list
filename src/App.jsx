import { Container, Paper } from "@mui/material"
import AddTask from "./components/AddTask"
import Header from "./components/Header"
import TaskList from "./components/TaskList"
import defaultTasks from "./data/defaultTasks.json"
import { useEffect, useState, useReducer } from "react"
import tasksReducer from "./reducers/TasksReducer"

function App() {
  const [newTask, setNewTask] = useState("")
  const [tasks, dispatch] = useReducer(tasksReducer, null, () => {
    return JSON.parse(localStorage.getItem("storedTasks")) || defaultTasks.tasks
  })
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [editingTaskInput, setEditingTaskInput] = useState("")

  useEffect(() => {
    const stringifiedTasks = JSON.stringify(tasks)

    localStorage.setItem("storedTasks", stringifiedTasks)
  }, [tasks])

  function handleTaskInput(input) {
    setNewTask(input)
  }

  function handleCheckTask(taskId) {
    dispatch({
      type: "check_task",
      taskId: taskId,
    })
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: "delete_task",
      taskId: taskId,
    })
  }

  function handleAddTask(taskId, taskDesc) {
    dispatch({
      type: "add_task",
      taskId: taskId,
      taskDesc: taskDesc,
    })

    setNewTask("") //empty out input after adding task
  }

  function handleEnterEditMode(taskId, taskDesc) {
    setEditingTaskId(taskId)
    setEditingTaskInput(taskDesc)
  }

  function handleEditTask(input) {
    setEditingTaskInput(input)

    dispatch({
      type: "edit_task",
      editingTaskId: editingTaskId,
      input: input,
    })
  }

  function handleSubmitEdit() {
    setEditingTaskId(null)
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={0}>
        <Header />
      </Paper>
      <Paper elevation={10}>
        <AddTask
          newTask={newTask}
          handleTaskInput={handleTaskInput}
          handleAddTask={handleAddTask}
        />
      </Paper>
      <Paper elevation={3}>
        <TaskList
          tasks={tasks}
          editingTaskId={editingTaskId}
          editingTaskInput={editingTaskInput}
          handleDeleteTask={handleDeleteTask}
          handleCheckTask={handleCheckTask}
          handleEnterEditMode={handleEnterEditMode}
          handleEditTask={handleEditTask}
          handleSubmitEdit={handleSubmitEdit}
        />
      </Paper>
    </Container>
  )
}

export default App
