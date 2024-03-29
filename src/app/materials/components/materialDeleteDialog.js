import * as React from "react";
import { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import Loader from "../../root/components/common/loader";
import Alert from "../../root/components/common/alert";
import { useDeleteMaterialsMutation } from "../materialsApiSlice";
import DeleteTypography from "../../root/components/common/typography";
import * as sxProps from "../styles/styles.ts";

const MaterialDialog = ({
  open,
  toggleDeleteMaterialModalHandler,

  //   deleteMaterialsIds,
  checkboxSelectionModel,
  emptyCheckboxSelectionModelHandler,
}) => {
  const [
    deleteMaterials,
    { isLoading: deleteMaterialsLoading, reset: deleteMaterialsResetMuatation },
  ] = useDeleteMaterialsMutation();

  const closeDialogHandler = () => {
    toggleDeleteMaterialModalHandler();
    deleteMaterialsResetMuatation();
  };

  const confirmDeleteHandler = () => {
    deleteMaterials({ id: checkboxSelectionModel });
    toggleDeleteMaterialModalHandler();
    deleteMaterialsResetMuatation();
    emptyCheckboxSelectionModelHandler();
  };

  return (
    <Dialog open={open} onClose={closeDialogHandler}>
      <DialogTitle sx={sxProps.dialogTitleContainer}>Delete</DialogTitle>
      {deleteMaterialsLoading ? ( //TODO adjust isLaoding state
        <DialogContent>
          <Loader></Loader>
        </DialogContent>
      ) : (
        <>
          <DialogContent>
            <DeleteTypography>
              Are you sure you want to delete material material?
            </DeleteTypography>
            {/* {deleteMaterialsError ? (
              <Alert severity="error">Error delete</Alert>
            ) : null} */}
          </DialogContent>
          <DialogActions>
            <Button variant={"contained"} onClick={confirmDeleteHandler}>
              Confirm
            </Button>

            <Button variant={"contained"} onClick={closeDialogHandler}>
              Cancel
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default MaterialDialog;
