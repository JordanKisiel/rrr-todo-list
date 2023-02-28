import React from "react"
import { Add } from "@mui/icons-material"
import { Box, Button, Grid, Typography } from "@mui/material"

function Header() {
  return (
    <Box display="flex" flexDirection="row" padding={3} justifyContent="center">
      <Typography variant="h3" component={"h1"} textTransform="uppercase">
        Todo List
      </Typography>
    </Box>
  )
}

export default Header
