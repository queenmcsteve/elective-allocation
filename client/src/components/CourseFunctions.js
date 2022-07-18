import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useMutation } from "@apollo/client";

import { GET_DEMAND } from "../utils/mutations";

const CourseFunctions = () => {
  const [getDemand] = useMutation(GET_DEMAND);
  const getDmd = async () => {
    const demand = await getDemand();
    console.log("demand: ", demand);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <div id="studentFunctions">
        <div>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Courses
          </Typography>
        </div>
        <div>
          <Button color="inherit" onClick={getDmd}>
            Get Demand
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default CourseFunctions;
