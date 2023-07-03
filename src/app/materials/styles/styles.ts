import { SxProps } from "@mui/material";

const gridContainer: SxProps = {
    display: "flex",
    // backgroundColor: "green",
    flexDirection: "column-reverse",
    height: "100%"
};

const gridItemWrapper: SxProps = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    width: "100%",
    height: "90%",
    alignItems: "center",
};

const breadcrumbWrapper: SxProps = {
    display: "flex",
    justifyContent: "flex-end",
    width: "95%",
};

const buttonWrapper: SxProps = {
    display: "flex",
    justifyContent: "flex-end",
    width: "95%",
    gap: "1rem",
};

const inputWrapper: SxProps = {
    display: "flex",
    justifyContent: "flex-end",
    width: "95%",
}

const tableWrapper: SxProps = {
    display: "flex",
    height: "75%",
    width: "95%",
    paddingBottom: "35px",
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





export {tableWrapper, inputWrapper, buttonWrapper, breadcrumbWrapper, gridItemWrapper, gridContainer, dialogMainContainer, imageDialogWraper, iconButtonWraper, inputImageWraper, imagePaperWraper, dialogContainer, formInputContainer, dialogTitleContainer, uploadButtonContainer, fullWdithFormInputContainer };