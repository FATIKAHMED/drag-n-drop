import styled from "@emotion/styled";
import { TextField, Typography, Box, Button } from "@mui/material";
import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  ".email": {
    marginBottom: "2rem",
  },
  ".address": {
    marginBottom: "1.5rem",
  },
  ".button": {
    marginBottom: "2rem",
  },
  ".button-container": {
    display: "flex",
    gap: "2rem",
    marginBottom: "2rem",
  },
  ".radiosContainer": {
    display: "flex",
    gap: "2rem",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  ".radios": {
    paddingTop: ".75rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    width: "100%",
    border: "1px solid #D3D3D3",
    borderRadius: "10px",
  },
  ".paragraph": {
    marginBottom: "2rem",
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
  const [paragraph, setParagraph] = useState("");
  const [options, setOptions] = useState("");

  const handleoptionsChange = (event) => {
    setOptions(event.target.value);
  };

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
          <Cover ref={ref}>
            <Typography className="abc">
              Email<span style={{ color: "red" }}>*</span>
            </Typography>
            <Box className="content">
              <TextField
                className="email"
                fullWidth
                label="Email"
                id="fullWidth"
                data-handler-id={handlerId}
                helperText="someone@example.com"
              ></TextField>
            </Box>
            <LinkBox>
              <Button sx={{ color: "white" }}>&larr; PREVIOUS</Button>
              <Button sx={{ color: "white" }}>NEXT &rarr;</Button>
            </LinkBox>
          </Cover>
        </>
      ) : (
        " "
      )}
      {text == "Address" ? (
        <>
          <Cover ref={ref}>
            <Box className="content">
              <Typography className="abc">Address</Typography>

              <TextField
                className="address"
                fullWidth
                id="fullWidth"
                data-handler-id={handlerId}
                helperText="Street Address"
              ></TextField>
              <TextField
                className="address"
                fullWidth
                id="fullWidth"
                data-handler-id={handlerId}
                helperText="Street Address Line 2"
              ></TextField>
              <div
                style={{ display: "flex", gap: "1rem", paddingBottom: "1rem" }}
              >
                <TextField
                  fullWidth
                  id="fullWidth1"
                  data-handler-id={handlerId}
                  helperText="City"
                ></TextField>
                <TextField
                  fullWidth
                  id="fullWidth2"
                  data-handler-id={handlerId}
                  helperText="State/Province"
                ></TextField>
              </div>
              <TextField
                className="address"
                fullWidth
                id="fullWidth2"
                data-handler-id={handlerId}
                helperText="Postal/ Zip Code"
              ></TextField>
            </Box>
            <LinkBox>
              <Button sx={{ color: "white" }}>&larr; PREVIOUS</Button>
              <Button sx={{ color: "white" }}>NEXT &rarr;</Button>
            </LinkBox>
          </Cover>
        </>
      ) : (
        ""
      )}
      {text == "Phone" ? (
        <>
          <Cover ref={ref}>
            <Typography className="abc">Phone Number</Typography>

            <Box className="content">
              <TextField
                className="email"
                fullWidth
                id="fullWidth"
                data-handler-id={handlerId}
                helperText="Please enter a valid phone number"
                placeholder="(###) ###-####"
              ></TextField>
            </Box>
            <LinkBox>
              <Button sx={{ color: "white" }}>&larr; PREVIOUS</Button>
              <Button sx={{ color: "white" }}>NEXT &rarr;</Button>
            </LinkBox>
          </Cover>
        </>
      ) : (
        " "
      )}
      {text == "Date Picker" ? (
        <>
          <Cover ref={ref}>
            <Typography className="abc">Date</Typography>

            <Box className="content"></Box>
            <LinkBox>
              <Button sx={{ color: "white" }}>&larr; PREVIOUS</Button>
              <Button sx={{ color: "white" }}>NEXT &rarr;</Button>
            </LinkBox>
          </Cover>
        </>
      ) : (
        ""
      )}
      {text == "Button" ? (
        <>
          <Cover ref={ref}>
            <Box className="content">
              <TextField
                className="button"
                fullWidth
                id="standard-multiline-flexible"
                placeholder="Enter Text Here"
                multiline
                variant="standard"
              />
              <Box className="button-container">
                <Button variant="outlined" fullWidth>
                  Yes
                </Button>
                <Button variant="outlined" fullWidth>
                  No
                </Button>
              </Box>
            </Box>
            <LinkBox>
              <Button sx={{ color: "white" }}>&larr; PREVIOUS</Button>
              <Button sx={{ color: "white" }}>NEXT &rarr;</Button>
            </LinkBox>
          </Cover>
        </>
      ) : (
        " "
      )}
      {text == "Radio button" ? (
        <>
          <Cover ref={ref}>
            <Box className="content">
              <TextField
                className="button"
                fullWidth
                id="standard-multiline-flexible"
                placeholder="Enter Text Here"
                multiline
                variant="standard"
              />
              <TextField
                className="button"
                fullWidth
                id="standard-multiline-flexible"
                placeholder="Type a description"
                multiline
                variant="standard"
              />
              <FormControl sx={{ width: "100%" }}>
                <Box className="radiosContainer">
                  <Box className="radios">
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        control={<Radio />}
                        label={
                          <TextField
                            className="button"
                            fullWidth
                            id="standard-multiline-flexible"
                            placeholder="Type option 1"
                            multiline
                            variant="standard"
                          />
                        }
                      />
                    </RadioGroup>
                  </Box>
                  <Box className="radios">
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        control={<Radio />}
                        label={
                          <TextField
                            className="button"
                            fullWidth
                            id="standard-multiline-flexible"
                            placeholder="Type option 2"
                            multiline
                            variant="standard"
                          />
                        }
                      />
                    </RadioGroup>
                  </Box>
                </Box>
                <Box className="radiosContainer">
                  <Box className="radios">
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        control={<Radio />}
                        label={
                          <TextField
                            className="button"
                            fullWidth
                            id="standard-multiline-flexible"
                            placeholder="Type option 1"
                            multiline
                            variant="standard"
                          />
                        }
                      />
                    </RadioGroup>
                  </Box>
                  <Box className="radios">
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        control={<Radio />}
                        label={
                          <TextField
                            className="button"
                            fullWidth
                            id="standard-multiline-flexible"
                            placeholder="Type option 2"
                            multiline
                            variant="standard"
                          />
                        }
                      />
                    </RadioGroup>
                  </Box>
                </Box>
              </FormControl>
            </Box>
            <LinkBox>
              <Button sx={{ color: "white" }}>&larr; PREVIOUS</Button>
              <Button sx={{ color: "white" }}>NEXT &rarr;</Button>
            </LinkBox>
          </Cover>
        </>
      ) : (
        " "
      )}
      {text == "Check Box" ? (
        <>
          <Cover ref={ref}>
            <Box className="content">
              <TextField
                className="button"
                fullWidth
                id="standard-multiline-flexible"
                placeholder="Enter Text Here"
                multiline
                variant="standard"
              />
              <TextField
                className="button"
                fullWidth
                id="standard-multiline-flexible"
                placeholder="Type a description"
                multiline
                variant="standard"
              />
              <FormGroup sx={{ width: "100%" }}>
                <Box className="radiosContainer">
                  <Box className="radios">
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label={
                        <TextField
                          className="button"
                          fullWidth
                          id="standard-multiline-flexible"
                          placeholder="Type option here"
                          multiline
                          variant="standard"
                        />
                      }
                    />
                  </Box>
                  <Box className="radios">
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label={
                        <TextField
                          className="button"
                          fullWidth
                          id="standard-multiline-flexible"
                          placeholder="Type option here"
                          multiline
                          variant="standard"
                        />
                      }
                    />
                  </Box>
                </Box>
                <Box className="radiosContainer">
                  <Box className="radios">
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label={
                        <TextField
                          className="button"
                          fullWidth
                          id="standard-multiline-flexible"
                          placeholder="Type option here"
                          multiline
                          variant="standard"
                        />
                      }
                    />
                  </Box>
                  <Box className="radios">
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label={
                        <TextField
                          className="button"
                          fullWidth
                          id="standard-multiline-flexible"
                          placeholder="Type option here"
                          multiline
                          variant="standard"
                        />
                      }
                    />
                  </Box>
                </Box>
              </FormGroup>
            </Box>
            <LinkBox>
              <Button sx={{ color: "white" }}>&larr; PREVIOUS</Button>
              <Button sx={{ color: "white" }}>NEXT &rarr;</Button>
            </LinkBox>
          </Cover>
        </>
      ) : (
        " "
      )}
      {text == "Text Feild" ? (
        <>
          <Cover ref={ref}>
            <Box className="content">
              <TextField
                className="button"
                fullWidth
                id="standard-multiline-flexible"
                placeholder="Type Question Here"
                multiline
                variant="standard"
              />
              <TextField
                className="button"
                fullWidth
                id="standard-multiline-flexible"
                placeholder="Type a description"
                multiline
                variant="standard"
              />
              <TextField
                className="address"
                fullWidth
                id="fullWidth"
                data-handler-id={handlerId}
                helperText={
                  <TextField
                    className="button"
                    small
                    id="standard-multiline-flexible"
                    placeholder="Type a sublabel"
                    multiline
                    variant="standard"
                  />
                }
              ></TextField>
            </Box>
            <LinkBox>
              <Button sx={{ color: "white" }}>&larr; PREVIOUS</Button>
              <Button sx={{ color: "white" }}>NEXT &rarr;</Button>
            </LinkBox>
          </Cover>
        </>
      ) : (
        ""
      )}
      {text == "Select Feild" ? (
        <>
          <Cover ref={ref}>
            <Box className="content">
              <TextField
                className="button"
                fullWidth
                id="standard-multiline-flexible"
                placeholder="Type a Question"
                multiline
                variant="standard"
              />
              <TextField
                className="button"
                fullWidth
                id="standard-multiline-flexible"
                placeholder="Type a description"
                multiline
                variant="standard"
              />
              <FormControl fullWidth sx={{ marginBottom: "2rem" }}>
                <InputLabel id="demo-simple-select-label">
                  Please Select
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={options}
                  label="Please Select"
                  onChange={handleoptionsChange}
                >
                  <MenuItem value={options}>
                    <TextField
                      className="button"
                      fullWidth
                      id="standard-multiline-flexible"
                      placeholder="Option 1"
                      multiline
                      variant="standard"
                    />{" "}
                  </MenuItem>
                  <MenuItem value={options}>
                    <TextField
                      className="button"
                      fullWidth
                      id="standard-multiline-flexible"
                      placeholder="Option 2"
                      multiline
                      variant="standard"
                    />{" "}
                  </MenuItem>
                  <MenuItem value={options}>
                    <TextField
                      className="button"
                      fullWidth
                      id="standard-multiline-flexible"
                      placeholder="Option 3"
                      multiline
                      variant="standard"
                    />{" "}
                  </MenuItem>
                  <MenuItem value={options}>
                    <TextField
                      className="button"
                      fullWidth
                      id="standard-multiline-flexible"
                      placeholder="Option 4"
                      multiline
                      variant="standard"
                    />{" "}
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <LinkBox>
              <Button sx={{ color: "white" }}>&larr; PREVIOUS</Button>
              <Button sx={{ color: "white" }}>NEXT &rarr;</Button>
            </LinkBox>
          </Cover>
        </>
      ) : (
        ""
      )}
      {text == "Paragraph" ? (
        <>
          <Cover ref={ref}>
            <Box className="content">
              <TextField
                className="button"
                fullWidth
                id="standard-multiline-flexible"
                placeholder="Type a Question"
                multiline
                variant="standard"
              />
              <TextField
                className="button"
                fullWidth
                id="standard-multiline-flexible"
                placeholder="Type a description"
                multiline
                variant="standard"
              />
              <Box className="paragraph">
                <ReactQuill
                  theme="snow"
                  value={paragraph}
                  onChange={setParagraph}
                />
              </Box>
            </Box>
            <LinkBox>
              <Button sx={{ color: "white" }}>&larr; PREVIOUS</Button>
              <Button sx={{ color: "white" }}>NEXT &rarr;</Button>
            </LinkBox>
          </Cover>
        </>
      ) : (
        ""
      )}
    </>
  );
};
