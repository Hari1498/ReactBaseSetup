import React from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyForm from "./components/Form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AppProvider } from "./contexts/AppContext";

const theme = createTheme({
  palette: {
    primary: { main: "#007BFF" },
    secondary: { main: "#6C757D" },
  },
});

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MyForm />} />
          </Routes>
        </Router>
      </AppProvider>
    </LocalizationProvider>
  </ThemeProvider>
);

export default App;
