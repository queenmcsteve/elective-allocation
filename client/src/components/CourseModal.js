import * as React from "react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_COURSE } from "../utils/mutations";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CourseModal = ({ id, name, ects, capacity, updateSuccess }) => {
  // console.log(id, name, ects, capacity);
  // const [cid, setCid] = useState("");
  const [cname, setCname] = useState(name);
  const [cects, setCects] = useState(ects);
  const [ccapacity, setCcapacity] = useState(capacity);
  const [updateCourse, { loading, error }] = useMutation(UPDATE_COURSE);

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
          courseInfo: {
            id,
            name: cname,
            ects: parseInt(cects),
            capacity: parseInt(ccapacity),
          },
        },
      });
      console.log("post successful:", data);
      updateSuccess();
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
            value={cname}
            onChange={nameUpdate}
          ></input>
          <br></br>
          <label htmlFor="c_ects">ECTS</label>
          <input
            type="number"
            id="c_ects"
            value={cects}
            onChange={ectsUpdate}
          ></input>
          <br></br>
          <label htmlFor="c_capacity">Capacity</label>
          <input
            type="number"
            id="c_capacity"
            value={ccapacity}
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
