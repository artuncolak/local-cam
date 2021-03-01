import "./styles/style.scss";

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import WebcamContextProvider from "./WebcamContextProvider";

ReactDOM.render(
  <WebcamContextProvider>
    <App />
  </WebcamContextProvider>,
  document.getElementById("root")
);
