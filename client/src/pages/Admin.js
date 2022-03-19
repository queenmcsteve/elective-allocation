import React, { useState } from "react";
import Login from "../components/Login";
import AdminDash from "../components/AdminDash";

const Admin = () => {
  const [token, setToken] = useState();

  if (!token) {
    return (
      <div>
        <h3>Please Log In</h3>
        <Login setToken={setToken} />
      </div>
    );
  }

  return (
    <div>
      <h2>Admin</h2>
      <AdminDash />
    </div>
  );
};

export default Admin;
