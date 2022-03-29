import DragCourse from "./DragCourse.js";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const { useQuery } = require("@apollo/client");
const { COURSES } = require("../utils/queries");

const DragList = ({ refresh }) => {
  const { loading, data, error } = useQuery(COURSES);
  if (loading) {
    return <div>loading</div>;
  } else if (error) {
    return <div>error</div>;
  } else {
    const formattedCourses = data.courses.map((course, index) => {
      return { ...course, position: index };
    });
    return (
      <div id="drag-holder">
        <DragCourse refresh={refresh} courses={formattedCourses} />
      </div>
    );
  }
};

export default DragList;
