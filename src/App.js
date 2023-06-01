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
import Dashboard from "./app/dashboard/dashboard";
import Root from "./app/root/root";
import Typography from "../src/app/root/components/common/typography";

function App() {
  function ErrorBoundary() {
    
    return <Typography variant="h3" color={'grey'}>Error 404 Page not found</Typography>;
  }
  return (
    <Grid container>
      <CssBaseline />
      <ThemeProvider theme={rootTheme}>
        <Root>
          <Routes>
            <Route
              path="/"
              element={<Login />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<ErrorBoundary />} />
          </Routes>
        </Root>
      </ThemeProvider>
    </Grid>
  );
}

export default App;
