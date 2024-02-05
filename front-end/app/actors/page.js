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
        const item = localStorage.getItem('token');
        if(!item){
            setLoginStatus(false);
            router.push('/signin');
        }
        else{
            setLoginStatus(true);
        }
    },[])

    const onSearch = () => {
        fetch('http://localhost:9876/ntuaflix_api/searchname', {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                'authorization' : 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                namePart : title
            })
        })
        .then(response => response.json())
        .then(data => {
            setActors(data);
            console.log(data);
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