import ShowItem from './ShowItem';

const FavouriteShowGallery = (props) => {
    console.log(props.selectedItems);
    const chosenArray = props.selectedItems;


    return (
        <div className="favourites">
            <h3>Your Favourites</h3>
            <ul className ="favouritesList">
                {
                    chosenArray.map((show) => {
                        return (

                            // 🚨🚨🚨🚨 Why is this returning with a add faves button?
                            <ShowItem
                                key={show.id}
                                id={show.id}
                                name={show._embedded.show.name}
                                episodeName={show.name}
                                genre={show._embedded.show.genres}
                                runtime={show.runtime}
                                image={show._embedded.show.image}
                                site={show.url}
                                schedule = {show.airdate}
                                language={show._embedded.show.language}
                                // schedule = {show.schedule.days}
                                // time = {show.schedule.time}
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