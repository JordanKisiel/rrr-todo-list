import { CheckCircle, Delete, Edit } from "@mui/icons-material"
import {
  Box,
  Checkbox,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material"

const TaskList = ({
  tasks,
  editingTaskId,
  editingTaskInput,
  handleCheckTask,
  handleDeleteTask,
  handleEnterEditMode,
  handleEditTask,
  handleSubmitEdit,
}) => {
  const strikeThrough = {
    textDecoration: "line-through",
  }

  const taskList = tasks.map((task) => {
    const editButton = (
      <IconButton
        onClick={() => handleEnterEditMode(task.id, task.taskDescription)}
        edge="end"
      >
        <Edit />
      </IconButton>
    )

    const submitButton = (
      <IconButton onClick={() => handleSubmitEdit()} edge="end">
        <CheckCircle />
      </IconButton>
    )

    const isInEditMode = task.id === editingTaskId

    return (
      <ListItem
        key={task.id}
        secondaryAction={
          <Box display="flex" flexDirection="row" gap={1}>
            {isInEditMode ? submitButton : editButton}
            <IconButton onClick={() => handleDeleteTask(task.id)} edge="end">
              <Delete />
            </IconButton>
          </Box>
        }
        disablePadding
        divider
      >
        <ListItemButton>
          <Checkbox
            sx={{ marginRight: "30px" }}
            checked={task.isDone}
            onClick={() => handleCheckTask(task.id)}
          />
          {isInEditMode ? (
            <TextField
              variant="standard"
              value={editingTaskInput}
              onChange={(e) => handleEditTask(e.target.value)}
              fullWidth={true}
              sx={{ marginRight: "80px" }}
            />
          ) : (
            <ListItemText
              primary={task.taskDescription}
              sx={task.isDone ? strikeThrough : {}}
            />
          )}
        </ListItemButton>
      </ListItem>
    )
  })

  return <List>{taskList}</List>
}

export default TaskList
