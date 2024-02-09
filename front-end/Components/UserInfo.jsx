import React from 'react'
import Image from 'next/image'
import '@/Styles/userinfo.css'

const UserInfo = ({data}) => {
  return (
    <>
        <section className='user-info-container'>
            <div className='user-info'>
                <h1>Profile info:</h1>
                <p>Username: {data.username}</p>
                <p>First name: {data.firstname}</p>
                <p>Last name: {data.lastname}</p>
                <p>Birthdate: {data.birthDate}</p>
                <p>email: {data.email}</p>
                <button>Change Password</button>
            </div>
            
            <aside>
                <Image className='profile-pic' alt='pfp pic' src='/monkas.jpg' width={400} height={400}/>
            </aside>
        </section>
    </>
  
  )
}

export default UserInfo