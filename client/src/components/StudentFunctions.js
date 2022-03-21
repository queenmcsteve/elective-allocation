import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { shuffleArray } from "../utils/shuffleArray.js";

const StudentFunctions = ({ data, setFormattedData }) => {
  const reshuffle = () => {
    const reshuffledArray = shuffleArray(data);
    console.log(reshuffledArray);
    setFormattedData(reshuffledArray);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <div id="studentFunctions">
        <div>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Students
          </Typography>
        </div>
        <div>
          <Button
            color="inherit"
            onClick={() => {
              reshuffle();
            }}
          >
            Generate Matching Index
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default StudentFunctions;
