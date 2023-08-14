import React, { Fragment } from "react";
import { useState, useMemo, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "../root/components/common/button";
import { Grid } from "@mui/material";
import Alert from "../root/components/common/alert";
import Input from "../root/components/common/input";
import Loader from "../root/components/common/loader";
import svgBackground from "../../assets/svg/undraw_remotely_2j6y.svg";
import Typography from "@mui/material/Typography";
import * as sxProps from "./styles/styles.ts";
import { Formik, Form, Field } from "formik";
// import { TextField } from "formik-mui";
import * as Yup from "yup";
import {
  useResetPassMutation,
} from "./authApiSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Link from "../root/components/common/link";
import { useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import ErrorBoundary from "../root/components/common/errorBoundary";

const ResPaassVerified = (props) => {
  let location = useLocation();
  const params1 = new URLSearchParams(location.search)
  const token = params1.get('p')


  const initialRegistData = useMemo(() => {
    return {
      pass: "",
    };
  }, []);
  const user_info = useSelector((state) => state.login.user_info);
  const isLoggedIn = user_info !== null;
  const theme = useTheme();

  const [
    resetPass,
    {
      isLoading: resetPassLoading,
      isError: resetPassError,
      isSuccess: resetPassSuccess,
    },
  ] = useResetPassMutation();

  const [registData, setRegistData] = useState(initialRegistData);
  const navigate = useNavigate();
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const SignupSchema = Yup.object().shape({
    // email: Yup.string()
    //   .email("Invalid email")
    //   .required("Email is required"),
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

  const resetPasswordFormHandler = async (pass) => {
    const resetPassMsg = await resetPass({
      password: pass,
      token: token,
    });
    try {
      toast.info(`${resetPassMsg.data.message}`);
       navigate("/", {
        state: {
          verifyEmailMsg: resetPassMsg.data.message,
        },
      });
    } catch (error) {
      console.log(error);
      toast.error(`${error}`);
    }
  };

  useEffect(() => {
    //TODO handle token check for error boundary
    if (token) {
      resetPass({ token: token, password: "" });
    }
  }, [token]);

  return (
    <Fragment>
      {isLoggedIn ? (
        <Navigate to="/dashboard" replace={true} />
      ) : resetPassLoading ? (
        <Loader />
      ) : resetPassSuccess ? (
        <Grid sx={sxProps.authContainer} spacing={theme.spacing(1)} container>
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
              onSubmit={(values, { setSubmitting, resetForm }) => {
                resetPasswordFormHandler(values.password, token);

                setSubmitting(false);
                resetForm();
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
                <Box sx={sxProps.authForm}>
                  <>
                    <Typography variant="h4">Forgot password</Typography>
                    {resetPassSuccess ? (
                      <>
                        <Alert severity="info">
                          Email verified successfully, now you can change your password!
                        </Alert>
                      </>
                    ) : (
                      <>
                        <Alert severity="error">Password change error</Alert>
                      </>
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
                    {resetPassError && (
                      <Alert severity="error">User data is not correct!</Alert>
                    )}

                    <TextField
                      name="confirmpassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmpassword}
                      error={touched.confirmpassword && errors.confirmpassword}
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
                    {resetPassError && (
                      <Alert severity="error">User data is not correct!</Alert>
                    )}

                    <Link href="register" sx={sxProps.linkColor}>
                      <Typography variant="h5">Sign up</Typography>
                    </Link>
                    <Link href="/" sx={sxProps.linkColor}>
                      <Typography variant="h5">Login</Typography>
                    </Link>

                    <Button
                      variant="contained"
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                    >
                      Reset password
                    </Button>
                  </>
                </Box>
              )}
            </Formik>
          </Grid>
        </Grid>
      ) : (
        <ErrorBoundary />
      )}
    </Fragment>
  );
};

export default ResPaassVerified;
