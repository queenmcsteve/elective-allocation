import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
const { useQuery } = require("@apollo/client");
const { STUDENTS } = require("../utils/queries");

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
  { field: "email", headerName: "Email", width: 130 },
  {
    field: "ects_budget",
    headerName: "ECTS Budget",
    type: "number",
    width: 100,
  },
  {
    field: "ranking",
    headerName: "Ranking",
    width: 130,
  },
  {
    field: "matchingIndex",
    headerName: "Matching Index",
    type: "number",
    width: 60,
  },
  {
    field: "allocation",
    headerName: "Allocation",
    width: 130,
  },
];

export default function StudentTable() {
  const { loading, data, error } = useQuery(STUDENTS);
  if (loading) {
    return <div>loading</div>;
  } else if (error) {
    return <div>error</div>;
  } else {
    console.log("students: ", { data });
    //   const formattedCourses = data.courses.map((course, index) => {
    //     return { ...course, position: index };
  }
  return (
    <div style={{ height: 800, width: "100%" }}>
      <DataGrid
        rows={data.students}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        checkboxSelection
      />
    </div>
  );
}
