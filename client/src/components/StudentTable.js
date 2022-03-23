import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

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
    field: "rank_url",
    headerName: "Rank URL",
    width: 170,
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
    width: 130,
  },
  {
    field: "allocation",
    headerName: "Allocation",
    width: 130,
  },
];

export default function StudentTable({ loading, error, data }) {
  if (data) {
    return (
      <div style={{ height: 800, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          checkboxSelection
        />
      </div>
    );
  } else if (error) {
    window.location.assign("/Admin");
    return;
  } else {
    return <div>loading</div>;
    //   const formattedCourses = data.courses.map((course, index) => {
    //     return { ...course, position: index };
  }
}
