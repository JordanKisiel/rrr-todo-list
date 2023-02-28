import { Container, Paper } from "@mui/material"
import AddTask from "./components/AddTask"
import Header from "./components/Header"
import TaskList from "./components/TaskList"
import defaultTasks from "./data/defaultTasks.json"
import { useEffect, useState } from "react"

function App() {
  /*
    TODO:
    -add edit task functionality
      -this will require some state change of the task:
        -whether it's in editing mode or not
          -this will allow me to conditionally render a text input or the task description
          -which means that I need to update my data format
        -I'll also need some state to hold the text input for the editing mode
        -I'll also need the editing button to change from edit to some form of submit button
        -I'll also need to make sure that when one editing button is clicked, all other tasks leave edit mode
  */

  const [newTask, setNewTask] = useState("")
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("storedTasks")) || defaultTasks.tasks
  })

  useEffect(() => {
    const stringifiedTasks = JSON.stringify(tasks)

    localStorage.setItem("storedTasks", stringifiedTasks)
  }, [tasks])

  function handleTaskInput(input) {
    setNewTask(input)
  }

  function handleCheckTask(taskId) {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id !== taskId) {
          return task
        } else {
          return {
            ...task,
            isDone: !task.isDone,
          }
        }
      })
    })
  }

  function handleDeleteTask(taskId) {
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => {
        return task.id !== taskId
      })
    })
  }

  function handleAddTask(taskId, taskDesc) {
    setTasks((prevTasks) => {
      return [
        ...prevTasks,
        {
          id: taskId,
          isDone: false,
          taskDescription: taskDesc,
        },
      ]
    })

    setNewTask("") //empty out input after adding task
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
          handleDeleteTask={handleDeleteTask}
          handleCheckTask={handleCheckTask}
        />
      </Paper>
    </Container>
  )
}

export default App
