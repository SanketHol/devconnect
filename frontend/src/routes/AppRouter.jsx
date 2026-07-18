import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "../pages/feed/Home";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import ProtectedRoute from "./ProtectedRoute";



function AppRouter() {

    return (

        <Routes>

            <Route element={<AuthLayout />}>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

            </Route>

            <Route element={<MainLayout />}>

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>

                            <Home />

                        </ProtectedRoute>
                    }
                />

            </Route>

        </Routes>

    );

}

export default AppRouter;