'use client'

import React from 'react'
import { useContext, createContext, useState } from 'react'

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    
    const [loginStatus, setLoginStatus] = useState(false);
    
    return (
        <AuthContext.Provider value={{loginStatus, setLoginStatus}}>
          {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {return useContext(AuthContext);}
