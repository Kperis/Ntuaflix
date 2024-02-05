'use client'

import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Spinner from '@/Components/Spinner';
import ActorPage from '@/Components/ActorPage';


const page = () => {

    const [loading, setLoading] = useState(true);
    const id = useParams().contributorID;

    const [movies, setMovies] = useState([]);
    const [name, setName] = useState('');
    const [birth, setBirth] = useState(0);
    const [death, setDeath] = useState(0);
    const [profession, setProfession] = useState('');
    const [poster, setPoster] = useState('');
    const [ids, setIds] = useState([]);


    useEffect(() => {
      fetch('http://localhost:9876/ntuaflix_api/name/'+id ,{
          method: 'get',
          headers: {'authorization': 'Bearer ' + localStorage.getItem('token')}
      })
      .then(response => response.json())
      .then(data => {
        setBirth(data.birthYr);
        setDeath(data.deathYr);
        setPoster(data.namePoster);
        setName(data.name);
        setProfession(data.profession);
        setIds(data.nameTitles);
        fetchMovies();
        setLoading(false);
        
      })
    }, [])

    useEffect(() => {
        fetchMovies();
    }, [loading])

    const fetchMovies = async () => {

        const arr = await Promise.all(ids.map(async (movie) => {
            const response = await fetch('http://localhost:9876/ntuaflix_api/title/' + movie.titleID, {
                method: 'get',
                headers: {'authorization' : 'Bearer ' + localStorage.getItem('token')}
            })

            const data = await response.json();
            console.log(data);
            return data;
        }))

        setMovies(arr);
    
    }

    return (
        loading
        ? <Spinner />
        : <ActorPage movies={movies} profession={profession} name={name} birth={birth} death={death} poster={poster}/>
    )
}

export default page