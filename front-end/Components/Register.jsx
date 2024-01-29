import React from 'react'
import '@/Styles/register.css'


const Register = () => {
  return (
    <div className='register-container'>
        <div className='register'>
            <section>
                <h1>
                    Welcome to Ntuaflix!
                </h1>
            </section>
            <main>
                <div className='register-form'>

                    <h1>
                        Register
                    </h1>
                    <div className='input-field'>
                        <label>Username</label>
                        <input type='text'/>
                    </div>
                    
                    <div className='input-field'>
                        <label>Password</label>
                        <input type='password'/>
                    </div>
                    
                    <button>Register</button>

                </div>
            </main>
        </div>
    </div>
  )
}

export default Register