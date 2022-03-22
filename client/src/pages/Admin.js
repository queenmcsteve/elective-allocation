import React, { useState } from "react";

import Login from "../components/Login";
import AdminDash from "../components/AdminDash";
import AuthService from "../utils/auth";

const Admin = () => {
  const [token, setToken] = useState();

  if (!AuthService.isLoggedIn()) {
    return (
      <div>
        <h3>Please Log In</h3>
        <Login setToken={setToken} />
      </div>
    );
  } else {
    return (
      <div>
        <h2>Admin</h2>
        <AdminDash />
      </div>
    );
  }
};

export default Admin;
