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

    useEffect(() => {
        const item = localStorage.getItem('token');
        if(!item){
            setLoginStatus(false);
            router.push('/signin');
        }
        else{
            setLoginStatus(true);
        }
    },[])

    const [movieList, setMovieList] = useState([]);
    const [title, setTitle] = useState('');

    const onSearch = () =>{
        fetch('http://localhost:9876/ntuaflix_api/searchtitle',
        {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                'authorization' : 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                titlePart: title
            })
        } 
        )
        .then(response => response.json())
        .then(data => {
            setMovieList(data);
            console.log(data);
        })
    }

    return (
        loginStatus 
        ?
        <div className='home-container' >
            <h1>Ntuaflix</h1>
            <SearchBox setMovieList={setMovieList} titleOnly={false} onSearch={onSearch} title={title} setTitle={setTitle} /> 
            <List type='movie' arr={movieList} classname='movielist-container'/>
        </div>

        : <Spinner />
        
    )
}
