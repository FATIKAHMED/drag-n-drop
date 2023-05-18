import React, { useCallback, useState } from "react";
import Form from "./Form";
import update from "immutability-helper";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import "./file.css";
import { hover } from "@testing-library/user-event/dist/hover";

var FormList = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
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
    FormList = FormList.filter((form) => id === form.id);
    // setBoard((board) => [...board, FormList[0]]);
    setBoard((board) => [...board, FormList[0]]);
  };
  // const moveCard = useCallback((dragIndex, hoverIndex) => {
  //   setBoard((prevCards) =>
  //     update(prevCards, {
  //       $splice: [
  //         [dragIndex, 1],
  //         [hoverIndex, 0, prevCards[dragIndex]],
  //       ],
  //     })
  //   );
  // }, []);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "input",
    item: { id: FormList.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  //trying to re arrange

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setBoard((board) =>
      update(board, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, board[dragIndex]],
        ],
      })
    );
  }, []);

  return (
    <div>
      <div className="mainContainer">
        <div className="firstGrid">
          {FormList.map((form) => {
            return <Form id={form.id} />;
          })}
        </div>
        <div className="secondGrid" ref={drop}>
          {board.map((form) => {
            return <Form id={form.id} moveCard={moveCard} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default DragNDrop;
