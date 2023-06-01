import React from "react";
import Link from "@mui/material/Link";

const commonLink = ({ children, color, variant, disabled, sx }) => {
  return (
    <Link sx={sx} href="#">
      {children}
    </Link>
  );
};

export default commonLink;
