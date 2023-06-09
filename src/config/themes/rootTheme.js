import React from "react";
import { createTheme } from "@mui/material/styles";

const rootTheme = createTheme({
  palette: {
    primary: {
      main: '#85818b',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#9b9b9b',
    },
  },
  typography: {
    fontSize: 14,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
export default rootTheme;
