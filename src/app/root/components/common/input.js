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
  id,
  error,
  helperText,
  name,
  onBlur,
  endAdornment,
  InputProps,
  type,
  value,
}) => {
  return (
    <TextField
      value={value}
      disabled={disabled}
      name={name}
      sx={sx}
      onChange={onChange}
      onBlur={onBlur}
      id={id}
      label={label}
      variant="outlined"
      error={error}
      helperText={helperText}
      endAdornment={endAdornment}
      InputProps={InputProps}
      type={type}
    />
  );
};

export default commonInput;
