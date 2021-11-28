import MovieItemHTMLFav from './MoviesFavouriteGallery';

const MoviesFavouriteGallery = (props) => {
    

    return (
        <div className="lookbookpage">
            <div className="h2container">
            <h2>Your Favourites Collection</h2>
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

