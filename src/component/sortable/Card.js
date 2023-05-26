import styled from "@emotion/styled";
import { TextField, Typography, Box, Button } from "@mui/material";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
// const style = {
//   border: "1px dashed gray",
//   padding: "0.5rem 1rem",
//   marginBottom: ".5rem",
//   backgroundColor: "white",
//   cursor: "move",
// };

const Cover = styled("div")(({ theme }) => ({
  textAlign: "center",
  paddingTop: "2rem",

  margin: "2rem",
  border: "1px solid #5A5A5A ",
  borderRadius: "10px",
  ".content": { paddingLeft: "3rem", paddingRight: "3rem" },
  ".abc": {
    fontSize: "1.5rem",
    textAlign: "center",
    paddingBottom: "1rem",
  },
  ".description": {
    fontSize: "0.85rem",
    color: "#5A5A5A",
    paddingBottom: "1rem",
  },
}));

const LinkBox = styled("div")(({ theme }) => ({
  height: "3.5rem",
  backgroundColor: "red",
  outline: "none",
  borderRadius: "0px 0px 10px 10px",
  borderColor: "red",
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingLeft: "2rem",
  paddingRight: "2rem",
}));

export const Card = ({ id, text, index, moveCard, card }) => {
  console.log(text);

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "div",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "div",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <>
      {text == "Heading" ? (
        <TextField
          ref={ref}
          fullWidth
          label="Heading"
          id="fullWidth"
          data-handler-id={handlerId}
        ></TextField>
      ) : (
        " "
      )}
      {text == "Full name" ? (
        <Cover ref={ref}>
          <Box className="content">
            <Typography className="abc">
              Name<span style={{ color: "red" }}>*</span>
            </Typography>
            <Typography className="description">
              Please make sure you capitalize both your first name and last
              name: ex. Zander Holt (NOT zander holt)
            </Typography>
            <div
              style={{ display: "flex", gap: "1rem", paddingBottom: "2rem" }}
            >
              <TextField
                fullWidth
                label="First Name"
                id="fullWidth1"
                data-handler-id={handlerId}
              ></TextField>
              <TextField
                fullWidth
                label="last Name"
                id="fullWidth2"
                data-handler-id={handlerId}
              ></TextField>
            </div>
          </Box>
          <LinkBox>
            <Button sx={{ color: "white" }}>&larr; PREVIOUS</Button>
            <Button sx={{ color: "white" }}>NEXT &rarr;</Button>
          </LinkBox>
        </Cover>
      ) : (
        " "
      )}
      {text == "Email" ? (
        <>
          <Cover>
            <Typography className="abc">
              Email<span style={{ color: "red" }}>*</span>
            </Typography>
            <Box className="content">
              <TextField
                ref={ref}
                fullWidth
                label="Email"
                id="fullWidth"
                data-handler-id={handlerId}
                helperText="someone@example.com"
              ></TextField>
            </Box>
          </Cover>
        </>
      ) : (
        " "
      )}
    </>
  );
};

//<TextField ref={ref} fullWidth label="Heading" id="fullWidth" data-handler-id={handlerId}></TextField>
