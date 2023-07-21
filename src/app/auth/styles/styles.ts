import { SxProps } from "@mui/material";

const authContainer: SxProps = {
  height: "100vh",
  p:2
};

const svgWrapper: SxProps = {
  display:{ 
    xs: 'none',
    sm: 'none',
    md: 'flex',
    lg: 'flex',
    xl: 'flex',},
  alignItems:'center',
  justifyContent: "center",
  height:'100%',
  wdith:'100%',
};

const svgLayout: SxProps = {
  display: "flex",
  width: "63%",
  height: "50%",
};

const svg: SxProps = {
  display: "flex",
  width: "100%",
  height: "100%",
};

const authFormWrapper: SxProps = {
  display: "flex",
  height:'100%',
  wdith:'100%',
  flexDirection: "column",
  rowGap: "0.6rem",
  justifyContent: "center",
  alignItems:'center'
};

const authForm: SxProps = {
  display: "flex",
  flexDirection: "column",
  rowGap: "0.6rem",
  width:{ 
    xs: '100%',
    sm: '70%',
    md: '70%',
    lg: '60%',
    xl: '60%',},
};

const linkColor: SxProps = {
  color: "neutral.main",
  textDecorationColor: "grey",
};

const checkBoxColor : SxProps = {
  color: "secondary.main",
};

const typograhyColor : SxProps = {
  color: "secondary.main"
};

export {svg, authContainer, svgLayout, authForm ,authFormWrapper, linkColor, checkBoxColor, typograhyColor, svgWrapper };
