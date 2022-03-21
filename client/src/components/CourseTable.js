import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
const { useQuery } = require("@apollo/client");
const { COURSES } = require("../utils/queries");

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
    // TRY reformatting ID into simple index
    // valueFormatter: (id) => {
    //     const idFormatted =
    // },
  },
  { field: "name", headerName: "Name", width: 160 },
  {
    field: "ects",
    headerName: "ECTS Weight",
    type: "number",
    width: 100,
  },
  {
    field: "capacity",
    headerName: "Capacity",
    width: 130,
    editable: true,
  },
];

export default function CourseTable() {
  const { loading, data, error } = useQuery(COURSES);
  if (loading) {
    return <div>loading</div>;
  } else if (error) {
    return <div>error</div>;
  } else {
    console.log("courses: ", { data });
    //   const formattedCourses = data.courses.map((course, index) => {
    //     return { ...course, position: index };
  }
  return (
    <>
      <div style={{ height: 800, width: "100%" }}>
        <DataGrid
          rows={data.courses}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          checkboxSelection
        />
      </div>
    </>
  );
}
