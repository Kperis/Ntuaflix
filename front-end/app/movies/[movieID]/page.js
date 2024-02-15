'use client'

import MoviePage from '@/Components/MoviePage'
import Spinner from '@/Components/Spinner'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [loading, setLoading] = useState(true);
    const id = useParams().movieID;
    const [movieData, setMovieData] = useState({});
    
    useEffect(() => {
      fetch('http://localhost:9876/ntuaflix_api/title/'+id ,{
          method: 'get',
          headers: {'X-OBSERVATORY-AUTH': sessionStorage.getItem('token')}
      })
      .then(response => {
        if(response.status === 400){
          throw new Error('Server error')
        }
        else if(response.status === 200){
          return response.json()
        }
        else return {}
      })
      .then(data => {
        setMovieData(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => alert(error))
    }, [])

  return (
    loading
    ?   <Spinner />
    :    <MoviePage akas={movieData?.akasInfo} 
          title={movieData?.originalTitle} 
          contributors={movieData?.principals} 
          rating={movieData?.rating}
          poster={movieData?.titlePoster}
          id={movieData?.titleID}
          year={movieData?.startYear}
          type={movieData?.type}
          />
  )
}

export default page