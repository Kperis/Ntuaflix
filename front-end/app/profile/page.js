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
        fetch('http://localhost:9876/ntuaflix_api/user/profile', {
            method: 'get',
            headers: {
                'X-OBSERVATORY-AUTH' : localStorage.getItem('token')}
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.email === null || data.firstname === null || data.lastname === null){
                setRegistered(false);
                setLoading(false);
            }
            else{
                // data.birthDate = data.birthDate.substring(0,10);
                setUserData(data);
                setLoading(false);
                console.log(data);
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
                                <ListContainer name='Watch Later' href='/watchlater' />
                            </li>
                            <li>
                                <ListContainer name='Favorites' href='/favorites' />
                            </li>
                        </ul>
                    </>
                : <Register />
            }
        </main>
    )
}

export default page