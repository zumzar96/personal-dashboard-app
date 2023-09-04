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
import { useLoginMutation } from "./authApiSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../config/themes/rootTheme";
import useFcmToken from "../../firebase/messaging";
import { useAddDeviceTokenMutation } from "../users/usersApiSlice";

const Login = (props) => {
  const location = useLocation();
  const initialRegistData = useMemo(() => {
    return {
      email: "",
      password: "",
    };
  }, []);
  const theme = useTheme();
  const user_info = useSelector((state) => state.login.user_info);
  const isLoggedIn = user_info !== null;
  const [
    login,
    { isLoading: loginLoading, isError: loginError, isSuccess: loginSuccess },
  ] = useLoginMutation();
  const { fcmToken } = useFcmToken();
  const [
    addDeviceToken,
    { isLoading: addDeviceTokenLoading, reset: addDeviceTokenMuatation },
  ] = useAddDeviceTokenMutation();

  const [registData, setRegistData] = useState(initialRegistData);
  const colorMode = useContext(ColorModeContext);

  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .max(50, "Password is too Long!")
      .required("Password is required")
      .matches(
        passRegex,
        "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginFormHandler = (em, pswd) => {
    login({ email: em, password: pswd });
  };

  useEffect(() => {
    if (loginError) {
      toast.error("User data not correct");
    }
  }, [loginError]);

  useEffect(() => {
    if (loginSuccess) {
      addDeviceToken({ deviceToken: fcmToken, userId: user_info.id });
    }
  }, [loginSuccess]);

  return (
    <Fragment>
      {loginSuccess || isLoggedIn ? (
        <Navigate to="/dashboard" replace={true} />
      ) : (
        <Grid spacing={theme.spacing(1)} container sx={sxProps.authContainer}>
          <Grid item md={6} lg={6} xl={6} sx={sxProps.svgWrapper}>
            <Box sx={sxProps.svgLayout}>
              <img style={sxProps.svg} src={svgBackground} />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
            sx={sxProps.authFormWrapper}
          >
            <Formik
              initialValues={registData}
              validationSchema={SignupSchema}
              onSubmit={(values, { setSubmitting }) => {
                loginFormHandler(values.email, values.password);
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
              }) =>
                loginLoading ? (
                  <Loader />
                ) : (
                  <Box sx={sxProps.authForm}>
                    <Typography variant="h4">Sign in</Typography>
                    <TextField
                      name="email"
                      type="email"
                      placeholder="Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      error={errors.email}
                      helperText={errors.email}
                    />

                    {loginError && (
                      <Alert severity="error">User data is not correct!</Alert>
                    )}
                    <TextField
                      name="password"
                      type={showPassword ? "text" : "password"}
                      id="outlined-adornment-password"
                      placeholder="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      error={errors.password}
                      helperText={errors.password}
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
                    {loginError && (
                      <Alert severity="error">User data is not correct!</Alert>
                    )}
                    {location.state?.verifyEmailMsg ? (
                      <Alert severity="info">
                        {location.state.verifyEmailMsg}
                      </Alert>
                    ) : null}
                    <Link href="register" sx={sxProps.linkColor}>
                      <Typography variant="h5">Sign up</Typography>
                    </Link>
                    <Link href="forgot-password" sx={sxProps.linkColor}>
                      <Typography variant="h5">Forgot password?</Typography>
                    </Link>
                    <Button
                      variant="contained"
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                    >
                      Login
                    </Button>
                  </Box>
                )
              }
            </Formik>
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

export default Login;
