import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import StudentRank from "./pages/StudentRank.js";
import Admin from "./pages/Admin.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoggedIn from "./pages/LoggedIn";
import LoginFail from "./pages/LoginFail";
import AdminDashboardStyle from "./pages/AdminDashboardStyle";

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_URL || "http://localhost:4000/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/StudentRank" element={<StudentRank />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/LoggedIn" element={<LoggedIn />} />
            <Route path="/LoginFail" element={<LoginFail />} />
            <Route
              path="/AdminDashboardStyle"
              element={<AdminDashboardStyle />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
};

export default App;
