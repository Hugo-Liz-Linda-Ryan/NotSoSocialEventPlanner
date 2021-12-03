import ShowItem from './ShowItem';

const FavouriteShowGallery = (props) => {
    const chosenArray = props.selectedItems;

    return (
        <div className="favourites">
            <h3>Your Watchlist</h3>
            <ul className ="favouritesList">
                {
                    chosenArray.map((show) => {
                        return (
                            <ShowItem
                                key={show.id}
                                id={show.id}
                                name={show._embedded.show.name}
                                episodeName={show.name}
                                genre={show._embedded.show.genres}
                                runtime={show.runtime}
                                image={show._embedded.show.image}
                                site={show.url}
                                airdate = {show.airdate}
                                language={show._embedded.show.language}
                                summary={show._embedded.show.summary}
                            />

                        )
                    })
                }

            </ul>
        </div>
    );
};

export default FavouriteShowGallery;