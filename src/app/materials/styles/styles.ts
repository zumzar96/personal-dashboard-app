import { SxProps } from "@mui/material";

const dialogContainer: SxProps = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
};

const formInputContainer: SxProps = {
    m: 1,
    width: {
      xs: "97%",
      sm: "97%",
      md: "47%",
      lg: "47%",
      xl: "47%",
    },
};

const dialogTitleContainer: SxProps = {
    display: "flex", 
    justifyContent: "center"
};

const uploadButtonContainer : SxProps = {
    marginRight: "-0.7rem"
};

const fullWdithFormInputContainer : SxProps = {
    m: 1,
    width: "97%"
};

export { dialogContainer, formInputContainer, dialogTitleContainer, uploadButtonContainer, fullWdithFormInputContainer };