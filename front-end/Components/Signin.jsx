import React from 'react'
import '@/Styles/signin.css'

const Signin = () => {
  return (
    <div className='signin-bg'>
      <div className='signin-container'>
        <h1>
            Sign In
        </h1>
        <div className='input-field'>
            <label>Username</label>
            <input type='text'/>
        </div>
        
        <div className='input-field'>
            <label>Password</label>
            <input type='password'/>
        </div>
        
        <button>Sign In</button>
      </div>    
    </div>
  )
}

export default Signin