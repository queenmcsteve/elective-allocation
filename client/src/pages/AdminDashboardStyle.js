import AdminNav from "../components/AdminNav";
import StudentTable from "../components/StudentTable";
// import StudentTablePro from "../components/StudentTablePro";

const AdminDashboardStyle = () => {
  return (
    <>
      <AdminNav />
      <div>
        <StudentTable />
        {/* <StudentTablePro /> */}
      </div>
    </>
  );
};

export default AdminDashboardStyle;
