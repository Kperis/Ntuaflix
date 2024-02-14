'use client'

import React, { useEffect, useState } from 'react'
import Heart from './Heart'
import '@/Styles/moviepage.css'
import List from './List'

const MoviePage = ({id, poster, title, contributors, akas, year, type, rating}) => {

  const [heart, setHeart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actors, setActors] = useState([]);
  const [disableClick, setDisableClick] = useState(false);

  useEffect(()=> {
    fetchphotos();
  }, [])

  const fetchphotos = async () =>{
    const arr = await Promise.all(contributors.map( async (contributor) => {
      const res = await fetch('http://localhost:9876/ntuaflix_api/name/'+contributor?.nameID ,{
          method: 'get',
          headers: {'X-OBSERVATORY-AUTH' : localStorage.getItem('token')}
      });
      const data = await res.json();
      return data;
    }));

    fetch('http://localhost:9876/ntuaflix_api/listsInfo/' + id, {
      method: 'get',
      headers: {'X-OBSERVATORY-AUTH' : localStorage.getItem('token')}
    })
    .then(response => response.json())
    .then(response => {
      setHeart(response.isFavorite);
    });

    setActors(arr);
    setLoading(false);
  }


  const onHeartClick = () =>{
    let temp = heart;
    if(!disableClick){
      setHeart(!heart);
      setDisableClick(true);
      if(!temp){
        fetch('http://localhost:9876/ntuaflix_api/user/addToFavorites/' + id,{
          method: 'post',
          headers: {
            'X-OBSERVATORY-AUTH' : localStorage.getItem('token'),
            'Content-type' : 'application/json'
          },
          body: JSON.stringify({})
        })
        .then(response => response.json())
        .then(response => console.log(response))
      }
      else{
        fetch('http://localhost:9876/ntuaflix_api/user/deleteFromFavorites/' + id, {
          method: 'delete',
          headers: {
            'X-OBSERVATORY-AUTH' : localStorage.getItem('token')
          },
        })
        .then(response => console.log(response))
      }
      setTimeout(() => {
        setDisableClick(false);
      }, 500);
    }
    else{

    }
  }

  const addToWatchLater = () =>{
    fetch('http://localhost:9876/ntuaflix_api/user/addToWatchlist/' + id,{
      method: 'post',
      headers: {
        'X-OBSERVATORY-AUTH' : localStorage.getItem('token'),
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({})
    })
    .then(response => {
      switch (response.status){
        case 500: 
          alert('server error');
          break;
        case 200:
          alert('Title already in your watchlist');
          break;
        case 201:
          alert('Successfully added to watchlist');
          break;
        default:
          alert('Something went wrong');
          break;
      }
    })
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
            <p>Type: {type}</p>
            <p>Year: {year}</p>
            <p>Rating: {rating[0].avRating ? rating[0].avRating : 'No data'}</p>
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