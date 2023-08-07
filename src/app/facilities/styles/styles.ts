import { mdiBorderAll } from "@mdi/js";
import { SxProps } from "@mui/material";

const breadcrumbWrapper: SxProps = {
    display: "flex",
    justifyContent: "flex-end",
};

const buttonWrapper: SxProps = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "1rem",
};

const inputWrapper: SxProps = {
    display: "flex",
    justifyContent: "flex-end",
}

const warehouseWrapper: SxProps = {//TODO increase height of container on sm & xs
    display: "flex",
    height:{ 
        xs: '27.9rem',
        sm: '27.9rem',
        md: '27.9rem',
        lg: '44.9rem',
        xl: '44.9rem',},
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
    justifyContent:'center',
    alignContent:'flex-start',
    flexWrap:'wrap',
    overflow: "auto",
    borderRadius: 1,
    backgroundColor:"#ddd"
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




export {boxMaterialTextWrapper,boxMaterialWrapper,materialsIconBoxWrapper ,warehouseWrapper , mapContainerWrapper, inputWrapper, buttonWrapper, breadcrumbWrapper };