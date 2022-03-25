import React, { useState } from "react";
import AdminNav from "../components/AdminNav";
import CoursesPage from "../components/CoursesPage";
import StudentsPage from "../components/StudentsPage";
// import StudentTablePro from "../components/StudentTablePro";
import Button from "@mui/material/Button";

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
  return (
    <>
      <AdminNav setCurrentTab={setCurrentTab} />
      <div>
        <div>{getTab(currTab)}</div>
      </div>
      <div>
        <Button color="inherit">Generate Allocation</Button>
      </div>
    </>
  );
};

export default AdminDashboard;
