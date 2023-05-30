import update from "immutability-helper";
import { useCallback, useState } from "react";
import { Card } from "./sortable/Card";
import { useDrop } from "react-dnd";
import "./file.css";
import Form from "./Form";
import HMobiledataSharpIcon from "@mui/icons-material/HMobiledataSharp";
import AccountBoxSharpIcon from "@mui/icons-material/AccountBoxSharp";
import EmailSharpIcon from "@mui/icons-material/EmailSharp";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import LocalPhoneSharpIcon from "@mui/icons-material/LocalPhoneSharp";
import EditCalendarSharpIcon from "@mui/icons-material/EditCalendarSharp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
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
    label: "Time Picker",
    icon: <AccessTimeIcon />,
  },
  {
    id: 8,
    label: "Button",
    icon: <SmartButtonSharpIcon />,
  },
  {
    id: 9,
    label: "Radio button",
    icon: <RadioButtonCheckedSharpIcon />,
  },
  {
    id: 10,
    label: "Check Box",
    icon: <CheckBoxSharpIcon />,
  },
  {
    id: 11,
    label: "Text Feild",
    icon: <CreateIcon />,
  },
  {
    id: 12,
    label: "Select Feild",
    icon: <ChecklistRtlIcon />,
  },
  {
    id: 13,
    label: "Paragraph",
    icon: <EditNoteIcon />,
  },
];

function DragNDrop() {
  const [cards, setCards] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "input",
    drop: (item, monitor) => {
      console.log(item);

      setCards((prevCards) =>
        update(prevCards, {
          $splice: [[prevCards.length, 1, item]],
        })
      );
    },
  }));

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  const renderCard = useCallback((card, index) => {
    return (
      <Card
        key={card.id}
        index={index}
        id={card.id}
        text={card.text}
        moveCard={moveCard}
        card={cards}
      />
    );
  }, []);

  console.log();

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
        {cards.map((card, i) => renderCard(card, i))}
      </div>
    </>
  );
}

export default DragNDrop;
