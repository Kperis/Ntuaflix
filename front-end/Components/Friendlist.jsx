import React from 'react'
import Friend from './Friend';
import '@/Styles/friends.css'

const Friendlist = () => {

  const friendlist = [
    {
      name: 'nigga1',
      favourites:{
        poster: '/interstellar.jpg',
        review: '4.9',
        title: 'Interstellar'
      }
    },
    {
      name: 'nigga2',
      favourites:{
        poster: '/johnwick.jpg',
        review: '4.9',
        title: 'John Wick 3'
      }
    },
    {
      name: 'nigga3',
      favourites:{
        poster: '/interstellar.jpg',
        review: '4.9',
        title: 'Interstellar'
      }
    },
    {
      name: 'nigga4',
      favourites:{
        poster: '/spiderman.jpg',
        review: '4.9',
        title: 'Spiderman'
      }
    }
  ]

  return (
    <div className='friendlist-container'>
      <h1>
        Connections:
      </h1>
      <ul className='friendlist' >
        {
          friendlist.map((friend) => {
            return(
              <li key={`${friend.name}`} >
                <Friend name={friend.name} />
              </li>
            );
          })
        }
      </ul>  
    </div>
  )
}

export default Friendlist