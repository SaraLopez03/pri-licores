import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import App from "./App";
import { AuthorizationProvider } from "./AuthorizationProvider";

ReactDOM.render(
  <React.StrictMode>
    <AuthorizationProvider>
      <App />
    </AuthorizationProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
