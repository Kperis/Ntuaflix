import React from 'react'
import Image from 'next/image'
import '@/Styles/list.css'


const ListItem = ({name, type}) => {
  return (
    <>
        <div className='list-item-info'>
            <Image className='movie-poster' src='/interstellar.jpg' width={82} height={82} alt='movie' />
            <div>
                <span>{name}</span>
                <span>{type}</span>
            </div>
        </div>
        <Image className='remove-icon' src='/dislike.png' alt='remove from list' width={48} height={48}/>
    </>
  )
}

export default ListItem