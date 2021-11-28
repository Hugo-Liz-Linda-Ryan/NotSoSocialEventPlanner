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
            clickHandler={props.handleClick}
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