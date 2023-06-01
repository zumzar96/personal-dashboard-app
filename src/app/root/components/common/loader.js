import React from "react";
import CircularProgress from '@mui/material/CircularProgress';

const commonLoader = ({ children, color, variant, disabled, sx }) => {
  return (
    <CircularProgress sx={sx}>
      {children}
    </CircularProgress>
  );
};

export default commonLoader;
