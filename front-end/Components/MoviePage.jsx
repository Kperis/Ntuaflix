'use client'

import React, { useEffect, useState } from 'react'
import Heart from './Heart'
import '@/Styles/moviepage.css'
import List from './List'

const MoviePage = ({id, poster, title, contributors, akas, year, type, rating}) => {

  const [heart, setHeart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actors, setActors] = useState([]);

  useEffect(()=> {
    fetchphotos();
  }, [])

  const fetchphotos = async () =>{
    const arr = await Promise.all(contributors.map( async (contributor) => {
      const res = await fetch('http://localhost:9876/ntuaflix_api/name/'+contributor?.nameID ,{
          method: 'get',
          headers: {'authorization': 'Bearer ' + localStorage.getItem('token')}
      });
      const data = await res.json();
      return data;
    }));

    

    setActors(arr);
    console.log(arr);
    setLoading(false);
  }


  const onHeartClick = () =>{
    setHeart(!heart);
  }

  const addToWatchLater = () =>{
    
  }


  return (
    <div className='moviepage-container' style={{backgroundImage: `url(${poster.replace('{width_variable}', 'original')})`}}>
        <main className='details'>
          <section>
            <h1>{title}</h1>
            <p>{akas.map((item) => {return item?.genreTitle+', '})}</p>
          </section>
          <div className='seperation'></div>
          <section>
            <p>Year: {year}</p>
            <p>Type: {type}</p>
            <p>Rating: {rating.avRating ? rating.avRating : 'No data'}</p>
          </section>
          <section className='contributors'>
            <p>Contributors: </p>
            {
              contributors.length === 0 || loading
              ? <span>Cast: No Data</span>
              : <List type='actors' arr={actors} classname='actors-circular' w={90} h={135} />
            }
          </section>
          <div className='addtolist-container'>
            <button onClick={addToWatchLater}>
              Watch Later
            </button>
            <Heart active={heart} func={onHeartClick} />
          </div>
        </main>
    </div>
  )
}

export default MoviePage