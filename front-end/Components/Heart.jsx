import React from 'react'
import Image from 'next/image'
import '@/Styles/heart.css'

const Heart = ({active, func}) => {
  return (
    <Image className={`heart ${active ? 'fade-in' : ''}`} onClick={func} alt='heart' src={`${active ? '/heartfill.png' : '/heart.png'}`} width={48} height={48} />
)
}

export default Heart