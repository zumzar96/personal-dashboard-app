import React from "react";
import Link from "@mui/material/Link";

const commonLink = ({ children, color, variant, disabled, sx, href }) => {
  return (
    <Link sx={sx} href={href}>
      {children}
    </Link>
  );
};

export default commonLink;
