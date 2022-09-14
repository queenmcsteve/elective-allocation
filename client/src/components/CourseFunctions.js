import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UpdateCourseModal from "./UpdateCourseModal";
import { useState } from "react";
import { useMutation } from "@apollo/client";

import { GET_DEMAND } from "../utils/mutations";

const CourseFunctions = () => {
  const [showModal, setShowModal] = useState(false);
  const [getDemand] = useMutation(GET_DEMAND);
  const getDmd = async () => {
    const demand = await getDemand();
    // window.location.reload();
    console.log("demand: ", demand);
  };

  return (
    <>
      {showModal ? <UpdateCourseModal /> : <></>}
      <Box sx={{ flexGrow: 1 }}>
        <div id="studentFunctions">
          <div>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Courses
            </Typography>
          </div>
          <div>
            <Button color="inherit" onClick={() => setShowModal(true)}>
              Update Data
            </Button>
            <Button color="inherit" onClick={getDmd}>
              Get Demand
            </Button>
          </div>
        </div>
      </Box>
    </>
  );
};

export default CourseFunctions;
