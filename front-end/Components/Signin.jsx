'use client'

import React, { useState } from 'react'
import '@/Styles/signin.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from './Context'
// const AuthContext = createContext(null);

// export const AuthProvider = ({children}) => {
    
//     const [loginStatus, setLoginStatus] = useState(false);
//     return (
//         <AuthContext.Provider value={{loginStatus, setLoginStatus}}>
//           {children}
//         </AuthContext.Provider>
//     )
// }

// export const useAuth = () => useContext(AuthContext);

const Signin = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const {loginStatus, setLoginStatus} = useAuth();

  const handleUsername = (event) =>{
    setUsername(event.target.value);
  }

  const handlePassword = (event) =>{
    setPassword(event.target.value);
  }

  const handleSignin = () =>{
    if(localStorage.getItem('token') !== null){
      setUsername('');
      setPassword('');
      router.push('/');
    }
    else{
      fetch('http://localhost:9876/ntuaflix_api/auth/login', {
        method: 'post',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify({
            username: username,
            password: password
        })
      })
      .then(response => response.status === 500 ? alert('Server error')
        : (response.status === 401 ? alert('Invalid username/password') : 
          response.json()
        )
      )
      .then(response => {
        if(response){
          setLoginStatus(true);
          localStorage.setItem("token", response.token);
          setUsername('');
          setPassword('');
          router.push('/');
        }
        else{
          setUsername('');
          setPassword('');
        }
    })

    }
  }

  return (
    <div className='signin-bg'>
      <div className='signin-container'>
        <h1>
            Sign In
        </h1>
        <div className='input-field'>
            <label>Username</label>
            <input type='text' value={username} onChange={handleUsername}/>
        </div>
        
        <div className='input-field'>
            <label>Password</label>
            <input type='password' value={password} onChange={handlePassword}/>
        </div>
        
        <button onClick={handleSignin}>Sign In</button>
        <div className='register-box'>
          <span>Don't have an account? Create one now!</span>
          <Link href='/register' className='register-link'>Register</Link>
        </div>
      </div>    
    </div>
  )
}

export default Signin