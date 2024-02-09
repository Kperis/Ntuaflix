'use client'

import React from 'react'
import ListItem from '@/Components/ListItem'
import { useEffect } from 'react'

const page = () => {
    const arr = [
        {
            name: 'Star Wars',
            id: 1,
            type: 'movie'
        },
        {
            name: 'Interstellar',
            id: 2,
            type: 'episode'
        },
        {
            name: 'Harry potter',
            id: 3,
            type: 'series'
        },
        {
            name: 'Inception',
            id: 4,
            type: 'movie'
        },
    ]

    useEffect(() => {
        fetch('http://localhost:9876/ntuaflix_api/favorites', {
            method: 'get',
            headers: {'authorization' : 'Bearer ' + localStorage.getItem('token')}
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