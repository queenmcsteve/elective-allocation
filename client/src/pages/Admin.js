import React, { useState } from "react";

import Login from "../components/Login";
import AdminDashboard from "./AdminDashboard";
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
        <AdminDashboard />
      </div>
    );
  }
};

export default Admin;
