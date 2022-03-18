import DragList from "../components/DragList.js";

const StudentRank = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p id="titleText">RankMatch</p>
        <p id="instructText">
          Drag and drop the courses so that your most preferred option is at the
          top, and your least preferred option is at the bottom.
        </p>
        <DragList />
        <br />
      </header>
    </div>
  );
};

export default StudentRank;
