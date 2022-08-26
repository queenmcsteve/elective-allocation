import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useMutation } from "@apollo/client";
import { GENERATE_URL_BY_ID } from "../utils/mutations";

// const copyNewLink = () => {
//   const genUrlId = async () => {
//     return {
//       studentId: data.id,
//       rank_url: data.rank_url,
//     };
//   };
//   const url = generateUrlById({
//     variable: { student: genUrlId },
//   });
//   console.log(url);
//   navigator.clipboard.writeText(url);
// };

export default function StudentTable({ loading, error, data }) {
  const [generateUrlById, { loading2, error2 }] =
    useMutation(GENERATE_URL_BY_ID);

  const generateLink = async (studentId) => {
    try {
      const response = await generateUrlById({
        variables: {
          studentId,
        },
      });

      const rank_url = response.data.generateUrlById.rank_url;
      // Copy the generated url to the clipboard
      navigator.clipboard.writeText(rank_url);
    } catch (error) {
      console.log(
        "Error while generating the url, admin may have logged out",
        error
      );
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    { field: "email", headerName: "Email", width: 130 },
    {
      field: "ects_budget",
      headerName: "ECTS Budget",
      width: 100,
    },
    {
      field: "rank_url",
      headerName: "Rank URL",
      width: 170,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <button onClick={() => generateLink(params.id)}>
            gen-copy new link
          </button>
        );
      },
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
      headerName: "Match Score",
      width: 130,
    },
  ];

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
