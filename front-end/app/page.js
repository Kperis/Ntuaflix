'use client'

import reactDom from 'react-dom'
import React, { useEffect, useState } from "react";
import '@/Styles/home.css'
import List from '@/Components/List';
import Spinner from '@/Components/Spinner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/Components/Context';
import SearchBox from '@/Components/SearchBox';


export default function Home() {

    const router = useRouter();

    const {loginStatus, setLoginStatus} = useAuth();    

    const [overlay, setOverlay] = useState(true);
    const [movieList, setMovieList] = useState([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        fetch('http://localhost:9876/ntuaflix_api/home', {
            method: 'get',
            headers:{
                'X-OBSERVATORY-AUTH' : localStorage.getItem('token')
            }
        })
        .then(response => {
            if(response.status === 500){
                throw new Error('Server error');
            }
            else if(response.status === 204){
                throw new Error('Nothing returned');
            }
            else{
                return response.json()
            }
        })
        .then(response => setMovieList(response))
        .catch((error) => alert(error))
    }, [])

    const onSearch = () =>{
        fetch('http://localhost:9876/ntuaflix_api/searchtitle',
        {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                'X-OBSERVATORY-AUTH' : localStorage.getItem('token')
            },
            body: JSON.stringify({
                titlePart: title
            })
        } 
        )
        .then(response => response.json())
        .then(data => {
            setOverlay(false);
            setMovieList(data);
        })
    }

    return (
        loginStatus 
        ?
        <div className='home-container' >
            <h1>Ntuaflix</h1>
            <SearchBox setMovieList={setMovieList} titleOnly={false} onSearch={onSearch} title={title} setTitle={setTitle} /> 
            {overlay
            ? <h2>Our suggestions:</h2>
            : <></>
            }
            <List type='movie' arr={movieList} classname='movielist-container'/>
        </div>

        : <Spinner />
        
    )
}
