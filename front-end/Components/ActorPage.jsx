import React from 'react'
import Image from 'next/image'
import Movie from './Movie'
import '@/Styles/actorpage.css'

const ActorPage = ({name, poster, birth, death, profession, movies}) => {
  return (
    <div className='actorpage-container'>
        <main>
            <Image className='actor-poster' src={poster.replace('{width_variable}', 'w185')} unoptimized alt='actor-photo' width={440} height={540}/>
            <section className='actor-info'>
                <h2>Info:</h2>
                <span>Name: {name}</span>
                <span>Birth: {birth}</span>
                <span>Died: {death}</span>
                <span>Profession: {profession}</span>
            </section>
        </main>
        <aside className='actor-works'>
            <h2>Worked on:</h2>
            <section>
            {
                movies.map((movie) =>{
                    return(
                        <Movie key={movie.titleID} id={movie.titleID} title={movie.originalTitle} review={movie.rating[0].avRating}/>
                    )
                })
            }   
            </section>
        </aside>
    </div>
  )
}

export default ActorPage