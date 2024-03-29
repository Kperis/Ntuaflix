'use client'

import ListItem from '@/Components/ListItem'
import React, { useEffect, useState } from 'react'
import '@/Styles/list.css'

const page = () => {

    const [arr, setArr] = useState([])

    useEffect(() => {
        fetch('https://localhost:9876/ntuaflix_api/user/watchlist', {
            method: 'get',
            headers: {'X-OBSERVATORY-AUTH' : sessionStorage.getItem('token')}
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
        fetch('https://localhost:9876/ntuaflix_api/user/watchlist', {
            method: 'get',
            headers: {'X-OBSERVATORY-AUTH' : sessionStorage.getItem('token')}
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
                            <ListItem id={movie.titleID} name={movie.originalTitle} type={movie.type} poster={movie.titlePoster} listtype='watchlater' refetch={refetch}/>
                        </li>
                    )
                })
            }
            </ul>
        </>
    )
}

export default page