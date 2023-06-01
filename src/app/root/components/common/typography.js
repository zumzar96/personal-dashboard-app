import React from "react";
import Typography from "@mui/material/Typography";

const commonTypography = ({ children, color, variant, disabled, sx }) => {
  return (
    <Typography sx={sx} href="#" variant={variant} color={color}>
      {children}
    </Typography>
  );
};

export default commonTypography;