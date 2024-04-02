import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/index";
import "./styles/index.css";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>
);
