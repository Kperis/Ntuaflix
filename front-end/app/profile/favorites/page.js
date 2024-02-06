import React from 'react'
import ListItem from '@/Components/ListItem'

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