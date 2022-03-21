import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import range from "lodash.range";
import { useState } from "react";
import { useMutation } from "@apollo/client";

const { SUBMIT_RANKING } = require("../utils/mutations");

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 1;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 1,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

const DragCourse = ({ courses }) => {
  // export default function DragCourseFun() {
  console.log(courses);
  const [items, setItems] = useState(courses);
  const [sortItems, setSortItems] = useState([]);
  const [addRanking, { loading, error }] = useMutation(SUBMIT_RANKING, {
    onCompleted: () => {},
    onError: () => {},
  });

  const onDragEnd = (result) => {
    const { destination, source } = result;
    console.log("drag result:", destination, source);

    if (!destination || !source) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // check direction of drag (up or down)
    const directionOfDrag =
      destination.index > source.index ? "GREATER" : "LESS";
    console.log("direction of drag: ", directionOfDrag);
    console.log("source", source.index, "dest", destination.index);
    // find the affected range
    let affectedRange;
    if (directionOfDrag === "GREATER") {
      affectedRange = range(source.index, destination.index + 1);
      console.log(affectedRange);
    } else {
      affectedRange = range(destination.index, source.index);
      console.log(affectedRange);
    }

    courses.map((course) => {
      if (course.id === result.draggableId) {
        course.position = destination.index;
        return course;
      } else if (affectedRange.includes(course.position)) {
        if (directionOfDrag === "GREATER") {
          course.position = course.position - 1;
          return course;
        } else if (directionOfDrag === "LESS") {
          course.position = course.position + 1;
          return course;
        }
      } else {
        return course;
      }
    });

    if (!result.destination) {
      return;
    }
    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    ).sort((a, b) => a.position - b.position);

    let itemsIdArray = [];
    reorderedItems.map((entry) => {
      itemsIdArray.push({ id: entry.id });
    });
    setItems(reorderedItems);
    setSortItems(itemsIdArray);
    // reorderdItems to submit when ready
    console.log("current ranking:", { reorderedItems });
    console.log(itemsIdArray);
  };

  const formatDefaultRanking = () =>
    courses.map((course) => {
      return { id: course.id };
    });
  const submitList = async () => {
    try {
      const ranking = sortItems.length > 0 ? sortItems : formatDefaultRanking();
      await addRanking({
        variables: {
          ranking,
        },
      });
    } catch (error) {
      console.error(error.message);
    }
    console.log("sent");
  };
  if (loading) {
    return <div>loading 2</div>;
  }
  if (error) {
    return <div>error 2</div>;
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={item.position}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <a {...provided.draggableProps} className="handle"></a>
                      {item.position + 1}. &nbsp;
                      {item.name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={submitList}>submit your preferences</button>
    </>
  );
};
export default DragCourse;
