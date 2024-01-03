import React from 'react'
import Image from 'next/image'

const NavIcon = ({alt, description, image}) => {
  return (
    <div>
        <Image alt={`${alt}`} src={`${image}`} width={28} height={28}/>
        <span>{`${description}`}</span>
    </div>
  )
}

export default NavIcon