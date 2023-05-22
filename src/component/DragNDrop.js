import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
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

const SortableForm = SortableElement(({ id, label }) => (
  <Form id={id} key={id} label={label} />
));

const SortableFormList = SortableContainer(({ forms }) => {
  return (
    <div className="firstGrid">
      {forms.map((form, index) => (
        <SortableForm
          key={form.id}
          index={index}
          id={form.id}
          label={form.label}
        />
      ))}
    </div>
  );
});

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

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setBoard((board) => arrayMove(board, oldIndex, newIndex));
  };

  return (
    <>
      <SortableFormList forms={FormList} onSortEnd={onSortEnd} useDragHandle />
      <div className="secondGrid" ref={drop}>
        {board.map((form) => (
          <SortableForm
            key={form.id}
            index={form.id}
            id={form.id}
            label={form.label}
          />
        ))}
      </div>
    </>
  );
}

export default DragNDrop;
