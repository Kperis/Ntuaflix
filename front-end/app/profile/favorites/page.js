'use client'

import React from 'react'
import ListItem from '@/Components/ListItem'
import { useEffect } from 'react'

const page = () => {

    useEffect(() => {
        fetch('http://localhost:9876/ntuaflix_api/user/favorites', {
            method: 'get',
            headers: {'X-OBSERVATORY-AUTH' : localStorage.getItem('token')}
        })
        .then(response => response.json())
        .then(response => console.log(response))
    },[])

    return (
        <>
            <ul className='list'>
            {
                arr.map((movie) => {
                    return(
                        <li>
                            <ListItem key={movie.id} name={movie.name} id={movie.id} type={movie.type}/>
                        </li>
                    )
                })
            }
            </ul>
        </>
    )
}

export default page