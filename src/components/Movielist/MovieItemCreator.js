import MovieItemHTML from './MovieAPIItem';
import MovieCollection from './MovieValueList';
import allListings from "../../App.js"
import ShowListing from '../ShowListing';

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
            clickHandler={props.handleClick}
        />));
        
    return (
    
        <div className="galleryImgs">
            <ul>
                {itemList}
            </ul>
        </div>
    );

//************************************************************ */


    // <ul className="filmList">
    // {/* Rendering products to the page */}
    //   {allListings.map((show) => {
    //     return (
    //         // console.log(show._embedded.show.image)
    //         // console.log(show._embedded.show.image.original)
    //       <ShowListing 
    //         key={show.id}
    //         name={show.name}
    //         genre={show._embedded.show.genre}
    //         runtime={show.runtime}
    //         image = {show._embedded.show.image}
    //         site={show.url}
    //         language={show._embedded.show.language}
    //         // schedule = {show.schedule.days}
    //         // time = {show.schedule.time}
    //         summary={show._embedded.show.summary}
    //         clickHandler={props.handleClick}
    //       />
    //     )
    //   })}

    // </ul>

};

export default MoviesList; 