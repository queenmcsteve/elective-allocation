import DragCourse from "./DragCourse.js";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { random } from "lodash";

const { useQuery } = require("@apollo/client");
const { COURSES } = require("../utils/queries");

const DragList = ({ refresh }) => {
  const { loading, data, error } = useQuery(COURSES);
  if (loading) {
    return <div>loading</div>;
  } else if (error) {
    return <div>error</div>;
  } else {
    const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
    const randData = shuffle(data.courses);
    console.log("randData:", randData);
    const formattedCourses = randData.map((course, index) => {
      return { ...course, position: index };
    });
    console.log("formatted: ", formattedCourses);
    return (
      <div id="drag-holder">
        <DragCourse courses={formattedCourses} refresh={refresh} />
      </div>
    );
  }
};

export default DragList;
