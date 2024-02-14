'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import '@/Styles/register.css'


const Register = () => {


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birth, setBirth] = useState('');
    const [email, setEmail] = useState('');


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


    const handleRegistration = () => {
        if(!firstName || !lastName || !birth || !email){
            alert('Please fill everything!');
        }
        else{
            fetch('http://localhost:9876/ntuaflix_api/user/createProfile', {
                method: 'put',
                headers: {
                    'Content-type':'application/json',
                    'X-OBSERVATORY-AUTH' : localStorage.getItem('token')
                },  
                body: JSON.stringify({
                    birthDate: birth,
                    firstname: firstName,
                    lastname: lastName,
                    email: email
                })
            })
            .then(response => {
                if(response.status === 500){
                    throw new Error('Server error');
                }
                return response.json();
            })
            .then(response => {
                alert(response.message);
                
            })
            .catch((error) => alert(error))

            
            setEmail("");
            setFirstName("");
            setLastName("");
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
                </section>
                <main>
                    <div className='register-form'>

                        <h1>
                            Tell us about you!
                        </h1>
        
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
                        
                        <button onClick={handleRegistration}>Submit</button>

                    </div>
                </main>
            </div>
        </div>
    )
}

export default Register