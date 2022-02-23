import { useState } from 'react';
import ExtraDetails from './ExtraDetails';
import firebase from 'firebase';

const Watchlist = (watchlistArr) => {
    const [descOpen, setDescOpen] = useState(false);

    const chosenArray = watchlistArr.watchlist;
    // Toggles the descOpen from true to false or vice versa every time the button is clicked
    const toggleShowDesc = (e) => {
        setDescOpen(!descOpen);
        console.log("chosenArr", chosenArray)

        // const index = [...el.parentElement.children].indexOf(el)

        // console.log(e)
        // console.log(...chosenArray)
    }

    // this function takes an argument, which is the ID of the item we want to remove
    const removeShow = (showID) => {
        const dbRef = firebase.database().ref('Watchlist');
        dbRef.child(showID).remove();
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
                                        {props.name._embedded.show.genres.length > 0
                                            ? <p className="showGenre">Genre: {props.name._embedded.show.genres.join(", ")}</p>
                                            : null}
                                        <button className="faveDesc"
                                                onClick={toggleShowDesc}>More information
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
                                                    <img src={props.name._embedded.show.image ? props.name._embedded.show.image.original : null}
                                                        alt={`Poster for ${props.name._embedded.show.name}`} />
                                                </div>
                                                <div className="showInfo">
                                                    <div className="shoInfoWrapper">
                                                        <h3>{props.name._embedded.show.name}</h3>
                                                        <p className="episodeName">Episode: {props.name.name}</p>
                                                        <h3 className="expandedSumTitle">Summary</h3>
                                                        <p className="summaryDesc">{props.name._embedded.show.summary.replace(/(<([^>]+)>)/gi, "")}</p>
                                                        {props.name._embedded.show.genres.length > 0
                                                            ? <p className="showGenre">Genre: {props.name._embedded.show.genres.join(", ")}</p>
                                                            : null}
                                                        <p>Language: {props.name._embedded.show.language}</p>
                                                        <p>{props.name.runtime ? `Runtime: ${props.name.runtime} minutes` : null}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }
                                        handleClose={toggleShowDesc}
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