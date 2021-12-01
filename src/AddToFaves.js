import './MovieList.css';
import MoviesList from './MovieItemCreator';
import MoviesFavouriteGallery from './MovieFavItem';
import MovieCollection from './MovieValueList';
import MovieSideUlNav from './MovieListSIdeUl/MovieListSideUI';
import { useState } from 'react';

const MovieSection = () => {

    const [selectedItems, setSelectedItems] = useState([]);

    const addToMovieGallery = (id) => {
        const ids = [];
        ids.push(id);
        let filteredArray = MovieCollection.filter((movieCollectionObject) => {
            return ids.includes(movieCollectionObject.id)
        });
        setSelectedItems([...selectedItems, ...filteredArray]);
    }

    const remove = () => {
        console.log(selectedItems);
        selectedItems.shift();
        setSelectedItems([...selectedItems]);
    }


    return (
        <section>
            <div className="lookbookcontainer">
                <div className="lookbookImages">
                    <MovieSideUlNav/>
                    <MoviesList handleClick={addToMovieGallery}/>
                </div>
                <MoviesFavouriteGallery className="lookbookGallery" chosenItems={selectedItems} />
                <button onClick={remove}>loooll</button>
            </div>
        </section>
    );
};

export default MovieSection; 



// MovieCollection is the array of shows

import MovieItemHTML from './MovieAPIItem';
import MovieCollection from './MovieValueList';

const MoviesList = (props) => {

    const itemList = MovieCollection.map((item) => (

        <MovieItemHTML
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            url={item.url}
            smallimg={item.imgurl}
            clickHandler={props.handleClick} //
        />));

    return (

        <div className="galleryImgs">
            <ul>
                {itemList}
            </ul>
        </div>
    );
};

export default MoviesList; 



import React from "react";

const MovieItemHTML = (props) => {

  return (
    <li>
      <div id="pooping" className="product">
        <img src={props.url} alt={props.description}/>
        <div className="content">
          <h3>{props.name}</h3>
          <p className="description">{props.description}</p>
          <p className="price">{props.price}</p>
          <button onClick={() => props.clickHandler(props.id)}>Click to Add to Favourites</button>
        </div>
      </div>
    </li>
  );
};

export default MovieItemHTML;



import MovieItemHTMLFav from './MoviesFavouriteGallery';
const MoviesFavouriteGallery = (props) => {
    return (
        <div className="lookbookpage">
            <div className="h2container">
            <h3>Your Favourites</h3>
            </div>
            {
                props.chosenItems.map((item) => {
                    return (<MovieItemHTMLFav
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    url={item.url}
                    smallimg={item.imgurl}
                    clickHandler={props.handleClick}
                />)
                })
            }

        </div>
    );
};

export default MoviesFavouriteGallery; 



import React from "react";
const MovieItemHTMLFav = (props) => {
  return (
    <li>
      <div id="pooping" className="product">
        <img src={props.url} alt={props.description}/>
        <div className="content">
          <h3>{props.name}</h3>
          <p className="description">{props.description}</p>
          <p className="price">{props.price}</p>
        </div>
      </div>
    </li>
  );
};
export default MovieItemHTMLFav;