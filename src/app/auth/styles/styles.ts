import { SxProps } from "@mui/material";

const authContainer: SxProps = {
  display: "flex",
  // backgroundColor: "red",
  height: "46.6rem",
  alignItems: "center",
  // justifyContent: "space-evenly",
};

const svgLayout: SxProps = {
  display: "flex",
  // backgroundColor: "green",
  width: "80%",
  height: "25rem",
  justifyContent: "flex-end",
};

const loginFormLayout: SxProps = {
  display: "flex",
  flexDirection: "column",
  rowGap: "0.6rem",
  width: "70%",
  height: "25rem",
  // backgroundColor: "blue",
};

const linkColor: SxProps = {
  color: "secondary.main",
  textDecorationColor: "grey",
};

const checkBoxColor : SxProps = {
  color: "secondary.main",
};

const typograhyColor : SxProps = {
  color: "secondary.main"
};

export {authContainer, svgLayout, loginFormLayout, linkColor, checkBoxColor, typograhyColor };
