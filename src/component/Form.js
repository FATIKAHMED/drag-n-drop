import React from "react";
import { useDrag } from "react-dnd";

function Form({ id }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "input",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    // <img
    //   ref={drag}
    //   src={url}
    //   width="150px"
    //   style={{ border: isDragging ? "5px solid pink" : "0px" }}
    // />
    <input ref={drag} id={id} />
  );
}

export default Form;
