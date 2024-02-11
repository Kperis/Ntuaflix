'use client'

import { useAuth } from '@/Components/Context'
import List from '@/Components/List'
import Spinner from '@/Components/Spinner'
import UserInfo from '@/Components/UserInfo'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [loading, setLoading] = useState(true);
    const [userdata, setUserData] = useState({});

    const {loginStatus, setLoginStatus} = useAuth();
    const path = usePathname();

    useEffect(()=>{
        fetch('http://localhost:9876/ntuaflix_api/profile', {
            method: 'get',
            headers: {'authorization' : 'Bearer ' + localStorage.getItem('token')}
        })
        .then(response => response.json())
        .then(data => {
            data.birthDate = data.birthDate.substring(0,10);
            setUserData(data);
            setLoading(false);
        })
    }, [])

    const MovieLists = [
        {
            id: 1,
            name: 'WatchLater',
            movies: [
                {
                    poster: '/johnwick.jpg',
                    review: '3.4',
                    title: 'John Wick 3'  
                }
            ],
            href: '/profile/watchlater'
        },
        {
            id: 2,
            name: 'Favorites',
            movies: [
                {
                    poster: '/interstellar.jpg',
                    review: '4.9',
                    title: 'Interstellar'  
                },
                {
                    poster: '/spiderman.jpg',
                    review: '4.2',
                    title: 'Spider-Man: Into the spider verse' 
                }
            ],
            href: '/profile/favorites'
        }
    ]

    return (
        <main>
            {loading

            ?   <Spinner />

            :   <>
                    <UserInfo data={userdata}/>
                    <List arr={MovieLists} type='list' classname='library-container' />
                </>
            }
        </main>
    )
}

export default page