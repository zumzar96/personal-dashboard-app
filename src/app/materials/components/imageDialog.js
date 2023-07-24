import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import * as sxProps from "../styles/styles.ts";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const imageDialog = ({ open, setOpen, image }) => {
  const closeDialogHandler = () => {
    setOpen(false);
  };

  return (
    <Dialog maxWidth={"md"} open={open} onClose={closeDialogHandler}>
      <DialogContent>
        <Grid
          container
        >
          <Grid
            item
            component="img"
            sx={sxProps.imageDialogWraper}
            alt="dialogImage"
            src={image}
          ></Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default imageDialog;
