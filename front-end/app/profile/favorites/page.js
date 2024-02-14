'use client'

import React, { useState } from 'react'
import ListItem from '@/Components/ListItem'
import { useEffect } from 'react'

const page = () => {

    const [arr, setArr] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9876/ntuaflix_api/user/favorites', {
            method: 'get',
            headers: {'X-OBSERVATORY-AUTH' : localStorage.getItem('token')}
        })
        .then(response => {
            if(response.status === 500){
                throw new Error('Server error');
            }
            else if(response.status === 204){
                return []
            }
            else if(response.status === 200){
                return response.json()
            }
        })
        .then(response => {
            setArr(response);
        }
        )
        .catch((error) => alert(error))
    },[])

    const refetch = () =>{
        fetch('http://localhost:9876/ntuaflix_api/user/favorites', {
            method: 'get',
            headers: {'X-OBSERVATORY-AUTH' : localStorage.getItem('token')}
        })
        .then(response => {
            if(response.status === 500){
                throw new Error('Server error');
            }
            else if(response.status === 204){
                return [];
            }
            else if(response.status === 200){
                return response.json();
            }
        })
        .then(response => {
            setArr(response);
        }
        )
        .catch((error) => alert(error))
    }

    return (
        <>
            <ul className='list'>
            {
                arr.map((movie) => {
                    return(
                        <li key={movie?.titleID}>
                            <ListItem id={movie.titleID} name={movie.originalTitle} type={movie.type} poster={movie.titlePoster} listtype='fav' refetch={refetch} />
                        </li>
                    )
                })
            }
            </ul>
        </>
    )
}

export default page