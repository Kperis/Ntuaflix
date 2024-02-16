import React from 'react'
import Image from 'next/image'
import '@/Styles/list.css'


const ListItem = ({id, name, type, poster, listtype, refetch}) => {

  const onRemoveMovie = () => {
    if(listtype === 'fav'){
      fetch('https://localhost:9876/ntuaflix_api/user/deleteFromFavorites/' + id, {
        method : 'delete',
        headers: {'X-OBSERVATORY-AUTH' : sessionStorage.getItem('token')}
      })
      .then(response => {
        if(response.status === 500){
          throw new Error('Server error');
        }
        else if(response.status === 404){
          throw new Error('Title was not found');
        }
        else if(response.status === 204){
          return {message : 'Successfully deleted'}
        }
        else{
          return {message: 'Uknown error'}
        }
      })
      .then(response => {
        refetch();
      })
      .catch((error) => alert(error))
    }
    else{
      fetch('https://localhost:9876/ntuaflix_api/user/deleteFromWatchlist/' + id, {
        method : 'delete',
        headers: {'X-OBSERVATORY-AUTH' : sessionStorage.getItem('token')}
      })
      .then(response => {
        if(response.status === 500){
          throw new Error('Server error');
        }
        else if(response.status === 404){
          throw new Error('Title wss not found');
        }
        else if(response.status === 204){
          return {message : 'Successfully deleted'}
        }
        else{
          return {message: 'Uknown error'}
        }
      })
      .then(response => {
        refetch();
      })
      .catch((error) => alert(error))
    }
  }

  return (
    <>
        <div className='list-item-info'>
            {
              poster === null || poster === undefined || poster === '\\N'
              ? <Image className='movie-poster' src='/no-image.png' width={82} height={82} alt='movie' />
              : <Image className='movie-poster' src={poster.replace('{width_variable}', 'w185')} unoptimized width={82} height={82} alt='movie' />
            }
            <div>
                <span>{name}</span>
                <span>{type}</span>
            </div>
        </div>
        <Image onClick={onRemoveMovie} className='remove-icon' src='/dislike.png' alt='remove from list' width={48} height={48}/>
    </>
  )
}

export default ListItem