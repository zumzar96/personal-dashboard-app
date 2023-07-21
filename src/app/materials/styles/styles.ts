import { SxProps } from "@mui/material";

const gridItemWrapper: SxProps = {
    height: "29.9rem",
    
};

const breadcrumbWrapper: SxProps = {
    display: "flex",
    justifyContent: "flex-end",
};

const buttonWrapper: SxProps = {
    display: "flex",
    flexWrap:'wrap',
    justifyContent: "flex-end",
    gap: "1rem",
};

const inputWrapper: SxProps = {
    display: "flex",
    justifyContent: "flex-end",
}

const dialogMainContainer: SxProps = {
    maxHeight: "45rem",
};

const dialogContainer: SxProps = {
    height:'10%',
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
const imagePaperWraper : SxProps = {
    position: "relative",
    display: "flex",
    maxWidth:'8rem',
    height: "5rem",
    alignItems: "flex-start",
};
const iconButtonWraper : SxProps = {
    positon: "absolute",
    top: "-0.4rem",
    left: "-0.7rem",
    backgroundColor: "#c7c7c7 !important",//TODO
    height: "1rem",
    width: "1rem",
};
const inputImageWraper : SxProps ={
    height:'5rem',
    
}
const imageDialogWraper : SxProps ={
        maxHeight: {
          xs: '10rem',
          sm: "20rem",
          md: "30rem",
          lg: "30rem",
          xl: "30rem",
        },
        maxWidth: {
          xs: '15rem',
          sm: "30rem",
          md: "50rem",
          lg: "50rem",
          xl: "50rem",
        },
}





export {inputWrapper, buttonWrapper, breadcrumbWrapper, gridItemWrapper,  dialogMainContainer, imageDialogWraper, iconButtonWraper, inputImageWraper, imagePaperWraper, dialogContainer, formInputContainer, dialogTitleContainer, uploadButtonContainer, fullWdithFormInputContainer };