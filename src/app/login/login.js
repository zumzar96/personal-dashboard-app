import React, { Fragment } from "react";
import { useState, useMemo, useEffect } from "react";
import { render } from "react-dom";
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
import * as sxProps from './styles/styles.ts'
import { Formik, Form, Field } from "formik";
import {
  Autocomplete,
  TextField,
  Select,
  Switch,
  ToggleButtonGroup,
} from "formik-mui";
import * as Yup from "yup";
import * as actions from "./actions";
// import { useSelector, useDispatch } from "react-redux";
import { usersApi } from "./loginApi";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Login = (props) => {
  const initialRegistData = useMemo(() => {
    return {
      email: "",
      password: "",
    };
  }, []);
  const token = useSelector((state) => state.login.token);
  const isLoggedIn = token !== null
  const [
    setLogin,
    { isLoading: loginLoading, isError: loginError, isSuccess: loginSuccess },
  ] = usersApi.useSetLoginMutation();
  const [registData, setRegistData] = useState(initialRegistData);

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

  const login = (em, pswd) => {
    setLogin({ email: em, password: pswd });
  };

  

  return (
    <Fragment>
      {loginSuccess || isLoggedIn ? (
        <Navigate to="/dashboard" replace={true} />
      ) : null}
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
            login(values.email, values.password);
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
          }) => (
            <Form>
              
                <Box sx={sxProps.loginFormLayout}>
                {loginLoading ? (
                <Loader />
              ) : (<>
                  <Typography variant="h4">Sign in</Typography>
                  <Typography sx={sxProps.typograhyColor}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla porttitor metus leo, ut ullamcorper diam aliquam quis.
                    Ut accumsan lorem ligula, aliquet placerat ipsum laoreet id
                  </Typography>
                  <Field
                    component={TextField}
                    name="email"
                    type="email"
                    label="Email"
                  />
                  {loginError && (
                    <Alert severity="error">User data is not correct!</Alert>
                  )}
                  <Field
                    component={TextField}
                    name="password"
                    type="password"
                    label="Password"
                  ></Field>
                  {loginError && (
                    <Alert severity="error">User data is not correct!</Alert>
                  )}
                  <Checkbox sx={sxProps.checkBoxColor}></Checkbox>
                  <Link sx={sxProps.linkColor}>Forgot password?</Link>
                  <Button
                    variant="contained"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Login
                  </Button>
                  </>
                   )}
                </Box>
             
            </Form>
          )}
        </Formik>
      </Grid>
    </Fragment>
  );
};

export default Login;
