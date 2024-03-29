import { SxProps } from "@mui/material";

const gridItemWrapper: SxProps = {
    // height: "32.9rem",
    height:{ 
        xs: '27.9rem',
        sm: '27.9rem',
        md: '27.9rem',
        lg: '41.9rem',
        xl: '44.9rem',},
    
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
    p: 2
};

const formInputContainer: SxProps = {
    width: "100%"
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
    maxWidth:'80%',
    backgroundColor:'transparent',
    border:'0px',
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
    height:'100%',
    // width:'100%',
    
}
const imageDialogWraper : SxProps ={
        maxHeight: '100%',
        maxWidth: "100%",
        
}





export {inputWrapper, buttonWrapper, breadcrumbWrapper, gridItemWrapper,  dialogMainContainer, imageDialogWraper, iconButtonWraper, inputImageWraper, imagePaperWraper, dialogContainer, formInputContainer, dialogTitleContainer, uploadButtonContainer, fullWdithFormInputContainer };