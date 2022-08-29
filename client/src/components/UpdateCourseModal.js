import * as React from "react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const UpdateCourseModal = () => {
  const [textfield, setTextfield] = useState("");

  const textfieldUpdate = (e) => {
    setTextfield(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted", textfield);
  };
  return (
    <div>
      <Typography variant="body1" component="div">
        <div>
          <form onSubmit={handleSubmit}>
            <textarea
              rows="10"
              name="csvData"
              onChange={textfieldUpdate}
            ></textarea>
            <Button type="submit">Save</Button>
          </form>
        </div>
      </Typography>
    </div>
  );
};

export default UpdateCourseModal;
