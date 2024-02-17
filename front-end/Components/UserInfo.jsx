'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import '@/Styles/userinfo.css'


const UserInfo = ({data, fetchFinal}) => {

  const [overlay, setOverlay] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPass, setNewPass] = useState('');

  const changeUserInfo = () => {
    console.log('fwin');
    setNewPass('');
    setNewUsername('');
    setOverlay(true);
  }

  const submitUserInfo = () => {

    fetch('https://localhost:9876/ntuaflix_api/user/updateProfile', {
      method: 'put',
      headers : {
        'Content-type':'application/json',
        'X-OBSERVATORY-AUTH' : sessionStorage.getItem('token')
      },
      body : JSON.stringify({
        username : newUsername,
        password : newPass
      })
    })
    .then(response => {
      if(response.status === 500){
        throw new Error('Server error');
      }
      else if(response.status === 400){
        throw new Error('Username already in use');
      }
      else if(response.status ===201){
        return {none: 'none'}
      }
      else throw new Error('Something went wrong')
    })
    .then(response => {
      alert('Profile username/password updated successfully');
      setNewPass('');
      setNewUsername('');
      fetchFinal();
      setOverlay(false);
    })
    .catch((error) => {
      alert(error);
      setNewPass('');
      setNewUsername('');
    })
  }



  const changePass = (event) => {
    setNewPass(event.target.value);
  }

  const changeName = (event) => {
    setNewUsername(event.target.value);
  }



  return (
    <>
        <section className='user-info-container'>
            {overlay
            ? <div className='new-info'>
                <label>New username:</label>
                <input  type='text' onChange={changeName} value={newUsername}/>
                <label>New password:</label>
                <input type='text' onChange={changePass} value={newPass}/>
                <button onClick={submitUserInfo}>Submit</button>
                <button onClick={() => setOverlay(false)}>Cancel</button>
              </div>

            : <div className='user-info'>
                <h1>Profile info:</h1>
                <p>Username: {data.username}</p>
                <p>First name: {data.firstname}</p>
                <p>Last name: {data.lastname}</p>
                <p>Birthdate: {data.birthDate}</p>
                <p>email: {data.email}</p>
                <button onClick={changeUserInfo}>Change Username/Password</button>
              </div>
            }
            
            <aside>
                <Image className='profile-pic' alt='pfp pic' src='/profile-pic.png' width={400} height={400}/>
            </aside>
        </section>
    </>
  
  )
}

export default UserInfo