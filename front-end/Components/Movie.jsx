import React from 'react'
import Image from 'next/image'
import '@/Styles/movie.css'
import Link from 'next/link'



const Movie = ({id, title, poster, review}) => {
  return (
    <Link className='movie-container' href={`/movies/${id}`}>
        {
          poster !== undefined && poster !== '0' && poster !== '\\N'
          ? <Image src={poster.replace('{width_variable}', 'w185')}  unoptimized alt='poster' width={217} height={320} className='poster' />
          : <Image src='/no-image.png' alt='poster' width={217} height={320} className='poster'/>
        }
        <span>{`${title}`}</span>
        <div>
            <span>{`${review === undefined ? '?' : review}/10`}</span>
        </div>
    </Link>
  )
}

export default Movie