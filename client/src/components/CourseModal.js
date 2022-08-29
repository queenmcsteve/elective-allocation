import * as React from "react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_COURSE } from "../utils/mutations";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CourseModal = ({ id, name, ects, capacity }) => {
  console.log(id, name, ects, capacity);
  // const [cid, setCid] = useState("");
  const [cname, setCname] = useState("");
  const [cects, setCects] = useState("");
  const [ccapacity, setCcapacity] = useState("");
  const [updateCourse, { data, error }] = useMutation(UPDATE_COURSE);

  // const idUpdate = (e) => {
  //   setCid(e.target.value);
  // };
  const nameUpdate = (e) => {
    setCname(e.target.value);
  };
  const ectsUpdate = (e) => {
    setCects(e.target.value);
  };
  const capacityUpdate = (e) => {
    setCcapacity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(id, cname, cects, ccapacity);
    try {
      const data = await updateCourse({
        variables: {
          id,
          name: cname,
          ects: cects,
          capacity: ccapacity,
        },
      });
      console.log(data);
    } catch (error) {
      console.log("boo booo:", error);
    }
  };

  return (
    <div>
      <Typography variant="body1" component="div">
        <form onSubmit={handleSubmit}>
          <label htmlFor="c_id">Course ID:</label>
          <input type="text" id="c_id" value={id} readOnly></input> <br></br>
          <label htmlFor="c_iname">Course Name:</label>
          <input
            type="text"
            id="c_name"
            placeholder={name}
            onChange={nameUpdate}
          ></input>
          <br></br>
          <label htmlFor="c_ects">ECTS</label>
          <input
            type="number"
            id="c_ects"
            placeholder={ects}
            onChange={ectsUpdate}
          ></input>
          <br></br>
          <label htmlFor="c_capacity">Capacity</label>
          <input
            type="number"
            id="c_capacity"
            placeholder={capacity}
            onChange={capacityUpdate}
          ></input>
          <br></br>
          <Button type="submit">Save</Button>
        </form>
      </Typography>
    </div>
  );
};

export default CourseModal;
