import React from "react";
import ReactDOM from "react-dom";
import App from "../src/App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { AuthContextProvider } from "./context/authContext";
ReactDOM.render(
    <DarkModeContextProvider>
     <AuthContextProvider>
      <App />
     </AuthContextProvider>
    </DarkModeContextProvider>
,
document.getElementById("root"));
