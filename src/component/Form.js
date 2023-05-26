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
import { useDrag } from "react-dnd";

function Form({ id, label, icon }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "input",
    item: { id: id, text: label },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <>
      <div id={id} ref={drag} className="sequence">
        <div className="icon">{icon}</div>
        <Typography sx={{ fontWeight: "700", marginLeft: "1.5rem" }}>
          {label}
        </Typography>
      </div>
      <Divider />
    </>
  );
}

export default Form;
