import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const StudentFunctions = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <div id="studentFunctions">
        <div>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Students
          </Typography>
        </div>
        <div>
          <Button color="inherit">Generate Matching Index</Button>
        </div>
      </div>
    </Box>
  );
};

export default StudentFunctions;
