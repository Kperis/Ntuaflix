'use client'

import reactDom from 'react-dom'
import React, { useEffect, useState } from "react";
import Image from 'next/image'
import '@/Styles/home.css'
import List from '@/Components/List';
import Spinner from '@/Components/Spinner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/Components/Context';

export default function Home() {

    const router = useRouter();

    const {loginStatus, setLoginStatus} = useAuth();

    const [title, setTitle] = useState('');
    const [filter, setFilter] = useState('title');
    const [genre, setGenre] = useState('Fantasy');

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

    useEffect(() => {
        fetch('http://localhost:9876/ntuaflix_api/searchtitle', {
            method: 'get',
            headers: {}
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }, [title]);

    const searchTitle = (event) =>{
        setTitle(event.target.value);
    }

    const changeFilter = (event) => {
        setFilter(event.target.value);
    }

    const changeGenre = (event) =>{
        setGenre(event.target.value);
    }

  const movies = [
    {
        poster: '/interstellar.jpg',
        review: '4.9',
        title: 'Interstellar'    
    },
    {
        poster: '/johnwick.jpg',
        review: '3.4',
        title: 'John Wick 3'  
    },
    {
        poster: '/spiderman.jpg',
        review: '4.2',
        title: 'Spider-Man: Into the spider verse'  
    },
    {
        poster: '/interstellar.jpg',
        review: '4.9',
        title: 'Interstellar'    
    },
    {
        poster: '/johnwick.jpg',
        review: '3.4',
        title: 'John Wick 3'  
    },
    {
        poster: '/spiderman.jpg',
        review: '4.2',
        title: 'Spider-Man: Into the spider verse'  
    },
    {
        poster: '/interstellar.jpg',
        review: '4.9',
        title: 'Interstellar'    
    },
    {
        poster: '/johnwick.jpg',
        review: '3.4',
        title: 'John Wick 3'  
    },
    {
        poster: '/spiderman.jpg',
        review: '4.2',
        title: 'Spider-Man: Into the spider verse'  
    }
]

  return (
    loginStatus 
    ?
    <div className='home-container' >
      <h1>Ntuaflix</h1>
      <div className='selection'>
        {
        filter === 'title'
        ?   <input type='text' onChange={searchTitle}/>
        :    <select onChange={changeGenre} value={genre}>
                <option value='comedy'>Comedy</option>
                <option value='fantasy'>Fantasy</option>
            </select>
        }
        <select onChange={changeFilter} value={filter}>
            <option value='title'>Title</option>
            <option value='genre'>Genre</option>
        </select>
      </div>
      <List type='movie' arr={movies} classname='movielist-container'/>
    </div>

    : <Spinner />
    
  )
}
