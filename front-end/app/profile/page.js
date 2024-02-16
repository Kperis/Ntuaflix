'use client'

import ListContainer from '@/Components/ListContainer'
import Register from '@/Components/Register'
import Spinner from '@/Components/Spinner'
import UserInfo from '@/Components/UserInfo'
import React, { useEffect, useState } from 'react'

const page = () => {

    const [loading, setLoading] = useState(true);
    const [userdata, setUserData] = useState({});
    const [registered, setRegistered] = useState(true);
  

    useEffect(()=>{
        fetch('https://localhost:9876/ntuaflix_api/user/profile', {
            method: 'get',
            headers: {
                'X-OBSERVATORY-AUTH' : sessionStorage.getItem('token')}
        })
        .then(response => {
            if(response.status === 500){
                throw new Error('Server error')
            }
            else if(response.status === 204){
                throw new Error('No user found')
            }
            else if(response.status === 200){
                return response.json()
            }
            else return {}
        })
        .then(data => {
            if(data.email === null || data.firstname === null || data.lastname === null){
                setRegistered(false);
                setLoading(false);
            }
            else{
                data.birthDate = data.birthDate.substring(0,10);
                setUserData(data);
                setLoading(false);
            }
        })
    }, [])

    return (
        <main>
            {loading

            ?   <Spinner />

            : registered
            
                ?  <>
                        <UserInfo data={userdata}/>
                        <ul className='library-container'>
                            <li>
                                <ListContainer name='Watch Later' href='/profile/watchlater' />
                            </li>
                            <li>
                                <ListContainer name='Favorites' href='/profile/favorites' />
                            </li>
                        </ul>
                    </>
                : <Register />
            }
        </main>
    )
}

export default page