import Link from 'next/link'
import React from 'react'
import '@/Styles/library.css'



const ListContainer = ({name, href}) => {
  return (
    <div className='libraryList-container'>
        <Link href={href} className='libraryList'>
            <h1>{`${name}`}</h1>
        </Link>
    </div>
  )
}

export default ListContainer