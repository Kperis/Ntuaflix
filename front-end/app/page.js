
import reactDom from 'react-dom'
import React from "react";
import Navbar from '@/Components/Navbar'
import Image from 'next/image'
import '@/Styles/home.css'
import List from '@/Components/List';

export default function Home() {

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
    <div className='home-container' >
      <h1>Ntuaflix</h1>
      {/* <MovieList movies={movies}/> */}
      <List type='movie' arr={movies} classname='movielist-container'/>
    </div>
  )
}
