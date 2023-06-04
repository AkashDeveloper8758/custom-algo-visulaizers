import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import {  RouterProvider } from "react-router-dom";
import { mainRouter } from "./routes";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={mainRouter}></RouterProvider>
  </React.StrictMode>
);
