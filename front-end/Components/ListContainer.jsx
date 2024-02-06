import Link from 'next/link'
import React from 'react'
import '@/Styles/library.css'



const ListContainer = ({name, href}) => {
  return (
    <Link href={href} className='libraryList'>
      <div className='libraryList-container'>
        <h1>{`${name}`}</h1>
      </div>
    </Link>
  )
}

export default ListContainer