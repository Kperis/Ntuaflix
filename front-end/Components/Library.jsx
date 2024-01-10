import React from 'react'
import ListContainer from './ListContainer'
import Movie from './Movie'
import '@/Styles/library.css'

const Library = () => {

    const MovieLists = [
        {
            name: 'WatchLater',
            movies: [
                {
                    poster: '/johnwick.jpg',
                    review: '3.4',
                    title: 'John Wick 3'  
                }
            ],
            href: '/mylibrary/watchlater'
        },
        {
            name: 'Favourites',
            movies: [
                {
                    poster: '/interstellar.jpg',
                    review: '4.9',
                    title: 'Interstellar'  
                },
                {
                    poster: '/spiderman.jpg',
                    review: '4.2',
                    title: 'Spider-Man: Into the spider verse' 
                }
            ],
            href: '/mylibrary/favourites'
        }
    ]


  return (
    <div className='library-container'>
        <ListContainer name={MovieLists[0].name} movies={MovieLists[0].movies} href={MovieLists[0].href} />
        <ListContainer name={MovieLists[1].name} movies={MovieLists[1].movies} href={MovieLists[1].href} />
    </div>
  )
}

export default Library