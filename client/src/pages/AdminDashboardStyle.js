import React, { useState } from "react";
import AdminNav from "../components/AdminNav";
import CourseFunctions from "../components/CourseFunctions";
import CourseTable from "../components/CourseTable";
import StudentFunctions from "../components/StudentFunctions";
import StudentTable from "../components/StudentTable";
// import StudentTablePro from "../components/StudentTablePro";

const getTab = (currTab) => {
  if (currTab === "Students") {
    return (
      <>
        <StudentFunctions />
        <StudentTable />
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
