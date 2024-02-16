'use client'

import List from '@/Components/List'
import Spinner from '@/Components/Spinner'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useAuth } from '@/Components/Context'
import SearchBox from '@/Components/SearchBox'

const page = () => {


    const router = useRouter();
    const {loginStatus, setLoginStatus} = useAuth();
    const [overlay, setOverlay] = useState(true);
    const [actors, setActors] = useState([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        fetchActors();
    }, [])

    const fetchActors = () => {
        fetch('https://localhost:9876/ntuaflix_api/actors',{
            method : 'get',
            headers: {'X-OBSERVATORY-AUTH' : sessionStorage.getItem('token')}
        })
        .then(response => {
            if(response.status === 500){
                throw new Error('Server error');
            }
            else if(response.status === 204){
                return {};
            }
            else if(response.status === 200){
                return response.json();
            }
        })
        .then(response => {
            setActors(response);
            setOverlay(true);
        })
        .catch((error) => alert(error))
    }

    const onSearch = () => {
        fetch('https://localhost:9876/ntuaflix_api/searchname', {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                'X-OBSERVATORY-AUTH' : sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                namePart : title
            })
        })
        .then(response => {
            if(response.status === 500){
                throw new Error('Server encountered an error')
            }
            else if(response.status === 404){
                return []
            }
            else if(response.status === 200){
                return response.json();
            }
            else{
                throw new Error('Something went wrong')
            }
        })
        .then(data => {
            setActors(data);
            setOverlay(false);
        })
        .catch((error) => alert(error))
    }

  return (
    loginStatus
    ?
    <div>
        <SearchBox setOverlay={setOverlay} fetchMovies={fetchActors} setList={setActors} titleOnly={true} onSearch={onSearch} title={title} setTitle={setTitle}/>
        {overlay
            ? <h2 className='suggest'>Our suggestions:</h2>
            : <></>
        }       
        <List type='actors' arr={actors} classname='actors-container' w={220} h={270}/>
    </div>

    :
    <Spinner />
  )
}

export default page