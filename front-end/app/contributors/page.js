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

    const [actors, setActors] = useState([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        fetch('http://localhost:9876/ntuaflix_api/actors',{
            method : 'get',
            headers: {'X-OBSERVATORY-AUTH' : localStorage.getItem('token')}
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
        .then(response => 
            setActors(response)    
        )
        .catch((error) => alert(error))

    }, [])

    const onSearch = () => {
        fetch('http://localhost:9876/ntuaflix_api/searchname', {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                'X-OBSERVATORY-AUTH' : localStorage.getItem('token')
            },
            body: JSON.stringify({
                namePart : title
            })
        })
        .then(response => response.json())
        .then(data => {
            setActors(data);
        })
    }

  return (
    loginStatus
    ?
    <div>
        <SearchBox setList={setActors} titleOnly={true} onSearch={onSearch} title={title} setTitle={setTitle}/>
        <List type='actors' arr={actors} classname='actors-container' w={220} h={270}/>
    </div>

    :
    <Spinner />
  )
}

export default page