import React, { useCallback, useState } from "react";
import update from "immutability-helper";
import { useDrop } from "react-dnd";
import "./file.css";
import Form from "./Form";

const FormList = [
  {
    id: 8,
    label: "item 8",
  },
  // {
  //   id: 9,
  //   label: "item 9",
  // },
  // {
  //   id: 10,
  //   label: "item 10",
  // },
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
    console.log("DROPPED");
    const formList = FormList.filter((form) => id === form.id);
    setBoard((board) => [...board, formList[0]]);
  };
  // const moveCard = useCallback((dragIndex, hoverIndex, id) => {
  //   const formList = FormList.filter((form) => id === form.id);
  //   setBoard((form) =>
  //     update(formList[0], {
  //       $splice: [
  //         [dragIndex, 1],
  //         [hoverIndex, 0, formList[dragIndex]],
  //       ],
  //     })
  //   );
  // }, []);

  return (
    <>
      <div className="firstGrid">
        {FormList.map((form) => {
          return <Form id={form.id} key={form.id} label={form.label} />;
        })}
      </div>
      <div className="secondGrid" ref={drop}>
        {board.map((form) => {
          return (
            <Form
              id={form.id}
              key={form.id}
              label={form.label}
              // movecCard={moveCard}
            />
          );
        })}
      </div>
    </>
  );
}

export default DragNDrop;
