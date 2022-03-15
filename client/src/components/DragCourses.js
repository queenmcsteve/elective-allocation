import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import range from "lodash.range";
import course from "./courses.js";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 2;

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

class DragCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: course,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
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

    // check direction greater or less than
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

    const reOrderedList = course.map((course) => {
      if (course.id === result.draggableId) {
        console.log("condition 1: ", course);
        course.position = destination.index;
        return course;
      } else if (affectedRange.includes(course.position)) {
        if (directionOfDrag === "GREATER") {
          console.log("condition 2.1: ", course);
          course.position = course.position - 1;
          return course;
        } else if (directionOfDrag === "LESS") {
          console.log("condition 2.2: ", course);
          course.position = course.position + 1;
          return course;
        }
      } else {
        console.log("condition 3: ", course);
        return course;
      }
    });
    // this.state = { reOrderedList };
    // consider creating a drop zone for 'definite no' courses (limited to 2 per student)
    if (!result.destination) {
      return;
    }
    console.log("*****************", this.state.items);
    console.log("&&&&&&&&&&&&&&&", result.source.index);
    console.log("&&&&&&&&&&&&&&&", result.destination.index);
    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );
    console.log("???????????????", items);
    this.setState({
      ///HELP :: I want need the new state to be ordered by the position key...
      items: items.position,
    });
    console.log(items);
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items.map((item, index) => (
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
                      {item.position}. &nbsp;
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default DragCourses;

// Put the thing into the DOM!
// ReactDOM.render(<DragCourses />, document.getElementById("root"));
