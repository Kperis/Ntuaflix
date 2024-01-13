import React from 'react'
import Image from 'next/image'
import '@/Styles/actors.css'

const Actor = ({photo, name}) => {
  return (
    <div className='actor'>
        <Image src={photo} alt='actor-photo' width={200} height={270} className='actor-photo'/>
        <span>{name}</span>
    </div>
  )
}

export default Actor