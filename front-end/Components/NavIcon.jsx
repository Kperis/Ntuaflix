import React from 'react'
import Image from 'next/image'
import '@/Styles/navbar.css'
import Link from 'next/link'


const NavIcon = ({alt, description, image, active, href}) => {

  const onLogout = (desc) =>{
    if(desc === 'Logout'){
      localStorage.clear();
    }
  }
  
  return (
    <>
      <Link onClick={() => onLogout(description)} className={active === description.toLowerCase() ? 'navicon-active' : 'navicon' } href={href}>
        <Image className='options-logo' alt={alt} src={image} width={48} height={48}/>
        <span>{description}</span>
      </Link>
    </>
  )
}

export default NavIcon