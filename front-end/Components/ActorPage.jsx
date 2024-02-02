import React from 'react'
import Image from 'next/image'
import Movie from './Movie'

const ActorPage = ({name, poster, birth, death, profession, movies}) => {
  return (
    <div>
        <Image src={poster.replace('{width_variable}', 'w185')} unoptimized alt='actor-photo' width={220} height={270}/>
        <div>
            <span>{name}</span>
            <span>{birth}</span>
            <span>{death}</span>
            <span>{profession}</span>
        </div>
        <div>
            {
                movies.map((movie) =>{
                    return(
                        <Movie key={movie.titleID} id={movie.titleID} title={movie.originalTitle} review={movie.rating[0].avRating}/>
                    )
                })
            }
        </div>
    </div>
  )
}

export default ActorPage