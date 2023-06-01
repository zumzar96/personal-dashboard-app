import React from "react";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";


const commonInput = ({ children, color, variant, disabled, sx }) => {
  return (
    <FormControl variant="filled">
      <InputLabel htmlFor="component-filled">{children}</InputLabel>
      <FilledInput id="component-filled" />
    </FormControl>
  );
};

export default commonInput;
