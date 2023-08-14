import React, { useEffect } from "react";
import Link from "@mui/material/Link";
import Alert from "../root/components/common/alert";
import { Grid, Box } from "@mui/material";
import Button from "../root/components/common/button";
import * as sxProps from "./styles/styles.ts";
import { useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useVerifyEmailRegisterMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "../root/components/common/errorBoundary";
import Loader from "../root/components/common/loader";

const Verified = ({}) => {
  let location = useLocation();
  const params1 = new URLSearchParams(location.search)
  const token = params1.get('r')
  const theme = useTheme();
  const navigate = useNavigate();

  const [
    verifyEmail,
    {
      isLoading: verifyEmailLoading,
      isError: verifyEmailError,
      isSuccess: verifyEmailSuccess,
    },
  ] = useVerifyEmailRegisterMutation();

  useEffect(() => {
    if (token) {
      verifyEmail({ token: token });
    }
  }, [token]);

  return (
    <Grid spacing={theme.spacing(1)} container sx={sxProps.authContainer}>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        sx={sxProps.authFormWrapper}
      >
        {verifyEmailLoading ? (
          <Loader />
        ) : (
          <Box sx={sxProps.authForm}>
            {verifyEmailSuccess ? (
              <>
                <Alert severity="info">
                  Email for registration verified successfully!
                </Alert>
                <Box>
                  <Button variant="contained" onClick={() => navigate("/")}>
                    Login
                  </Button>
                </Box>
              </>
            ) : (
              <ErrorBoundary />
            )}
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default Verified;
