import logo from "./logo.svg";
import "./App.css";
import Login from "./app/auth/login";
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
import Register from "./app/auth/register";
import Dashboard from "./app/root/dashboard";
import ErrorBoundary from "./app/root/components/common/errorBoundary";
import ForgotPassword from "./app/auth/forgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorModeContext, useMode } from "./config/themes/rootTheme";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <ToastContainer autoClose={2000} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<ErrorBoundary />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
