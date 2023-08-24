import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import * as sxProps from "../styles/styles.ts";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import FormInput from "../../root/components/common/input";
import { Button } from "@mui/material";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import {
  useCreateMaterialMutation,
  useUploadMaterialImageMutation,
  useEditMaterialMutation,
} from "../materialsApiSlice";
import Loader from "../../root/components/common/loader";
import Alert from "../../root/components/common/alert";
import Paper from "@mui/material/Paper";
import ImageDialog from "./imageDialog.js";
import { useTheme } from "@mui/material";

const MaterialDialog = ({
  openMaterialDialog,
  toggleMaterialModalHandler,
  viewMaterialMode,
  viewMaterialModeHandler,
  materialById,
}) => {
  const initialRegistData = useMemo(() => {
    return {
      name: "",
      price: 0,
      image: "",
      brand: "",
      count: 0,
      category: "",
      description: "",
    };
  }, []);
  const [registData, setRegistData] = useState(initialRegistData);
  const [filename, setFilename] = useState("");
  const [editMaterialMode, setEditMaterialMode] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const theme = useTheme();
  const [
    createMaterial,
    { isLoading: createMaterialLoading, reset: materialCreateResetMuatation },
  ] = useCreateMaterialMutation();
  const [
    editMaterial,
    { isLoading: editMaterialLoading, reset: materialEditResetMuatation },
  ] = useEditMaterialMutation();
  const [
    uploadMaterialImage,
    {
      isLoading: materialImageLoading,
      isError: materialImageError,
      isSuccess: materialImageSuccess,
    },
  ] = useUploadMaterialImageMutation();

  // const passRegex =
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; TODO Add Regex to validation

  const SignupSchema = Yup.object().shape({
    name: Yup.string().max(20).required("Field is required"),
    price: Yup.number().max(20).required("Field is required"),
    category: Yup.string().max(20).required("Field is required"),
    count: Yup.number().max(20).required("Field is required"),
    brand: Yup.string().max(20).required("Field is required"),
    image: Yup.string().required("Field is required"),
    description: Yup.string().max(50).required("Field is required"),
  });

  const fileUploadHandler = async (e, setFieldValue) => {
    //TODO refactor
    if (!e.target.files) {
      return;
    }
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      const res = await uploadMaterialImage(formData).unwrap();
      setFilename(res.downloadURL);
      setFieldValue("image", res.downloadURL);
    } catch (err) {
      console.log("error", err);
    }
  };

  //TODO refactor
  const submmitMaterialHandler = (params) => {
    if (editMaterialMode) {
      editMaterial(params);
      // materialEditResetMuatation();
      toggleMaterialModalHandler();
    } else {
      createMaterial(params);
      // materialCreateResetMuatation();
      toggleMaterialModalHandler();
    }
    setEditMaterialMode(false);
    setRegistData(initialRegistData);
    setFilename(initialRegistData.image);
  };

  const removeFileHandler = (setFieldValue) => {
    setFilename(initialRegistData.image);
    setFieldValue("image", initialRegistData.image);
  };

  const editHandler = () => {
    viewMaterialModeHandler()
    setEditMaterialMode(true);
  };

  const closeDialogHandler = () => {
    toggleMaterialModalHandler();
    // resetForm();TODO implement reset form function
    setFilename(initialRegistData.image);
    // materialCreateResetMuatation();
    setRegistData(initialRegistData); //TODO adjust mutation reset
    // dispatch(rootApiSlice.util.resetApiState());TODO adjust mutatuon cache flow
    setEditMaterialMode(false);
  };

  const openImageDialogHandler = () => {
    setOpenImageDialog(true);
  };

  useEffect(() => {
    //TODO setting initial state
    if (materialById.data) {
      if (editMaterialMode || viewMaterialMode) {
        setRegistData((registData) => ({
          ...registData,
          id: materialById.data.id,
          name: materialById.data.name,
          price: materialById.data.price,
          image: materialById.data.image,
          brand: materialById.data.brand,
          count: materialById.data.count,
          category: materialById.data.category,
          description: materialById.data?.description,
        }));
        setFilename(materialById.data.image);
      }
    }
  }, [materialById]);

  return (
    <Dialog
      // sx={sxProps.dialogMainContainer}
      open={openMaterialDialog}
      onClose={closeDialogHandler}
    >
      <DialogTitle sx={sxProps.dialogTitleContainer}>
        {materialById.isFetching ? (
          <Loader></Loader>
        ) : editMaterialMode ? (
          "Edit"
        ) : viewMaterialMode ? (
          "View"
        ) : (
          "Crete"
        )}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1} sx={{ p: theme.spacing(2) }}>
          <Formik
            initialValues={registData}
            validationSchema={SignupSchema}
            enableReinitialize
            onSubmit={(values, { setSubmitting }) => {
              submmitMaterialHandler(values);
              setSubmitting(false);
            }}
          >
            {({
              values,
              submitForm,
              resetForm,
              isSubmitting,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <FormInput
                    sx={sxProps.formInputContainer}
                    name="name"
                    value={values.name}
                    error={touched.name && errors.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.name && errors.name}
                    id="name"
                    label="Name"
                    disabled={viewMaterialMode}
                  ></FormInput>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <FormInput
                    sx={sxProps.formInputContainer}
                    name="price"
                    value={values.price}
                    error={touched.price && errors.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.price && errors.price}
                    id="price"
                    label="Price"
                    type="number"
                    disabled={viewMaterialMode}
                  ></FormInput>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <FormInput
                    sx={sxProps.formInputContainer}
                    name="image"
                    // value={}
                    multiline={filename === "" ? false : true} ///TODO
                    rows={filename === "" ? 1 : 4} ///TODO
                    error={touched.image && errors.image}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.image && errors.image}
                    id="image"
                    label="Image"
                    disabled={viewMaterialMode}
                    InputProps={{
                      readOnly: true,
                      startAdornment:
                        !materialImageLoading && filename ? (
                          //TODO
                          <InputAdornment position="start">
                            <Paper
                              maxWidth
                              sx={sxProps.imagePaperWraper}
                              variant="outlined"
                            >
                              <img
                                onClick={openImageDialogHandler}
                                style={sxProps.inputImageWraper}
                                src={filename}
                              />
                              <IconButton
                                sx={sxProps.iconButtonWraper}
                                aria-label="delete"
                                disabled={viewMaterialMode}
                                onClick={() => removeFileHandler(setFieldValue)}
                              >
                                <CancelTwoToneIcon />
                              </IconButton>
                            </Paper>
                          </InputAdornment>
                        ) : null,
                      endAdornment: (
                        <>
                          {materialImageLoading ? (
                            <InputAdornment position="start">
                              <Loader
                                sx={{
                                  marginTop: filename === "" ? "0rem" : "5rem",
                                }}
                                size="1.3rem"
                              ></Loader>
                            </InputAdornment>
                          ) : null}
                          <InputAdornment
                            sx={sxProps.uploadButtonContainer}
                            position="end"
                          >
                            <Button
                              disabled={viewMaterialMode}
                              sx={{
                                marginTop: filename === "" ? "0rem" : "4.7rem",
                                bgcolor:
                                  touched.image && errors.image
                                    ? "red"
                                    : "primary.main",
                              }}
                              variant="contained"
                              component="label"
                            >
                              Upload
                              <input
                                type="file"
                                hidden
                                onChange={(e) =>
                                  fileUploadHandler(e, setFieldValue)
                                }
                              />
                            </Button>
                          </InputAdornment>
                        </>
                      ),
                    }}
                  ></FormInput>
                  {materialImageError ? (
                    <Alert
                      sx={sxProps.fullWdithFormInputContainer}
                      severity="error"
                    >
                      Image upload failed
                    </Alert>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <FormInput
                    sx={sxProps.formInputContainer}
                    name="brand"
                    value={values.brand}
                    error={touched.brand && errors.brand}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.brand && errors.brand}
                    id="brand"
                    label="Brand"
                    disabled={viewMaterialMode}
                  ></FormInput>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <FormInput
                    sx={sxProps.formInputContainer}
                    name="count"
                    value={values.count}
                    error={touched.count && errors.count}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.count && errors.count}
                    id="count"
                    label="Count"
                    type="number"
                    disabled={viewMaterialMode}
                  ></FormInput>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <FormInput
                    sx={sxProps.formInputContainer}
                    name="category"
                    value={values.category}
                    error={touched.category && errors.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.category && errors.category}
                    id="category"
                    label="Category"
                    disabled={viewMaterialMode}
                  ></FormInput>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <FormInput
                    sx={sxProps.formInputContainer}
                    name="description"
                    value={values.description}
                    error={touched.description && errors.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.description && errors.description}
                    id="description"
                    label="Description"
                    disabled={viewMaterialMode}
                  ></FormInput>
                </Grid>
                {materialById.isError ? (
                  <Alert
                    sx={sxProps.fullWdithFormInputContainer}
                    severity="error"
                  >
                    Error while viewing material
                  </Alert>
                ) : null}
                <Grid item xs={12}>
                  <DialogActions>
                    {createMaterialLoading || editMaterialLoading ? (
                      <Loader sx={{ marginRight: "1rem" }} size="2rem"></Loader>
                    ) : null}
                    {viewMaterialMode ? (
                      <Button variant={"contained"} onClick={editHandler}>
                        Edit
                      </Button>
                    ) : (
                      <Button variant={"contained"} onClick={handleSubmit}>
                        Save
                      </Button>
                    )}

                    <Button
                      variant={"contained"}
                      onClick={(e) => closeDialogHandler(e, resetForm)}
                    >
                      Cancel
                    </Button>
                  </DialogActions>
                </Grid>
              </>
            )}
          </Formik>
        </Grid>
      </DialogContent>
      <ImageDialog
        setOpen={setOpenImageDialog}
        open={openImageDialog}
        image={filename}
      ></ImageDialog>
    </Dialog>
  );
};

export default MaterialDialog;
