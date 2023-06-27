import * as React from "react";
import { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import Loader from "../../root/components/common/loader";
import Alert from "../../root/components/common/alert";
import { useDeleteMaterialsMutation } from "../materialsApiSlice";
import DeleteTypography from "../../root/components/common/typography";
import * as sxProps from "../styles/styles.ts";
import { toast } from "react-toastify";


const MaterialDialog = ({
  open,
  setOpen,

  //   deleteMaterialsIds,
  checkboxSelectionModel,
  setCheckboxSelectionModel,
}) => {
  const user_info = useSelector((state) => state.login.user_info);

  const [
    deleteMaterials,
    {
      isLoading: deleteMaterialsLoading,
      isError: deleteMaterialsError,
      isSuccess: deleteMaterialsSuccess,
      reset: deleteMaterialsResetMuatation,
    },
  ] = useDeleteMaterialsMutation();

  const closeDialogHandler = () => {
    setOpen(false);
    deleteMaterialsResetMuatation();
  };

  const confirmDeleteHandler = () => {
    deleteMaterials({ token: user_info.token, id: checkboxSelectionModel });
  };

  useEffect(() => {
    if (deleteMaterialsSuccess) {
      toast.success("Materials deleted");
    }
    setOpen(false);//TODO
    deleteMaterialsResetMuatation();
    setCheckboxSelectionModel([]);
  }, [deleteMaterialsSuccess]); //TODO adjust isSucces state

  useEffect(() => {
    if (deleteMaterialsError) {
      toast.error("Materials delete error");
      setOpen(false);//TODO
    }
  }, [deleteMaterialsError]);

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
