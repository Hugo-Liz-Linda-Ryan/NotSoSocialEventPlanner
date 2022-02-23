import { useState } from 'react';
import ExtraDetails from './ExtraDetails';
import firebase from 'firebase';

const Watchlist = (watchlistArr) => {
    const [descOpen, setDescOpen] = useState(false);
    const [descItem, setDescItem] = useState("");


    // Making the general reference to the firebase watchlist
    const watchlistDbRef = firebase.database().ref('Watchlist');

    const chosenArray = watchlistArr.watchlist;
    // Toggles the descOpen from true to false or vice versa every time the button is clicked
    const toggleShowDesc = (show) => {
        setDescItem(show.name)
        setDescOpen(!descOpen);
    }

    const closeDesc = () => {
        setDescOpen(false);
    }

    // this function takes an argument, which is the ID of the item we want to remove
    const removeShow = (showID) => {
        watchlistDbRef.child(showID).remove();
    }


    return (
        <div className="favourites">
            <h3>Your Watchlist</h3>
            <ul className="favouritesList">
                {
                    chosenArray.map((props) => {
                        return (
                            <>
                                <li key={Math.random()} className="descContainer product">
                                    <h4 className="airdate">{props.name.airdate}</h4>
                                    <div className="image">
                                        <img src={props.name._embedded.show.image ? props.name._embedded.show.image.original : null} alt={`Poster of ${props.name._embedded.show.name}`} />
                                    </div>
                                    <div className="info content">
                                        <h3 className="showName">{props.name._embedded.show.name}</h3>
                                        <p className="episodeName">Episode: {props.name.name}</p>
                                        <p className="showRuntime">{props.name.runtime ? `Runtime: ${props.name.runtime} minutes` : null}</p>
                                        {/* if there is a genre associated with the show, render the genre(s); if not, display nothing */}
                                        {props.name._embedded.show.genres
                                            ? <p className="showGenre">Genre: {props.name._embedded.show.genres.join(", ")}</p>
                                            : null}
                                        <button className="faveDesc"
                                            onClick={() => toggleShowDesc(props)}>More information
                                        </button>
                                        <button className="faveDesc"
                                            onClick={() => removeShow(props.key)}>Remove
                                        </button>
                                    </div>
                                </li>

                                {/* if descOpen is true, show the expanded info */}
                                {descOpen ?
                                    <ExtraDetails content={
                                        <>
                                            <div className="expandedShow">
                                                <div className="expandedImage">
                                                    <img src={descItem._embedded.show.image ? descItem._embedded.show.image.original : null}
                                                        alt={`Poster for ${descItem._embedded.show.name}`} />
                                                </div> {/* /expandedImage  */}
                                                <div className="showInfo">
                                                    <div className="showInfoWrapper">
                                                        <h3>{descItem._embedded.show.name}</h3>
                                                        <p className="episodeName">Episode: {descItem.name}</p>
                                                        <h3 className="expandedSumTitle">Summary</h3>
                                                        <p className="summaryDesc">{descItem._embedded.show.summary.replace(/(<([^>]+)>)/gi, "")}</p>
                                                        {descItem._embedded.show.genres
                                                            ? <p className="showGenre">Genre: {descItem._embedded.show.genres.join(", ")}</p>
                                                            : null}
                                                        <p>Language: {descItem._embedded.show.language}</p>
                                                        <p>{descItem.runtime ? `Runtime: ${descItem.runtime} minutes` : null}</p>
                                                    </div> {/* /showInfoWrapper  */}
                                                </div> {/* /showInfo  */}
                                            </div> {/* /expandedShow  */}
                                        </>
                                    }
                                        handleClose={closeDesc}
                                    />
                                    : null // basically show nothing if it isn't clicked
                                }
                            </>
                        ) // /return
                    }) // chosenArray.map
                }
            </ul> {/* /favouritesList  */}
        </div>   // favourites
    );
};

export default Watchlist;