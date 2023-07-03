import React from "react";
import { createTheme } from "@mui/material/styles";

const rootTheme = createTheme({
  palette: {
    primary: {
      main: "#7c7af8",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#808080",
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          height: "0.7rem",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
        shrink: {
          transform: "translate(14px, -8px) scale(0.8) !important",
        },
        outlined: {
          transform: "translate(14px, 10px) scale(1)",
        },
      },
    },
  },
  // typography: {
  //   fontSize: 14,
  //   fontFamily: [
  //     "-apple-system",
  //     "BlinkMacSystemFont",
  //     '"Segoe UI"',
  //     "Roboto",
  //     '"Helvetica Neue"',
  //     "Arial",
  //     "sans-serif",
  //     '"Apple Color Emoji"',
  //     '"Segoe UI Emoji"',
  //     '"Segoe UI Symbol"',
  //   ].join(","),
  // },
});
export default rootTheme;
