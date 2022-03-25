import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CourseFunctions = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <div id="studentFunctions">
        <div>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Courses
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default CourseFunctions;
