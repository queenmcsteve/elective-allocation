import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import StudentRank from "./pages/StudentRank.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
          </Routes>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
};

export default App;
