import { useState } from 'react';
import ExtraDetails from './ExtraDetails';

const Watchlist = (props) => {
    const chosenArray = props.watchlist;

    const [descOpen, setDescOpen] = useState(false);

    // Toggles the descOpen from true to false or vice versa every time the button is clicked
    const toggleShowDesc = () => {
        setDescOpen(!descOpen);
    }
    
    return (
        <div className="favourites">
            <h3>Your Watchlist</h3>
            <ul className ="favouritesList">
                {
                    chosenArray.map((props) => {
                        return (
                            <>
                            <li key={Math.random()} className="descContainer product">
                                <h4 className="airdate">{props.airdate}</h4>
                                <div className="image">
                                    <img src={props._embedded.show.image ? props._embedded.show.image.original : null} alt={`Poster of ${props._embedded.show.name}`} />
                                </div>
                                <div className="info content">
                                    <h3 className="showName">{props._embedded.show.name}</h3>
                                    <p className="episodeName">Episode: {props.name}</p>
                                    <p className="showRuntime">{props.runtime ? `Runtime: ${props.runtime} minutes` : null}</p>
                                    {/* if there is a genre associated with the show, render the genre(s); if not, display nothing */}
                                    {props._embedded.show.genres.length > 0
                                        ? <p className="showGenre">Genre: {props._embedded.show.genres.join(", ")}</p>
                                        : null}
                                    <button className="faveDesc"
                                        onClick={toggleShowDesc}>More information</button>
                                </div>
                            </li>
                
                            {/* if descOpen is true, show the expanded info */}
                            {descOpen ?
                                <ExtraDetails content={
                                    <>
                                        <div className="expandedShow">
                                            <div className="expandedImage">
                                                <img src={props._embedded.show.image ? props._embedded.show.image.original : null}
                                                    alt={`Poster for ${props._embedded.show.name}`} />
                                            </div>
                                            <div className="showInfo">
                                                <div className="shoInfoWrapper">
                                                    <h3>{props._embedded.show.name}</h3>
                                                    <p className="episodeName">Episode: {props.name}</p>
                                                    <h3 className="expandedSumTitle">Summary</h3>
                                                    {/* Received text in props._embedded.show.summary is in HTML format, can't remove the tags from text */}
                                                    <p className="summaryDesc">{props._embedded.show.summary.replace(/(<([^>]+)>)/gi, "")}</p>
                                                    {props._embedded.show.genres.length > 0
                                                        ? <p className="showGenre">Genre: {props._embedded.show.genres.join(", ")}</p>
                                                        : null}
                                                    <p>Language: {props._embedded.show.language}</p>
                                                    <p>{props.runtime ? `Runtime: ${props.runtime} minutes` : null}</p>
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
                        )
                    })
                }
            </ul> {/* /favouritesList  */}
        </div>   // favourites
    );
};

export default Watchlist;