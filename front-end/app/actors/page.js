import List from '@/Components/List'
import React from 'react'

const page = () => {

    const actors = [
        {
            name: 'Brad Pitt',
            photo: '/brad_pitt.jpg'
        },
        {
            name: 'Elizabeth Olsen',
            photo: '/elizabeth.jpg'
        },
        {
            name: 'Robert Downey jr',
            photo: '/robert.jpg'
        },
        {
            name: 'Margott Robbie',
            photo: '/margot.jpg'
        },
        {
            name: 'Cillian Murphy',
            photo: '/tommy.jpg'
        },
        {
            name: 'Brad Pitt',
            photo: '/brad_pitt.jpg'
        },
        {
            name: 'Elizabeth Olsen',
            photo: '/elizabeth.jpg'
        },
        {
            name: 'Robert Downey jr',
            photo: '/robert.jpg'
        },
        {
            name: 'Margott Robbie',
            photo: '/margot.jpg'
        },
        {
            name: 'Cillian Murphy',
            photo: '/tommy.jpg'
        },
    ]

  return (
    <div>
        <List type='actors' arr={actors} classname='actors-container' />
    </div>
  )
}

export default page