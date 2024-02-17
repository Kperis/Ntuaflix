import React from 'react'
import Image from 'next/image'
import '@/Styles/actors.css'
import Link from 'next/link'

const Actor = ({id, photo, name, w, h}) => {

  return (
      <Link href={`/contributors/${id}`}>
        {w !==90
        ? <div className='actor'>
          {
            photo === '\\N' || photo === '\N' || photo === '\\\\N'
              ? <Image src='/no-image.png' alt='actor-photo' width={w} height={h} className='actor-photo'/>
              : <Image src={photo.replace('{width_variable}', 'w185')} unoptimized alt='actor-photo' width={w} height={h} className='actor-photo'/>
          }
            <span>{name}</span>
          
          </div>
        : photo === '\\N'
            ? <Image src='/no-image.png' alt='actor-photo' width={w} height={w} className='actor-photo-circular'/>
            : <Image src={photo.replace('{width_variable}', 'w185')} unoptimized alt='actor-photo' width={w} height={w} className='actor-photo-circular'/>
      }
      </Link>
  )
}

export default Actor