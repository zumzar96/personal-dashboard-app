import React from "react";
import Alert from "@mui/material/Alert";

const commonAlert = ({ children, color, severity, variant, disabled, sx }) => {
  return (
    <Alert severity={severity} sx={sx} href="#">
      {children}
    </Alert>
  );
};

export default commonAlert;
