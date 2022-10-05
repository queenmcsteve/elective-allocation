import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UpdateCourseModal from "./UpdateCourseModal";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_DEMAND } from "../utils/mutations";
const { useQuery, NetworkStatus } = require("@apollo/client");
const { COURSES } = require("../utils/queries");

const CourseFunctions = () => {
  const [showModal, setShowModal] = useState(false);
  const [getDemand] = useMutation(GET_DEMAND);
  const { loading, data, error, refetch, networkStatus } = useQuery(COURSES);
  const getDmd = async () => {
    const demand = await getDemand();
    // window.location.reload();
    console.log("demand: ", demand);
    refetch();
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
              Upload Fresh Data
            </Button>
            &nbsp;
            <Button color="inherit" onClick={getDmd}>
              ↻ Reload
            </Button>
          </div>
        </div>
      </Box>
    </>
  );
};

export default CourseFunctions;
