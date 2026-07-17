import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";

import { QueryClientProvider } from "@tanstack/react-query";

import queryClient from "./lib/queryClient";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(

    <React.StrictMode>

        <QueryClientProvider client={queryClient}>

            <App />

            <Toaster
                position="top-right"
            />

        </QueryClientProvider>

    </React.StrictMode>

);