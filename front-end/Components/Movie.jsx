import React from 'react'
import Image from 'next/image'
import '@/Styles/movie.css'
import Link from 'next/link'



const Movie = ({id, title, poster, review}) => {
  return (
    <Link className='movie-container' href={`/movies/${id}`}>
        {
          poster !== undefined && poster !== '0'
          ? <Image src={`${poster}`} alt='poster' width={217} height={320} className='poster' />
          : <div></div>
        }
        <span>{`${title}`}</span>
        <div>
            <span>{`${review === undefined ? '?' : review}/10`}</span>
        </div>
    </Link>
  )
}

export default Movie