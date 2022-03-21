import React, { useState } from "react";
import AdminNav from "../components/AdminNav";
import CourseFunctions from "../components/CourseFunctions";
import CourseTable from "../components/CourseTable";
import StudentPage from "../components/StudentPage";
// import StudentTablePro from "../components/StudentTablePro";

const getTab = (currTab) => {
  if (currTab === "Students") {
    return (
      <>
        <StudentPage />
      </>
    );
  } else if (currTab === "Courses") {
    return (
      <>
        <CourseFunctions />
        <CourseTable />
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
