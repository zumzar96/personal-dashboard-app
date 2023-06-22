import React from "react";
import CircularProgress from '@mui/material/CircularProgress';

const commonLoader = ({ children, color, variant, disabled, sx , size}) => {
  return (
    <CircularProgress sx={sx} size={size}>
      {children}
    </CircularProgress>
  );
};

export default commonLoader;
