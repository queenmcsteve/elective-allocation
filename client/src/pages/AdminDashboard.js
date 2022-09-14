import React, { useState } from "react";
import AdminNav from "../components/AdminNav";
import CoursesPage from "../components/CoursesPage";
import StudentsPage from "../components/StudentsPage";
// import StudentTablePro from "../components/StudentTablePro";
import Button from "@mui/material/Button";
import { useMutation } from "@apollo/client";
import { PERFORM_ALLOCATION } from "../utils/mutations";

const getTab = (currTab) => {
  if (currTab === "Students") {
    return (
      <>
        <StudentsPage />
      </>
    );
  } else if (currTab === "Courses") {
    return (
      <>
        <CoursesPage />
      </>
    );
  }
};

const AdminDashboard = () => {
  const [currTab, setCurrentTab] = useState("Students");
  const [performAllocation, { loading, error }] =
    useMutation(PERFORM_ALLOCATION);
  const allocateStudents = async () => {
    const result = await performAllocation();
    if (result.data.performAllocation === true) {
      window.alert("Allocation Success!");
    } else {
      if (window.confirm("Allocation failed :( try again?")) {
        allocateStudents();
      } else {
        console.log("allocation cancelled");
      }
    }
  };
  return (
    <>
      <AdminNav setCurrentTab={setCurrentTab} />
      <div>
        <div>{getTab(currTab)}</div>
      </div>
      <div>
        <Button onClick={allocateStudents} color="inherit">
          Generate Allocation
        </Button>
      </div>
    </>
  );
};

export default AdminDashboard;
