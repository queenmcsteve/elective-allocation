import * as React from "react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { UPLOAD_COURSES } from "../utils/mutations";

const UpdateCourseModal = () => {
  const [textfield, setTextfield] = useState("");

  const textfieldUpdate = (e) => {
    setTextfield(e.target.value);
  };

  const uploadCourseData = (courseDataString) => {
    let arr = courseDataString.split("\n");
    let jsonObj = [];
    let headers = arr[0].split(",");
    for (let i = 1; i < arr.length; i++) {
      let data = arr[i].split(",");
      let obj = {};
      for (let j = 0; j < data.length; j++) {
        obj[headers[j].trim()] = data[j].trim();
      }
      jsonObj.push(obj);
    }
    jsonObj = jsonObj.map((c) => {
      return {
        ...c,
        ects: parseInt(c.ects),
        capacity: parseInt(c.capacity),
        demand: parseInt(c.demand),
      };
    });
    return jsonObj;
  };

  const [uploadCourses, { loading, error }] = useMutation(UPLOAD_COURSES);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = uploadCourseData(textfield);
    uploadCourses({
      variables: {
        courseData,
      },
    });
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
