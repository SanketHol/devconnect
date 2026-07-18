import { createContext, useContext, useState } from "react";
import {
    isAuthenticated,
    removeToken,
} from "../lib/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [loggedIn, setLoggedIn] = useState(
        isAuthenticated()
    );

    const login = () => {

        setLoggedIn(true);

    };

    const logout = () => {

        removeToken();

        setLoggedIn(false);

    };

    return (

        <AuthContext.Provider
            value={{
                loggedIn,
                login,
                logout,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}