'use client'

import List from '@/Components/List'
import Spinner from '@/Components/Spinner'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useAuth } from '@/Components/Context'

const page = () => {


    const router = useRouter();
    const {loginStatus, setLoginStatus} = useAuth();

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
    loginStatus
    ?
    <div>
        <List type='actors' arr={actors} classname='actors-container' />
    </div>

    :
    <Spinner />
  )
}

export default page