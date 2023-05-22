import React, { useState } from "react";
import { useDrop } from "react-dnd";
import "./file.css";
import Form from "./Form";

const FormList = [
  {
    id: 1,
    label: "item 1",
  },
  {
    id: 2,
    label: "item 2",
  },
  {
    id: 3,
    label: "item 3",
  },
];

function DragNDrop() {
  const [board, setBoard] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "input",
    drop: (item) => addFormToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addFormToBoard = (id) => {
    const formList = FormList.filter((form) => id === form.id);
    setBoard((board) => [...board, formList[0]]);
  };
  return (
    <>
      <div className="firstGrid">
        {FormList.map((form) => {
          return <Form id={form.id} key={form.id} />;
        })}
      </div>
      <div className="secondGrid" ref={drop}>
        {board.map((form) => {
          return <Form id={form.id} key={form.id} label={form.label} />;
        })}
      </div>
    </>
  );
}

export default DragNDrop;
