function tasksReducer(tasks, action) {
  switch (action.type) {
    case "check_task": {
      return tasks.map((task) => {
        if (task.id !== action.taskId) {
          return task
        } else {
          return {
            ...task,
            isDone: !task.isDone,
          }
        }
      })
    }
    case "delete_task": {
      return tasks.filter((task) => {
        return task.id !== action.taskId
      })
    }
    case "add_task": {
      return [
        ...tasks,
        {
          id: action.taskId,
          isDone: false,
          taskDescription: action.taskDesc,
        },
      ]
    }
    case "edit_task": {
      return tasks.map((task) => {
        if (task.id === action.editingTaskId) {
          return {
            ...task,
            taskDescription: action.input,
          }
        } else {
          return task
        }
      })
    }
  }
  throw Error("Unknown action: " + action.type)
}

export default tasksReducer
