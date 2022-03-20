import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const AdminNav = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            RankMatch Admin
          </Typography>
          <Button color="inherit">Students</Button>
          <Button color="inherit">Courses</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AdminNav;
