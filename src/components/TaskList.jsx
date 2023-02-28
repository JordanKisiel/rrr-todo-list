import { Delete, Edit } from "@mui/icons-material"
import {
  Box,
  Checkbox,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material"

const TaskList = ({ tasks, handleCheckTask, handleDeleteTask }) => {
  const strikeThrough = {
    textDecoration: "line-through",
  }

  const taskList = tasks.map((task) => {
    return (
      <ListItem
        key={task.id}
        secondaryAction={
          <Box display="flex" flexDirection="row" gap={1}>
            <IconButton edge="end">
              <Edit />
            </IconButton>
            <Divider orientation="vertical" />
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
          <ListItemText
            primary={task.taskDescription}
            sx={task.isDone ? strikeThrough : {}}
          />
        </ListItemButton>
      </ListItem>
    )
  })

  return <List>{taskList}</List>
}

export default TaskList
