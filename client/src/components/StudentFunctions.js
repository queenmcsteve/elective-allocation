import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UpdateStudentModal from "./UpdateStudentModal";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GENERATE_URLS } from "../utils/mutations";

const { useQuery } = require("@apollo/client");
const { STUDENTS_COURSES } = require("../utils/queries");

const StudentFunctions = ({ data, setFormattedData }) => {
  const [showModal, setShowModal] = useState(false);
  const { loading, data2, error, refetch } = useQuery(STUDENTS_COURSES);
  const [generateURLs] = useMutation(GENERATE_URLS);
  const genUrls = async () => {
    try {
      await generateURLs({
        variable: { students: genUrls },
      });
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {showModal ? <UpdateStudentModal /> : <></>}
      <Box sx={{ flexGrow: 1 }}>
        <div id="studentFunctions">
          <div>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Students
            </Typography>
          </div>
          <div>
            <Button color="inherit" onClick={() => setShowModal(true)}>
              Upload Fresh Data
            </Button>
            &nbsp;
            <Button color="inherit" onClick={genUrls}>
              ↻ Reload
            </Button>
          </div>
        </div>
      </Box>
    </>
  );
};

export default StudentFunctions;
