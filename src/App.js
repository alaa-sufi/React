import React from "react";
import {BrowserRouter} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

// auth
import LogindRoute from "./component/auth/LogindRoute";
import ProtectedRoute from "./component/auth/ProtectedRoute";

// pages
import AdminLogin from "./component/pages/AdminLogin";
import AdminBusBook from "./component/pages/AdminBusBook";

// nav
import Hnav from "./component/pages/Hnav";

import "./asset/css/rtl.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(0, 173, 238)",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <>
            <LogindRoute path={"/login"}  exact component={AdminLogin} />
            {/* admin  */}
            <ProtectedRoute path={"/admin"}  component={Hnav} />
            <ProtectedRoute path={"/admin/bookBus/:id"}  exact  component={AdminBusBook} />
          </>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
