import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/index";
import "./styles/index.css";
import { Toaster } from "@/components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster />
  </>
);
