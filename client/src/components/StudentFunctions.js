import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UpdateStudentModal from "./UpdateStudentModal";
import { useState } from "react";
import { useMutation } from "@apollo/client";

import { GENERATE_URLS } from "../utils/mutations";

const StudentFunctions = ({ data, setFormattedData }) => {
  const [showModal, setShowModal] = useState(false);
  const [generateURLs] = useMutation(GENERATE_URLS);
  const genUrls = async () => {
    try {
      await generateURLs({
        variable: { students: genUrls },
      });
      window.location.reload();
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
              Update Data
            </Button>
            <Button color="inherit" onClick={genUrls}>
              Regenerate Urls
            </Button>
          </div>
        </div>
      </Box>
    </>
  );
};

export default StudentFunctions;
