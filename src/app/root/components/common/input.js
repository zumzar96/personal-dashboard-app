import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

const commonInput = ({
  children,
  color,
  variant,
  disabled,
  sx,
  label,
  onChange,
  id
}) => {
  return (
    <FormControl variant="filled">
      <InputLabel htmlFor="component-filled">{children}</InputLabel>
      <TextField
        sx={sx}
        onChange={onChange}
        id={id}
        label={label}
        variant="outlined"
      />
    </FormControl>
  );
};

export default commonInput;
