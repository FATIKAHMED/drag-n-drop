import React, { useCallback, useState } from "react";
import update from "immutability-helper";
import { useDrop } from "react-dnd";
import "./file.css";
import Form from "./Form";
import HMobiledataSharpIcon from "@mui/icons-material/HMobiledataSharp";
import AccountBoxSharpIcon from "@mui/icons-material/AccountBoxSharp";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import LocalPhoneSharpIcon from "@mui/icons-material/LocalPhoneSharp";
import EditCalendarSharpIcon from "@mui/icons-material/EditCalendarSharp";
import EventSharpIcon from "@mui/icons-material/EventSharp";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import SmartButtonSharpIcon from "@mui/icons-material/SmartButtonSharp";
import RadioButtonCheckedSharpIcon from "@mui/icons-material/RadioButtonCheckedSharp";
import CheckBoxSharpIcon from "@mui/icons-material/CheckBoxSharp";
import CreateIcon from "@mui/icons-material/Create";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import EditNoteIcon from "@mui/icons-material/EditNote";

const FormList = [
  {
    id: 1,
    label: "Heading",
    icon: <HMobiledataSharpIcon />,
  },
  {
    id: 2,
    label: "Full name",
    icon: <AccountBoxSharpIcon />,
  },
  {
    id: 3,
    label: "Email",
    icon: <EmailSharpIcon />,
  },
  {
    id: 4,
    label: "Address",
    icon: <LocationOnSharpIcon />,
  },
  {
    id: 5,
    label: "Phone",
    icon: <LocalPhoneSharpIcon />,
  },
  {
    id: 6,
    label: "Date Picker",
    icon: <EditCalendarSharpIcon />,
  },
  {
    id: 7,
    label: "Appointment",
    icon: <EventSharpIcon />,
  },
  {
    id: 8,
    label: "Signature",
    icon: <BorderColorSharpIcon />,
  },
  {
    id: 9,
    label: "Button",
    icon: <SmartButtonSharpIcon />,
  },
  {
    id: 10,
    label: " Radio button",
    icon: <RadioButtonCheckedSharpIcon />,
  },
  {
    id: 11,
    label: "Check Box",
    icon: <CheckBoxSharpIcon />,
  },
  {
    id: 12,
    label: "Text Feild",
    icon: <CreateIcon />,
  },
  {
    id: 13,
    label: "Select Feild",
    icon: <ChecklistRtlIcon />,
  },
  {
    id: 14,
    label: "Paragraph",
    icon: <EditNoteIcon />,
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
          return (
            <Form
              id={form.id}
              key={form.id}
              label={form.label}
              icon={form.icon}
            />
          );
        })}
      </div>
      <div className="secondGrid" ref={drop}>
        {board.map((form) => {
          return (
            <Form
              id={form.id}
              key={form.id}
              label={form.label}
              icon={form.icon}
              // movecCard={moveCard}
            />
          );
        })}
      </div>
    </>
  );
}

export default DragNDrop;
