import logo from "./logo.svg";
import "./App.css";
import Login from "./app/login/login";
import { ThemeProviderProps } from "@mui/material/styles/ThemeProvider";
import { ThemeProvider } from "@emotion/react";
import rootTheme from "./config/themes/rootTheme";
import { Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import appDrawerBar from "./app/root/components/common/appDrawerBar";
import Typography from "../src/app/root/components/common/typography";
import Materials from "../src/app/materials/materials";
import Register from "./app/login/register";
import Dashboard from "./app/root/dashboard";
import ErrorBoundary from "./app/root/components/common/errorBoundary";
import ForgotPassword from "./app/login/forgotPassword";

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={rootTheme}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<ErrorBoundary />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
