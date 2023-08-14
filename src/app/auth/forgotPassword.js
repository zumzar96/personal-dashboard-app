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
  useEmailForgotPassMutation,
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

const Register = (props) => {
  let location = useLocation();

  const initialRegistData = useMemo(() => {
    return {
      email: "",
    };
  }, []);
  const user_info = useSelector((state) => state.login.user_info);
  const isLoggedIn = user_info !== null;
  const theme = useTheme();
  const [
    sentEmailForgotenPass,
    {
      isLoading: sentEmailForgotenPassLoading,
      isError: sentEmailForgotenPassError,
      isSuccess: sentEmailForgotenPassSuccess,
    },
  ] = useEmailForgotPassMutation();

  const [registData, setRegistData] = useState(initialRegistData);

  const SignupSchema = 
     Yup.object().shape({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
      });


  const sentEmailForgotenPassHandler = async (em) => {
    const verifyEmailMsg = await sentEmailForgotenPass({
      email: em,
    });
    try {
      // navigate("/", {
      //   state: {
      //     verifyEmailMsg: verifyEmailMsg.data.message,
      //   },
      // });
      toast.info(`${verifyEmailMsg.data.message}`);
    } catch (error) {
      console.log(error);
      toast.error(`${error}`);
    }
  };


  return (
    <Fragment>
      {isLoggedIn ? (
        <Navigate to="/dashboard" replace={true} />
      ) : (
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
              onSubmit={(values, { setSubmitting }) => {
                sentEmailForgotenPassHandler(values.email);
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
                <Box sx={sxProps.authForm}>
                  {sentEmailForgotenPassLoading ? (
                    <Loader />
                  ) : (
                    <>
                      <Typography variant="h4">Forgot password</Typography>

                      <>
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
                        {(sentEmailForgotenPassError) && (
                          <Alert severity="error">
                            User data is not correct!
                          </Alert>
                        )}
                      </>

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
                        Send email
                      </Button>
                    </>
                  )}
                </Box>
              )}
            </Formik>
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

export default Register;
