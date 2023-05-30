import * as React from "react";
import { Box } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateField } from "@mui/x-date-pickers";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";

export default function BasicDatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <Box sx={{ width: "100%", marginBottom: "2rem" }}>
          <DatePicker
            label="MM/DD/YYYY"
            sx={{ width: "100%" }}
            slotProps={{
              textField: {
                helperText: "Date",
              },
            }}
          />
        </Box>
      </DemoContainer>
      {/* <DateField /> */}
    </LocalizationProvider>
  );
}
