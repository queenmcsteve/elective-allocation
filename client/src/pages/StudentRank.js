import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DragList from "../components/DragList.js";
import AuthService from "../utils/auth";
import { ME } from "../utils/mutations";

const StudentRank = () => {
  const { token } = useParams();
  if (token) {
    // store token in local-storage so that we can perform auto login
    AuthService.userLogin(token);
  }

  const [getUserInfo, { loading, error }] = useMutation(ME);
  const [data, setData] = useState();
  const refresh = () => {
    updateUserInfo();
  };
  const updateUserInfo = async () => {
    const res = await getUserInfo();
    setData(res.data);
  };
  useEffect(() => {
    updateUserInfo();
  }, []);

  return (
    <div>
      <header className="App-header">
        <p id="titleText">RankMatch</p>
        <p id="instructText">
          {data
            ? data.me.is_submitted
              ? "Welcome back to RankMatch! You've already submitted your preferences, however you may resubmit if you wish. Drag and drop the courses so that your most preferred option is at the top, and your least preferred option is at the bottom. When you're happy click the button to submit your preferences."
              : "Welcome to RankMatch! Here you will be able to submit your preferences for elective courses. Drag and drop the courses so that your most preferred option is at the top, and your least preferred option is at the bottom. When you're happy click the button to submit your preferences."
            : ""}
        </p>
        <DragList refresh={refresh} />
        <br />
      </header>
    </div>
  );
};

export default StudentRank;
