'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Heart from './Heart'
import '@/Styles/moviepage.css'

const MoviePage = ({poster, title, actors}) => {

  const [heart, setHeart] = useState(false);


  const onHeartClick = () =>{
    setHeart(!heart);
  }


  return (
    <div className='moviepage-container' style={{backgroundImage: `url(${poster})`}}>
        <main className='details'>
          <div>
            <h1>{title}</h1>
            <span>Action</span>
          </div>
          <div className='seperation'></div>
          <section>Lorem ipsum dolor sit amet consectetur adipisicing elit.
             Pariatur suscipit deleniti, repellat voluptatum porro necessitatibus deserunt magnam asperiores numquam modi ullam!
            Eius eum nam omnis deleniti tempore perferendis fugiat eveniet.
          </section>
          <section>
            <span>{`Cast: ${actors}`}</span>
            <span>Director: Christopher Nolan</span>
          </section>
          <div className='addtolist-container'>
            <button>
              Watch Later
            </button>
            <Heart active={heart} func={onHeartClick} />
          </div>
        </main>
    </div>
  )
}

export default MoviePage