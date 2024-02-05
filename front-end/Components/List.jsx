import React from 'react'
import ListContainer from './ListContainer'
import Actor from './Actor';
import Movie from './Movie';
import '@/Styles/movielist.css'
import '@/Styles/library.css'
import '@/Styles/actors.css'


const List = ({arr, type, classname, w, h}) => {


  return (
    <>
        <ul className={classname}>
        {
            
            arr.map((item) => {

                let dynamicComponent;
             

                if(type === 'movie'){
                    dynamicComponent = <Movie id={item.titleID} poster={item?.titlePoster} title={item?.originalTitle} review={item?.rating[0]?.avRating}/>;
                }
                else if(type === 'list'){
                    dynamicComponent = <ListContainer name={item?.name} movies={item?.movies} href={item?.href}/>;
                }
                else if(type === 'actors'){
                    dynamicComponent = <Actor id={item.nameID} name={item?.name} photo={item?.namePoster} w={w} h={h}/>
                }
                else{
                    return(
                        <h1 key={item?.id} >There was an error loading item</h1>
                    );
                }

                return(
                    <li key={item?.titleID}>
                        {dynamicComponent}
                    </li>
                    );
            })
        }
        </ul>
    </>
  )
}

export default List