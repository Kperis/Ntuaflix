'use client'

import React from 'react'
import { useState } from 'react'
import NavIcon from './NavIcon'
import '@/Styles/navbar.css'
import { useAuth } from './Context'

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
            icon: '/library.png',
            description: 'Library',
            alt: 'Library',
            href: '/profile',
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

    const { loginStatus, setLoginStatus } = useAuth();
    // const [overlay, setOverlay] = useState(false);
    const [route, setRoute] = useState('Home');

    const changeRoute = (title) =>{
        if(title === 'Logout'){
            setRoute('Home');
            setLoginStatus(false);
        }
        else setRoute(title);
    }
    
    return (
        <div>
            {
            
            loginStatus 
            
            ?

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