import React from 'react'
import ListContainer from './ListContainer'
import Actor from './Actor';
import Movie from './Movie';
import '@/Styles/movielist.css'
import '@/Styles/library.css'
import '@/Styles/actors.css'


const List = ({arr, type, classname}) => {


  return (
    <div>
        <ul className={classname}>
        {
            
            arr.map((item) => {

                let dynamicComponent;
             

                if(type === 'movie'){
                    dynamicComponent = <Movie poster={item?.poster} title={item?.title} review={item?.review}/>;
                }
                else if(type === 'list'){
                    dynamicComponent = <ListContainer name={item?.name} movies={item?.movies} href={item?.href}/>;
                }
                else if(type === 'actors'){
                    dynamicComponent = <Actor name={item?.name} photo={item?.photo}/>
                }
                else{
                    return(
                        <h1 key={item?.id} >There was an error loading item</h1>
                    );
                }

                return(
                    <li key={item?.id}>
                        {dynamicComponent}
                    </li>
                    );
            })
        }
        </ul>
    </div>
  )
}

export default List