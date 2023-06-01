import { SxProps } from "@mui/material";

const svgLayout: SxProps = {
  display: "flex",
  flexDirection: "row",
  height: "35rem",
  width: "35rem",
  // alignContent: "center",
  justifyContent: "center",
  marginLeft:{ 
    xs: '-14rem',
    sm: '-14rem',
    md: '3rem',
    lg: '10rem',
    xl: '14rem',},
  marginTop:{ 
    xs: '22rem',
    sm: '22rem',
    md: '7.3rem',
    lg: '7.3rem',
    xl: '7.3rem',},
  // marginTop: "7.3rem",
};

const loginFormLayout: SxProps = {
  display: "flex",
  flexDirection: "column",
  // width: "30rem",
  width:{ 
    xs: '17rem',
    sm: '27rem',
    md: '27rem',
    lg: '30rem',
    xl: '30rem',},
  rowGap: "0.6rem",
  // "&>*:nth-of-type(2)": { marginTop: "-0.6rem" },
  marginTop:{ 
    xs: '3.4rem',
    sm: '6.4rem',
    md: '6.4rem',
    lg: '6.4rem',
    xl: '6.4rem',},
  transform:{
    xs: 'translate(-4.5rem, 2rem)',
    sm: 'translate(-5.5rem, 2rem)',
    md: 'translate(0rem, 0rem)',
    lg: 'translate(0rem, 0rem)',
    xl: 'translate(0rem, 0rem)',} ,
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

export { svgLayout, loginFormLayout, linkColor, checkBoxColor, typograhyColor };
