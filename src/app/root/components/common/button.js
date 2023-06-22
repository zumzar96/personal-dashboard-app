import React from "react";
import { Button } from "@mui/material";

const commonButton = ({
  disabled,
  children,
  color,
  variant,
  sx,
  onClick,
}) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      variant={variant}
      sx={sx}
      id="component-filled"
    >
      {children}
    </Button>
  );
};

export default commonButton;
