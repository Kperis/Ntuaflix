import React from 'react'
import Image from 'next/image'
import '@/Styles/actors.css'
import Link from 'next/link'

const Actor = ({id, photo, name}) => {

  return (
      <Link href={`/contributors/${id}`}>
        <div className='actor'>
            {
              photo === '\\N'
              ? <Image src='/no-image.png' alt='actor-photo' width={220} height={270} className='actor-photo'/>
              : <Image src={photo.replace('{width_variable}', 'w185')} unoptimized alt='actor-photo' width={220} height={270} className='actor-photo'/>

            }
            <span>{name}</span>
        </div>
      </Link>
  )
}

export default Actor