import AdminNav from "../components/AdminNav";
import StudentFunctions from "../components/StudentFunctions";
import StudentTable from "../components/StudentTable";
// import StudentTablePro from "../components/StudentTablePro";

const AdminDashboardStyle = () => {
  return (
    <>
      <AdminNav />
      <div>
        <StudentFunctions />
        <StudentTable />
        {/* <StudentTablePro /> */}
      </div>
    </>
  );
};

export default AdminDashboardStyle;
