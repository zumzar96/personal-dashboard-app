import { mdiBorderAll } from "@mdi/js";
import { SxProps } from "@mui/material";

const gridContainer: SxProps = {
    display: "flex",
    // backgroundColor: "green",
    flexDirection: "column-reverse",
    height: "87%"
};

const gridItemWrapper: SxProps = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    width: "100%",
    height: "90%",
    alignItems: "center",
    // backgroundColor:'red'
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

const warehouseWrapper: SxProps = {
    display: "flex",
    height: "75%",
    width: "95%",
    paddingBottom: "35px",
    // backgroundColor:'yellow',
    justifyContent:'space-between',
    gap:'0.2rem',
    flexDirection:{ 
        xs: 'column-reverse',
        sm: 'column-reverse',
        md: 'row',
        lg: 'row',
        xl: 'row',},
    
}

const mapContainerWrapper: SxProps = {
    display: "flex",
    flexDirection:'column',
    // height: "100%",
    height:{ 
        xs: '85%',
        sm: '85%',
        md: '100%',
        lg: '100%',
        xl: '100%',},
    width:{ 
        xs: '100%',
        sm: '100%',
        md: '70%',
        lg: '70%',
        xl: '70%',},
    // paddingBottom: "35px",
    // backgroundColor:'red',
    borderRadius: 1,
    
}

const materialsIconBoxWrapper: SxProps = {
    padding:'0.6rem',
    display: "flex",
    gap:'0.5rem',
    height: { 
        xs: '60%',
        sm: '60%',
        md: '100%',
        lg: '100%',
        xl: '100%',},
    width:{ 
        xs: '100%',
        sm: '100%',
        md: '25%',
        lg: '25%',
        xl: '25%',},
    // paddingBottom: "35px",
    // backgroundColor:'green',
    justifyContent:'center',
    alignContent:'flex-start',
    flexWrap:'wrap',
    overflow: "auto",
    borderRadius: 1,
    backgroundColor:"#ddd"
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
const boxMaterialWrapper : SxProps ={
    display: "flex",
    width: "4rem",
    height: "5rem",
    flexDirection: "column",
    justifyContent: "center",
}

const boxMaterialTextWrapper : SxProps ={
    width: "4rem",
    display: "inline-block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    // display: "-webkit-box",
    whiteSpace: "nowrap",
    "-webkit-line-clamp": 1,
    "-webkit-box-orient": "vertical",
}




export {boxMaterialTextWrapper,boxMaterialWrapper,materialsIconBoxWrapper ,warehouseWrapper , mapContainerWrapper, inputWrapper, buttonWrapper, breadcrumbWrapper, gridItemWrapper, gridContainer, dialogMainContainer, imageDialogWraper, iconButtonWraper, inputImageWraper, imagePaperWraper, dialogContainer, formInputContainer, dialogTitleContainer, uploadButtonContainer, fullWdithFormInputContainer };