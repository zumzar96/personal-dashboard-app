import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
// import InputLabel from "@mui/material/InputLabel";
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
} from "../materialsApiSlice";
import { useSelector } from "react-redux";
import Loader from "../../root/components/common/loader";
import Alert from "../../root/components/common/alert";

const MaterialDialog = ({ open, setOpen }) => {
  const user_info = useSelector((state) => state.login.user_info);
  const initialRegistData = useMemo(() => {
    return {
      token: user_info.token,
      name: "",
      price: "",
      image: "",
      brand: "",
      count: "",
      category: "",
      description: "",
    };
  }, []);
  const [registData, setRegistData] = useState(initialRegistData);
  const [filename, setFilename] = useState("");
  const [
    createMaterial,
    {
      isLoading: createMaterialLoading,
      isError: createMaterialError,
      isSuccess: createMaterialSuccess,
      reset: materialResetMuatation,
    },
  ] = useCreateMaterialMutation();
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

  const fileUploadHandler = async (e, setFieldValue) => {//TODO refactor 
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadMaterialImage(formData).unwrap();
      setFilename(file.name);
      setFieldValue("image", res.imagePath);
    } catch (err) {
      console.log("error", err);
    }
  };

  const createProductHandler = (params) => {
    createMaterial(params);
  };

  const removeFileHandler = (data, setFieldValue) => {
    setFilename(initialRegistData.image);
    setFieldValue("image", initialRegistData.image);
  };
  const closeDialogHandler = (data, resetForm, resetMutation) => {
    setOpen(false);
    resetForm();
    setFilename(initialRegistData.image);
    resetMutation(); //TODO adjust mutation reset
    // dispatch(rootApiSlice.util.resetApiState());TODO adjust mutatuon cache flow
  };

  useEffect(() => {
    if (createMaterialSuccess) {
      setOpen(false);
      setFilename(initialRegistData.image);
    }
  }, [createMaterialLoading]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={sxProps.dialogTitleContainer}>Create</DialogTitle>
      <DialogContent>
        <Box sx={sxProps.dialogContainer}>
          <Formik
            initialValues={registData}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              createProductHandler(values);
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
                ></FormInput>
                <FormInput
                  sx={sxProps.fullWdithFormInputContainer}
                  name="image"
                  // value={}
                  error={touched.image && errors.image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.image && errors.image}
                  id="image"
                  label="Image"
                  InputProps={{
                    readOnly: true,
                    startAdornment:
                      !materialImageLoading && filename ? (
                        <InputAdornment position="start">
                          {filename}
                          <IconButton
                            onClick={(e) => removeFileHandler(e, setFieldValue)}
                            sx={{ marginTop: "0.3rem" }}
                            aria-label="delete"
                          >
                            <CancelTwoToneIcon />
                          </IconButton>
                        </InputAdornment>
                      ) : null,
                    endAdornment: (
                      <>
                        {materialImageLoading ? (
                          <InputAdornment position="start">
                            <Loader size="1.3rem"></Loader>
                          </InputAdornment>
                        ) : null}
                        <InputAdornment
                          sx={sxProps.uploadButtonContainer}
                          position="end"
                        >
                          <Button
                            sx={{
                              bgcolor:
                                touched.image && errors.image
                                  ? "red"
                                  : "#85818b",
                            }}
                            variant="contained"
                            component="label"
                          >
                            Upload File
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
                ></FormInput>
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
                ></FormInput>
                {createMaterialError ? (
                  <Alert
                    sx={sxProps.fullWdithFormInputContainer}
                    severity="error"
                  >
                    Create material error
                  </Alert>
                ) : null}
                <DialogActions>
                  {createMaterialLoading ? (
                    <Loader sx={{ marginRight: "1rem" }} size="2rem"></Loader>
                  ) : null}
                  <Button variant={"contained"} onClick={handleSubmit}>
                    Save
                  </Button>
                  <Button
                    variant={"contained"}
                    onClick={(e) =>
                      closeDialogHandler(e, resetForm, materialResetMuatation)
                    }
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MaterialDialog;
