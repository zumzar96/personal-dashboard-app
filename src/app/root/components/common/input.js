import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

const commonInput = ({ children, color, variant, disabled, sx, label, onChange }) => {
  return (
    <FormControl  variant="filled">
      <InputLabel htmlFor="component-filled">{children}</InputLabel>
      <TextField onChange={onChange} id="outlined-basic" label={label} variant="outlined" />
    </FormControl>
  );
};

export default commonInput;
