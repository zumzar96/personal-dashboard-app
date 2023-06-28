import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
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
import { toast } from "react-toastify";

const MaterialDialog = ({
  open,
  setOpen,
  viewMaterialMode,
  setViewMaterialMode,
  materialById,
}) => {
  const initialRegistData = useMemo(() => {
    return {
      name: "",
      price: 0,
      image: "",
      brand: "",
      countInStock: 0,
      category: "",
      description: "",
    };
  }, []);
  const [registData, setRegistData] = useState(initialRegistData);
  const [filename, setFilename] = useState("");
  const [editMaterialMode, setEditMaterialMode] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [
    createMaterial,
    {
      isLoading: createMaterialLoading,
      isError: createMaterialError,
      isSuccess: createMaterialSuccess,
      reset: materialCreateResetMuatation,
    },
  ] = useCreateMaterialMutation();
  const [
    editMaterial,
    {
      isLoading: editMaterialLoading,
      isError: editMaterialError,
      isSuccess: editMaterialSuccess,
      reset: materialEditResetMuatation,
    },
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
    countInStock: Yup.number().max(20).required("Field is required"),
    brand: Yup.string().max(20).required("Field is required"),
    image: Yup.string().required("Field is required"),
    description: Yup.string().max(50).required("Field is required"),
  });

  const fileUploadHandler = async (e, setFieldValue) => {
    //TODO refactor
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
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
      setOpen(false);
    } else {
      createMaterial(params);
      // materialCreateResetMuatation();
      setOpen(false);
    }
    setEditMaterialMode(false);
    setViewMaterialMode(false);
    setRegistData(initialRegistData);
    setFilename(initialRegistData.image);
  };

  const removeFileHandler = (data, setFieldValue) => {
    setFilename(initialRegistData.image);
    setFieldValue("image", initialRegistData.image);
  };

  const editHandler = () => {
    setViewMaterialMode(false);
    setEditMaterialMode(true);
  };

  const closeDialogHandler = () => {
    setOpen(false);
    // resetForm();TODO implement reset form function
    setFilename(initialRegistData.image);
    // materialCreateResetMuatation();
    setRegistData(initialRegistData); //TODO adjust mutation reset
    // dispatch(rootApiSlice.util.resetApiState());TODO adjust mutatuon cache flow
    setEditMaterialMode(false);
  };

  const openImageDialogHandler = () => {
    setOpenImageDialog(open);
  };

  //For testing purposes
  useEffect(() => {
    if (createMaterialSuccess) {
      toast.success("Created successfuly");
    }
  }, [createMaterialSuccess]);

  useEffect(() => {
    if (editMaterialSuccess) {
      toast.success("Edited successfuly");
    }
  }, [editMaterialSuccess]);

  useEffect(() => {
    if (createMaterialError) {
      toast.error("Error create");
    }
  }, [createMaterialError]);

  useEffect(() => {
    if (editMaterialError) {
      toast.error("Error edit");
    }
  }, [editMaterialError]);

  useEffect(() => {
    //TODO setting initial state
    if (materialById.data) {
      if (editMaterialMode || viewMaterialMode) {
        setRegistData((registData) => ({
          ...registData,
          id: materialById.data._id,
          name: materialById.data.name,
          price: materialById.data.price,
          image: materialById.data.image,
          brand: materialById.data.brand,
          countInStock: materialById.data.countInStock,
          category: materialById.data.category,
          description: materialById.data?.description,
        }));
        setFilename(materialById.data.image);
      }
    }
  }, [materialById]);

  return (
    <Dialog
      sx={sxProps.dialogMainContainer}
      open={open}
      onClose={closeDialogHandler}
    >
      <DialogTitle sx={sxProps.dialogTitleContainer}>
        {editMaterialMode ? "Edit" : viewMaterialMode ? "View" : "Crete"}
      </DialogTitle>
      <DialogContent>
        <Box sx={sxProps.dialogContainer}>
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
              <Form>
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
                <FormInput
                  sx={sxProps.fullWdithFormInputContainer}
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
                              onClick={(e) =>
                                removeFileHandler(e, setFieldValue)
                              }
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
                              marginTop: filename === "" ? "0rem" : "5rem",
                              bgcolor:
                                touched.image && errors.image
                                  ? "red"
                                  : "#85818b",
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
                <FormInput
                  sx={sxProps.formInputContainer}
                  name="countInStock"
                  value={values.countInStock}
                  error={touched.countInStock && errors.countInStock}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.countInStock && errors.countInStock}
                  id="countInStock"
                  label="Count"
                  type="number"
                  disabled={viewMaterialMode}
                ></FormInput>
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
                <FormInput
                  sx={sxProps.fullWdithFormInputContainer}
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
              </Form>
            )}
          </Formik>
        </Box>
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
