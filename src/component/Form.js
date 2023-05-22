import { Checkbox, Radio, TextField } from "@mui/material";
import React from "react";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";/
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDrag } from "react-dnd";

function Form({ id, key, label, moveCard }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "input",
    item: { id: id, text: label },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // const dragIndex = isDragging.id;
  // const hoverIndex = id;

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
      <div
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

      <Radio value="outlined" label="Outlined" variant="outlined" />
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
