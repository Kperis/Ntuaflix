import React from 'react'
import { useState } from 'react';
import Image from 'next/image';
import '@/Styles/home.css'

const SearchBox = ({setMovieList, titleOnly, onSearch, title, setTitle}) => {

    const [filter, setFilter] = useState('title');
    const [genre, setGenre] = useState('Comedy');
    const [rating, setRating] = useState(null);
    const [startYear , setStartYear] = useState(null);
    const [endYear, setEndYear] = useState(null);


    const searchTitle = (event) =>{
        setTitle(event.target.value);
    }

    const changeFilter = (event) => {
        setFilter(event.target.value);
    }

    const changeGenre = (event) =>{
        setGenre(event.target.value);
    }

    const changeRating = (event) => {
        setRating(event.target.value);
    }

    const changeStartYear = (event) => {
        setStartYear(event.target.value);
    }

    const changeEndYear = (event) => {
        setEndYear(event.target.value);
    }

    const onSearchGenre = () =>{

        if(rating === null){
            alert('Insert minimum rating');
        }
        else{
        fetch('http://localhost:9876/ntuaflix_api/bygenre', 
            {
                method: 'post',
                headers: {
                    'Content-type': 'application/json',
                    'X-OBSERVATORY-AUTH': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    qgenre: genre,
                    minrating: rating,
                    yrFrom: startYear,
                    yrTo: endYear
                })

            }
        )
        .then(respone => respone.json())
        .then(data => {
            setMovieList(data);
            console.log(rating);
        })

        }
    }


    return (
        <div className='selection'>
            {
            filter === 'title'
            ?   <div>
                    <input type='text' value={title} onChange={searchTitle}/>
                    <button onClick={onSearch} className='search-button'><Image src='/magnifier.png' alt='search' width={36} height={36} /></button>
                </div>
            :   <div>
                    <select onChange={changeGenre} value={genre}>
                        <option value='Comedy'>Comedy</option>
                        <option value='Fantasy'>Fantasy</option>
                        <option value='Crime'>Crime</option>
                        <option value='Romance'>Romance</option>
                        <option value='Drama'>Drama</option>
                    </select>
                    <input placeholder='min rating' onChange={changeRating} type='number' min={0.0} max={10.0} step={0.1} value={rating === null ? '' : rating}/>
                    <input placeholder='Year from' onChange={changeStartYear} type='number' min={1900} max={2024} step={1}  value={startYear === null ? '' : startYear}/>
                    <input placeholder='Year to' onChange={changeEndYear} type='number' min={1900} max={2024} step={1}  value={endYear === null ? '' : endYear}/>
                    <button onClick={onSearchGenre} className='search-button'><Image src='/magnifier.png' alt='search' width={36} height={36} /></button>
                </div>
            }
            {
            !titleOnly
            ?   <select onChange={changeFilter} value={filter}>
                    <option value='title'>Title</option>
                    <option value='genre'>Genre</option>
                </select>
            :   <></>
            }
    </div>
    )
}

export default SearchBox