import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DragList from "../components/DragList.js";
import AuthService from "../utils/auth";

const StudentRank = () => {
  const { token } = useParams();
  useEffect(() => {
    if (token) {
      // store token in local-storage so that we can perform auto login
      AuthService.login(token, true);
    }
  }, []);
  return (
    <div>
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
