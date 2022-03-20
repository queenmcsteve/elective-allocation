import AdminNav from "../components/AdminNav";
import CourseFunctions from "../components/CourseFunctions";
import CourseTable from "../components/CourseTable";
// import StudentFunctions from "../components/StudentFunctions";
// import StudentTable from "../components/StudentTable";
// import StudentTablePro from "../components/StudentTablePro";

const AdminDashboardStyle = () => {
  return (
    <>
      <AdminNav />
      <div>
        {/* <StudentFunctions />
        <StudentTable /> */}
        {/* <StudentTablePro /> */}
        <CourseFunctions />
        <CourseTable />
      </div>
    </>
  );
};

export default AdminDashboardStyle;
