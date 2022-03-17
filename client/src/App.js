import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import DragList from "./components/DragList.js";

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
        <header className="App-header">
          <p id="titleText">RankMatch</p>
          <p id="instructText">
            Drag and drop the courses so that your most preferred option is at
            the top, and your least preferred option is at the bottom.
          </p>
          <DragList />
          {/* <br />
          <div id="drag-holder">
            <DragCourseFun />
          </div> */}
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            submit your preferences
          </a>
          <br />
        </header>
      </div>
    </ApolloProvider>
  );
};

export default App;
