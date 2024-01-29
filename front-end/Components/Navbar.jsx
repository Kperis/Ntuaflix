'use client';

import React from 'react'
import NavIcon from './NavIcon'
import '@/Styles/navbar.css'
import Image from 'next/image'
import { useState } from 'react'

const Navbar = () => {

    var iconlist = [
        
        {
            icon: '/home.png',
            description: 'Home',
            alt: 'Home',
            href: '/',
            active: 0
        },
        {
            icon: '/actor.png',
            description: 'Actor',
            alt: 'Actor',
            href: '/actors',
            active: 0
        },
        {
            icon: '/friends.png',
            description: 'Friends',
            alt: 'Friends',
            href: '/friends',
            active: 0
        },
        {
            icon: '/library.png',
            description: 'Library',
            alt: 'Library',
            href: '/mylibrary',
            active: 0
        },
        {
            icon: '/logout.png',
            description: 'Logout',
            alt: 'Logout',
            href: '/signin',
            active: 0
        },        
    ]

    const [overlay, setOverlay] = useState(true);
    const [route, setRoute] = useState('Home');

    const changeRoute = (title) =>{
        if(title === 'Logout'){
            setOverlay(false);
        }
        else if(title === 'Home'){
            setOverlay(true);
        }

        setRoute(title);

    }
    
    return (
        <div>
            {
            
            overlay ?

            <nav className='navbar-container'>
                <ul className='navbar-items'>
                    {
                        
                            iconlist.map((icon) => {
                                return(
                                    <li key={`${icon.description}`} 
                                        onClick={() => changeRoute(icon.description)} >
                                        <NavIcon image={icon.icon} description={icon.description} alt={icon.alt} active={route} href={icon.href}/>
                                    </li>
                                );
                            })            
                        }
                </ul>
            </nav>

            : <div></div>
}
        </div>
    )
}

export default Navbar