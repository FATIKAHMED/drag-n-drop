import React from "react";
import { useDrag } from "react-dnd";

function Form({ id, key, label }) {
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
    <div ref={drag}>
      <label>{label}</label>
      <input ref={drag} key={key} />
    </div>
  );
}

export default Form;
