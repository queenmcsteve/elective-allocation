import React, { useState } from "react";
import AdminNav from "../components/AdminNav";
import CoursesPage from "../components/CoursesPage";
import StudentsPage from "../components/StudentsPage";
// import StudentTablePro from "../components/StudentTablePro";

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

const AdminDashboardStyle = () => {
  const [currTab, setCurrentTab] = useState("Students");
  return (
    <>
      <AdminNav setCurrentTab={setCurrentTab} />
      <div>
        <div>{getTab(currTab)}</div>
      </div>
    </>
  );
};

export default AdminDashboardStyle;
