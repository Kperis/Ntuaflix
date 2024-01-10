import React from 'react'
import Movie from './Movie';
import '@/Styles/movielist.css'


const MovieList = ({movies}) => {


  return (
    <div>
        <ul className='movielist-container' >
            {
                movies.map((movie) => {
                    return(
                        <li key={`${movie.title}`}>
                            <Movie poster={movie.poster} title={movie.title} review={movie.review} />
                        </li>
                    );
                })
            }
        </ul>
    </div>
  )
}

export default MovieList