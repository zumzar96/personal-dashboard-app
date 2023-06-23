import React from "react";
import Link from "@mui/material/Link";
import Typography from "./typography";

const commonErrorBoundary = ({
  children,
  color,
  variant,
  disabled,
  sx,
  href,
}) => {
  return (
    <Typography variant="h3" color={"grey"}>
      Error 404 Page not found Error 404 Page not found
    </Typography>
  );
};

export default commonErrorBoundary;
