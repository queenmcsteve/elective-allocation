import * as React from "react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { UPLOAD_STUDENTS } from "../utils/mutations";

const UpdateStudentModal = () => {
  const [textfield, setTextfield] = useState("");

  const textfieldUpdate = (e) => {
    setTextfield(e.target.value);
  };

  const uploadStudentData = (studentDataString) => {
    let arr = studentDataString.split("\n");
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
    jsonObj = jsonObj.map((s) => {
      return {
        ...s,
        email: s.email,
        ects_budget: parseInt(s.ects_budget),
      };
    });
    return jsonObj;
  };

  const [uploadStudents, { loading, error }] = useMutation(UPLOAD_STUDENTS);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentData = uploadStudentData(textfield);
    uploadStudents({
      variables: {
        studentData,
      },
    });
    console.log(studentData);
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

export default UpdateStudentModal;
