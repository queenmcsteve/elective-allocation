import logo from "./logo.svg";
import DragCourses from "./components/DragCourses.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p id="titleText">RankMatch</p>
        <p id="instructText">
          Drag and drop the courses so that your most preferred option is at the
          top, and your least preferred option is at the bottom.
        </p>
        <div id="drag-holder">
          <DragCourses />
        </div>
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
  );
}

export default App;
