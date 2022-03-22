import AuthService from "../utils/auth";

const AdminDash = () => {
  return (
    <div>
      welcome administrator!
      <button onClick={AuthService.logout}>logout</button>
    </div>
  );
};

export default AdminDash;
