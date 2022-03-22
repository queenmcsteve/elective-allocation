import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AuthService from "../utils/auth";

const AdminNav = ({ setCurrentTab }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            RankMatch Admin
          </Typography>
          <Button color="inherit" onClick={() => setCurrentTab("Students")}>
            Students
          </Button>
          <Button color="inherit" onClick={() => setCurrentTab("Courses")}>
            Courses
          </Button>
          <button onClick={AuthService.logout}>logout</button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AdminNav;
