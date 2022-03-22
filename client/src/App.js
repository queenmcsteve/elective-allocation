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
import { setContext } from "@apollo/client/link/context";
import LoggedIn from "./pages/LoggedIn";
import LoginFail from "./pages/LoginFail";
import AdminDashboardStyle from "./pages/AdminDashboardStyle";

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_URL || "http://localhost:4000/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
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
