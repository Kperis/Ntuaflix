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
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if(loginStatus){
            fetchMovies();
        }
        else{}
    }, [loginStatus])


    const fetchMovies = () => {
        fetch('https://localhost:9876/ntuaflix_api/home', {
            method: 'get',
            headers:{
                'X-OBSERVATORY-AUTH' : sessionStorage.getItem('token')
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
        .then(response => {
            setMovieList(response);
            fetchcategory();
        })
        .catch((error) => alert(error))
    }


    const fetchcategory = async () => {
        const result = await fetch('https://localhost:9876/ntuaflix_api/getGenres', {
                method: 'get',
                headers: {'X-OBSERVATORY-AUTH' : sessionStorage.getItem('token')}
            })
        const categories = await result.json();
        setCategories(categories);
    }


    const onSearch = () =>{
        fetch('https://localhost:9876/ntuaflix_api/searchtitle',
        {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                'X-OBSERVATORY-AUTH' : sessionStorage.getItem('token')
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
            <SearchBox fetchMovies={fetchMovies} setMovieList={setMovieList} titleOnly={false} onSearch={onSearch} title={title} setTitle={setTitle} categories={categories} setOverlay={setOverlay} /> 
            {overlay
            ? <h2>Our suggestions:</h2>
            : <></>
            }
            <List type='movie' arr={movieList} classname='movielist-container'/>
        </div>

        : <Spinner />
        
    )
}
