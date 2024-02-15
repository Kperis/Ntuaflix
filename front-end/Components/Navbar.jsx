'use client'

import React, { useEffect } from 'react'
import { useState } from 'react'
import NavIcon from './NavIcon'
import '@/Styles/navbar.css'
import { useAuth } from './Context'
import { usePathname } from 'next/navigation'

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
            description: 'Contributors',
            alt: 'Contributors',
            href: '/contributors',
            active: 0
        },
        {
            icon: '/library.png',
            description: 'Profile',
            alt: 'Profile',
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
    const [route, setRoute] = useState('home');

    const path = usePathname();

    useEffect(() => {
        const part = path.split('/');
        if(part[1] === ''){
            setRoute('home');
        }
        else{
            setRoute(part[1]);
        }
    }, [])


    const changeRoute = (title) =>{
        if(title === 'logout'){
            fetch('http://localhost:9876/ntuaflix_api/auth/logout', {
                method: 'post',
                headers : {
                    'X-OBSERVATORY-AUTH' : sessionStorage.getItem('token')
                },
                body : JSON.stringify({})
            })
            .then(response => {
                if(response.status === 500){
                    throw new Error('Server error');
                }
                sessionStorage.clear();

            })
            .catch((error) => {
                sessionStorage.clear();
                alert(error);
            })
                 
            setRoute('home');
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
                                        onClick={() => changeRoute(icon.description.toLowerCase())} >
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