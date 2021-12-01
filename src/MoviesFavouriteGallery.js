import ExtraDetails from './components/ExtraDetails';
import MovieItemHTMLFav from './MoviesFavouriteGallery';
import { useState } from 'react';
import ShowItem from './components/ShowListing';

const MoviesFavouriteGallery = (props) => {
    console.log(props.selectedItems);
    const chosenArray = props.selectedItems;
    const [descOpen, setDescOpen] = useState(false);

    const toggleShowDesc = () => {
        setDescOpen(!descOpen);
    }

    return (
        <div className="lookbookpage">
            <h3>Your Favourites</h3>
            <ul>

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

export default MoviesFavouriteGallery;