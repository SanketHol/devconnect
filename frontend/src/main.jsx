import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

import App from "./App";
import "./index.css";

import queryClient from "./lib/queryClient";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <AuthProvider>

          <BrowserRouter>

              <QueryClientProvider client={queryClient}>

                  <App />

                  <Toaster position="top-right" />

              </QueryClientProvider>

          </BrowserRouter>

      </AuthProvider>
  </React.StrictMode>
);