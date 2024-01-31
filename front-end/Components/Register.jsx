'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import '@/Styles/register.css'


const Register = () => {


    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birth, setBirth] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');


    const handleUsername = (event) => {
        setUsername(event.target.value);
    }


    const handlefirstname = (event) => {
        setFirstName(event.target.value);
    }


    const handlelastname = (event) => {
        setLastName(event.target.value);
    }


    const handlebirth = (event) => {
        setBirth(event.target.value);
    }

    const handleemail = (event) => {
        setEmail(event.target.value);
    }

    const handlepass = (event) => {
        setPassword(event.target.value);
    }

    const handleRegistration = () => {
        if(!username || !password || !firstName || !lastName || !birth || !email){
            alert('Please fill everything!');
        }
        else{
            fetch('http://localhost:9876/ntuaflix_api/auth/register', {
                method: 'post',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify({
                    username: username,
                    password: password,
                    birthDate: birth,
                    firstname: firstName,
                    lastname: lastName,
                    email: email
                })
            })
            .then(response => response.json())
            .then(response => console.log(response))

            setUsername("");
            setEmail("");
            setFirstName("");
            setLastName("");
            setPassword("");
            setBirth("");
        }
    }

    return (
        <div className='register-container'>
            <div className='register'>
                <section>
                    <h1>
                        Welcome to Ntuaflix!
                    </h1>
                    <Link className='login-link' href='/signin' >Login</Link>
                </section>
                <main>
                    <div className='register-form'>

                        <h1>
                            Register
                        </h1>
                        <div className='input-field'>
                            <label>Username</label>
                            <input type='text' onChange={handleUsername} value={username}/>
                        </div>
                        
                        <div className='input-field'>
                            <label>First Name</label>
                            <input type='text' onChange={handlefirstname} value={firstName}/>
                        </div>

                        <div className='input-field'>
                            <label>Last Name</label>
                            <input type='text' onChange={handlelastname} value={lastName}/>
                        </div>

                        <div className='input-field'>
                            <label>Date Of Birth</label>
                            <input type='date' onChange={handlebirth} value={birth}/>
                        </div>
                        <div className='input-field'>
                            <label>email</label>
                            <input type='email' onChange={handleemail} value={email}/>
                        </div>
                        <div className='input-field'>
                            <label>Password</label>
                            <input type='password' onChange={handlepass} value={password}/>
                        </div>
                        
                        <button onClick={handleRegistration}>Register</button>

                    </div>
                </main>
            </div>
        </div>
    )
}

export default Register