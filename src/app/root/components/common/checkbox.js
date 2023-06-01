import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const commonCheckbox = ({ children, color, variant, disabled, sx }) => {
  return (
    <FormControlLabel
      sx={sx}
      label={"Remember me"}
      disabled={disabled}
      control={<Checkbox />}
    />
  );
};

export default commonCheckbox;
