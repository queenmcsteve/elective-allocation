import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
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
    field: "allocation",
    headerName: "Allocation",
    width: 130,
  },
  {
    field: "matchingIndex",
    headerName: "Matching Index",
    type: "number",
    width: 60,
  },
  //   {
  //     field: "fullName",
  //     headerName: "Full name",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) =>
  //       `${params.row.firstName || ""} ${params.row.ects_budget || ""}`,
  //   },
];

const rows = [
  {
    id: 1,
    email: "Snow",
    ects_budget: 10,
    ranking: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    allocation: [1, 2, 3, 4, 5],
  },
  {
    id: 2,
    email: "Lannister",
    ects_budget: 10,
    ranking: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    allocation: [1, 2, 3, 4, 5],
  },
  {
    id: 3,
    email: "Lannister",
    ects_budget: 10,
    ranking: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    allocation: [1, 2, 3, 4, 5],
  },
  {
    id: 4,
    email: "Stark",
    ects_budget: 10,
    ranking: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    allocation: [1, 2, 3, 4, 5],
  },
  {
    id: 5,
    email: "Targaryen",
    ects_budget: 10,
    ranking: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    allocation: [1, 2, 3, 4, 5],
  },
  {
    id: 6,
    email: "Melisandre",
    ects_budget: 10,
    ranking: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    allocation: [1, 2, 3, 4, 5],
  },
  {
    id: 7,
    email: "Clifford",
    ects_budget: 10,
    ranking: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    allocation: [1, 2, 3, 4, 5],
  },
  {
    id: 8,
    email: "Frances",
    ects_budget: 10,
    ranking: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    allocation: [1, 2, 3, 4, 5],
  },
  {
    id: 9,
    email: "Roxie",
    ects_budget: 10,
    ranking: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    allocation: [1, 2, 3, 4, 5],
  },
];

export default function DataTable() {
  return (
    <div style={{ height: 800, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}
