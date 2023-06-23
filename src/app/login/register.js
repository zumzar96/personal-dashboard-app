import React, { Fragment } from "react";
import { useState, useMemo, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "../root/components/common/button";
import { Grid } from "@mui/material";
import Link from "../root/components/common/link";
import Alert from "../root/components/common/alert";
import Input from "../root/components/common/input";
import Loader from "../root/components/common/loader";
import Checkbox from "../root/components/common/checkbox";
import svgBackground from "../../assets/svg/undraw_remotely_2j6y.svg";
import Typography from "@mui/material/Typography";
import * as sxProps from "./styles/styles.ts";
import { Formik, Form, Field } from "formik";
// import { TextField } from "formik-mui";
import * as Yup from "yup";
import { useRegisterMutation } from "./authApiSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const initialRegistData = useMemo(() => {
    return {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    };
  }, []);
  const user_info = useSelector((state) => state.login.user_info);
  const isLoggedIn = user_info !== null;
  const [
    register,
    {
      isLoading: registerLoading,
      isError: registerError,
      isSuccess: registerSuccess,
    },
  ] = useRegisterMutation();

  const [registData, setRegistData] = useState(initialRegistData);
  const navigate = useNavigate();
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const SignupSchema = Yup.object().shape({
    name: Yup.string().max(20).required("Field is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .max(50, "Password is too Long!")
      .required("Password is required")
      .matches(
        passRegex,
        "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    confirmpassword: Yup.string()
      .required("Field is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginFormHandler = async (name, em, pswd) => {
    const verifyEmailMsg = await register({
      name: name,
      email: em,
      password: pswd,
    });
    try {
      navigate("/", {
        state: {
          verifyEmailMsg: verifyEmailMsg.data.message,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {isLoggedIn ? <Navigate to="/dashboard" replace={true} /> : null}
      <Grid container>
        <Grid item xs={4} sm={4} md={6} lg={6} xl={6}>
          <Box sx={sxProps.svgLayout}>
            <img src={svgBackground} />
          </Box>
        </Grid>
        <Grid item xs={4} sm={4} md={6} lg={6} xl={6}>
          <Formik
            initialValues={registData}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              loginFormHandler(values.name, values.email, values.password);
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
            }) => (
              <Form>
                <Box sx={sxProps.loginFormLayout}>
                  {registerLoading ? (
                    <Loader />
                  ) : (
                    <>
                      <Typography variant="h4">Sign up</Typography>
                      <Typography sx={sxProps.typograhyColor}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nulla porttitor metus leo, ut ullamcorper diam aliquam
                        quis. Ut accumsan lorem ligula, aliquet placerat ipsum
                        laoreet id
                      </Typography>
                      <TextField
                        name="name"
                        type="text"
                        placeholder="Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        error={touched.name && errors.name}
                        helperText={touched.name && errors.name}
                      />
                      <TextField
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        error={touched.email && errors.email}
                        helperText={touched.email && errors.email}
                      />

                      {registerError && (
                        <Alert severity="error">
                          User data is not correct!
                        </Alert>
                      )}
                      <TextField
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        error={touched.password && errors.password}
                        helperText={touched.password && errors.password}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      ></TextField>
                      {registerError && (
                        <Alert severity="error">
                          User data is not correct!
                        </Alert>
                      )}
                      <TextField
                        name="confirmpassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmpassword}
                        error={
                          touched.confirmpassword && errors.confirmpassword
                        }
                        helperText={
                          touched.confirmpassword && errors.confirmpassword
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      ></TextField>
                      {registerError && (
                        <Alert severity="error">
                          User data is not correct!
                        </Alert>
                      )}
                      <Button
                        variant="contained"
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                      >
                        Register
                      </Button>
                    </>
                  )}
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Register;
