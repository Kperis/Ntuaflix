'use client'

import React, { useState } from 'react'
import '@/Styles/signin.css'
import Link from 'next/link'

const Signin = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = (event) =>{
    setUsername(event.target.value);
  }

  const handlePassword = (event) =>{
    setPassword(event.target.value);
  }

  const handleSignin = () =>{

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
        
        <button>Sign In</button>
        <div className='register-box'>
          <span>Don't have an account? Create one now!</span>
          <Link href='/register' className='register-link'>Register</Link>
        </div>
      </div>    
    </div>
  )
}

export default Signin