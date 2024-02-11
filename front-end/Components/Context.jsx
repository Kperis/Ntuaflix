'use client'

import React, { useEffect } from 'react'
import { useContext, createContext, useState } from 'react'
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    
    const [loginStatus, setLoginStatus] = useState(false);
    const router = useRouter();


    useEffect(() => {
      const item = localStorage.getItem('token');
      if(!item){
          setLoginStatus(false);
          router.push('/signin');
      }
      else{
          setLoginStatus(true);
      }    }, [])
    
    return (
        <AuthContext.Provider value={{loginStatus, setLoginStatus}}>
          {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {return useContext(AuthContext);}
