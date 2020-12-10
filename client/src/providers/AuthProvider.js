import React, { useState, useEffect, createContext } from "react";
import jwtDecode from "jwt-decode";
import {
    getAccessTokenApi,
    getRefreshTokenApi,
    refreshAccessTokenApi,
    logout
} from "../api/auth";

export const AuthContext = createContext();

export default function AuthProvider(props){
    const { children } = props;
    const [ user, setUser ] = useState({
        user: null,
        isLoading: true
    });

    useEffect(() => {
        checkUserLogin(setUser);
    },[])

return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

function checkUserLogin(setUser){
    
    const accessToken = getAccessTokenApi();

    if(!accessToken){
        const refresToken = getRefreshTokenApi();

        if(!refresToken){
            logout();
            setUser({
                user: null,
                isLoading: false
            });
        }else {
            refreshAccessTokenApi(refresToken);
        }
    }else{
        setUser({
            isLoading: false,
            user: jwtDecode(accessToken)
        });
    }
}