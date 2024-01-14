import MoviePage from '@/Components/MoviePage'
import React from 'react'

const page = () => {

    
    const movie = {
        poster: '/interstellar2.jpg',
        review: '4.9',
        title: 'Interstellar'    
    }

  return (
    <MoviePage title={movie.title} poster={movie.poster}/>
  )
}

export default page