import List from '@/Components/List'
import React from 'react'

const page = () => {

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
    <div>
        <List arr={MovieLists} type='list' classname='library-container' />
    </div>
  )
}

export default page