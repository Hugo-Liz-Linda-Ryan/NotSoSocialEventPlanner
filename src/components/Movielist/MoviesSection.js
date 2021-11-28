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
                <div className="aboutTitlePage">
                    <div className="aboutParagraph">
                        <p>This App was created by My Mom gay and ur Dad Lesbain</p>
                    </div>
                    <div className="Gallery">
                        <h2>Lol No</h2>
                    </div>
                </div> 
                <MoviesFavouriteGallery className="lookbookGallery" chosenItems={selectedItems} />
                <button onClick={remove}>loooll</button>
            </div>
        </section>
    );
};

export default MovieSection; 

