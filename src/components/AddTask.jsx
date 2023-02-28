import { Add } from "@mui/icons-material"
import { Box, Button, TextField } from "@mui/material"
import { nanoid } from "nanoid"

const AddTask = ({ newTask, handleTaskInput, handleAddTask }) => {
  return (
    <Box display="flex" padding={3} gap={3}>
      <TextField
        id="outlined-basic"
        label="New todo..."
        variant="outlined"
        fullWidth={true}
        value={newTask}
        onChange={(e) => handleTaskInput(e.target.value)}
      />
      <Button
        onClick={() => handleAddTask(nanoid(), newTask)}
        variant="contained"
      >
        <Add />
      </Button>
    </Box>
  )
}

export default AddTask
