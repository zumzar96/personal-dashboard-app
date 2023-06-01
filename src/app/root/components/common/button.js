import React from "react";
import { Button } from "@mui/material";

const commonButton = ({ children, color, variant, disabled, sx, onClick }) => {
  return (
    <Button onClick={onClick} variant={variant} sx={sx} id="component-filled">
      {children}
    </Button>
  );
};

export default commonButton;
