import React from 'react'
import Image from 'next/image'
import '@/Styles/movie.css'



const Movie = ({title, poster, review}) => {
  return (
    <div className='movie-container' >
        <Image src={`${poster}`} alt='poster' width={217} height={320} className='poster' />
        <span>{`${title}`}</span>
        <div>
            <span>{`${review}/5`}</span>
        </div>
    </div>
  )
}

export default Movie