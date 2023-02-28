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
        -I'll also need the editing button to change from edit to some form of submit button
        -When this submit button is clicked, change the editingTaskID back to null
  */

  const [newTask, setNewTask] = useState("")
  const [tasks, setTasks] = useState(() => {
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

  function handleEnterEditMode(taskId, taskDesc) {
    setEditingTaskId(taskId)
    setEditingTaskInput(taskDesc)
  }

  function handleEditTask(input) {
    setEditingTaskInput(input)

    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === editingTaskId) {
          return {
            ...task,
            taskDescription: input,
          }
        } else {
          return task
        }
      })
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
