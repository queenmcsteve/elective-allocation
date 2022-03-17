import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const { useQuery } = require("@apollo/client");
const { COURSES } = require("../queries");

const DragList = () => {
  const { loading, data, error } = useQuery(COURSES);

  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>error</div>;
  }
  console.log(data);
  return <div>graphql data in console</div>;
};

export default DragList;
