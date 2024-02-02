'use client'

import MoviePage from '@/Components/MoviePage'
import Spinner from '@/Components/Spinner'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [loading, setLoading] = useState(true);
    const id = useParams().movieID;
    
    useEffect(() => {
      fetch('http://localhost:9876/ntuaflix_api/title/'+id ,{
          method: 'get',
          headers: {'authorization': 'Bearer ' + localStorage.getItem('token')}
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setLoading(false);
      })
    }, [])

    const movie = {
      poster: '/interstellar.jpg',
      review: '4.9',
      title: 'Interstellar'    
    }

  return (
    loading
    ?   <Spinner />
    :    <MoviePage title={movie.title} poster={movie.poster}/>
  )
}

export default page