import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import * as sxProps from "../styles/styles.ts";
import Box from "@mui/material/Box";

const imageDialog = ({ open, setOpen, image }) => {
  const closeDialogHandler = () => {
    setOpen(false);
  };

  return (
    <Dialog maxWidth open={open} onClose={closeDialogHandler}>
      <DialogContent>
        <Box
          component="img"
          sx={sxProps.imageDialogWraper}
          alt="dialogImage"
          src={image}
        />
      </DialogContent>
    </Dialog>
  );
};

export default imageDialog;
