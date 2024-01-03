import React from 'react'
import HomeIcon from '@/public/home.png'
import FriendIcon from '@/public/friends.png'
import LibraryIcon from '@/public/library.png'
import MenuIcon from '@/public/menu.png'
import LogoutIcon from '@/public/logout.png'
import NavIcon from './NavIcon'
import Image from 'next/image'

const Navbar = () => {

    const iconlist = [
        {
            'icon': MenuIcon,
            'description': 'Menu',
            'alt': 'Menu'
        },
        {
            'icon': HomeIcon,
            'description': 'Home',
            'alt': 'Home'
        },
        {
            'icon': FriendIcon,
            'description': 'Friends',
            'alt': 'Friends'
        },
        {
            'icon': LibraryIcon,
            'description': 'Library',
            'alt': 'Library'
        },
        {
            'icon': LogoutIcon,
            'description': 'Logout',
            'alt': 'Logout'
        },        
    ]

    return (
        <div>
            <nav>
                <div>
                    {/* <Image src='/library.png' alt='lol' width={50} height={50}/> */}
                </div>
                <ul>
                    {
                        iconlist.map((icon,index) => {
                            <li>
                                <h1>LOL</h1>{/* <NavIcon image={`${icon.icon}`} description={`${icon.description}`} alt={`${icon.alt}`}/> */}
                            </li>
                        })
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Navbar