import DragCourse from "./DragCourse.js";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const { useQuery } = require("@apollo/client");
const { COURSES } = require("../queries");

const DragList = () => {
  const { loading, data, error } = useQuery(COURSES);

  if (loading) {
    return <div>loading</div>;
  } else if (error) {
    return <div>error</div>;
  } else {
    console.log("draglist", data);
    return (
      <div id="drag-holder">
        <DragCourse />
      </div>
    );
  }
};

export default DragList;
