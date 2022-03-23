import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useMutation } from "@apollo/client";
import { shuffleArray } from "../utils/shuffleArray.js";
import { UPDATE_MATCH_INDEX } from "../utils/mutations";

const StudentFunctions = ({ data, setFormattedData }) => {
  const reshuffle = () => {
    const reshuffledArray = shuffleArray(data);
    console.log(reshuffledArray);
    setFormattedData(reshuffledArray);
  };
  const [updateMatchIndex, { loading, error }] =
    useMutation(UPDATE_MATCH_INDEX);
  // const [generateURLs, { loading, error }] = useMutation();
  const syncMatchDb = async () => {
    const mutationInput = data.map((student) => {
      return {
        studentId: student.id,
        matching_index: student.matchingIndex,
      };
    });
    try {
      const result = await updateMatchIndex({
        variables: { students: mutationInput },
      });
      // TO DO: add function to change color of button to indicate successful sync
      console.log(result);
    } catch (err) {
      // TO DO: add alert about error
      console.log(err);
    }
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
          <Button color="inherit" onClick={syncMatchDb}>
            Sync with DB
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default StudentFunctions;
