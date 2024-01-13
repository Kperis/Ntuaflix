import React from 'react'
import Image from 'next/image'
import '@/Styles/movie.css'
import Link from 'next/link'



const Movie = ({title, poster, review}) => {
  return (
    <Link className='movie-container' href='/movies/interstellar'>
        <Image src={`${poster}`} alt='poster' width={217} height={320} className='poster' />
        <span>{`${title}`}</span>
        <div>
            <span>{`${review}/5`}</span>
        </div>
    </Link>
  )
}

export default Movie