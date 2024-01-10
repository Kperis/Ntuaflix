import React from 'react'
import Image from 'next/image'
import '@/Styles/friends.css'

const Friend = ({name}) => {
  return (
    <div className='friend-container'>
        <Image className='profile-pic' alt='profile pic' src='/profile-user.png' width={48} height={48}/>
        <h2>{`${name}`}</h2>
    </div>
  )
}

export default Friend