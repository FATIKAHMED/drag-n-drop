import {
  Checkbox,
  Divider,
  Drawer,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import "./file.css";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";/
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDrag } from "react-dnd";
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

function Form({ id, key, label, moveCard, icon }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "input",
    item: { id: id, text: label },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // const dragIndex = isDragging.id;
  // const hoverIndex = id;
  const titles = ["headings", "name"];
  // moveCard(dragIndex, hoverIndex, id);
  // isDragging.id = hoverIndex;

  return (
    // <img
    //   ref={drag}
    //   src={url}
    //   width="150px"
    //   style={{ border: isDragging ? "5px solid pink" : "0px" }}
    // />
    <>
      {/* <input ref={drag} /> */}
      <div ref={drag} className="sequence">
        <div className="icon">{icon}</div>
        <Typography sx={{ fontWeight: "700", marginLeft: "1.5rem" }}>
          {label}
        </Typography>
      </div>
      <Divider />

      {/* <div
        ref={drag}
        style={{ marginBottom: "1rem", display: "flex", gap: "0.25rem" }}
      >
        <TextField id="outlined-basic" label="First Name*" variant="outlined" />
        <TextField id="outlined-basic" label="last Name*" variant="outlined" />
      </div>

      <TextField
        id="outlined-basic"
        label="Email*"
        variant="outlined"
        ref={drag}
      />
      <TextField
        id="outlined-basic"
        label="Phone Number*"
        variant="outlined"
        ref={drag}
      />

      <Checkbox {...label} />

      <Radio value="outlined" label="Outlined" variant="outlined" /> */}
      {/* <LocalizationProvider dateAdapter={AdapterDayjs} ref={drag}>
        <DatePicker label="Basic date picker" />
      </LocalizationProvider> */}
      {/* <div ref={drag} style={{ marginBottom: "1rem" }}>
        <TextField id="outlined-basic" label="Email*" variant="outlined" />
      </div>
      <div ref={drag} style={{ marginBottom: "1rem" }}>
        <TextField
          id="outlined-basic"
          label="Phone Number*"
          variant="outlined"
        />
      </div> */}
    </>
  );
}

export default Form;
