import { useState } from 'react';
import ExtraDetails from './ExtraDetails';
import "../stylesheets/ShowListing.css"

function ShowListing(props) {

    const [descOpen, setDescOpen] = useState(false);

    // Toggles the descOpen from true to false or vice versa every time the button is clicked
    const toggleShowDesc = () => {
        setDescOpen(!descOpen);
    }

    return (
        <>
            <li key={Math.random()} className="showContainer product">
                <div className="image">
                    <img src={props.image ? props.image.original : null} alt={`Poster of ${props.name}`} />
                </div>
                <div className="info content">
                    <h3 className="showName">{props.name}</h3>
                    <p className="episodeName">Episode: {props.episodeName}</p>
                    <p className="showRuntime">{props.runtime ? `Runtime: ${props.runtime} minutes` : null}</p>
                    {/* if there is a genre associated with the show, render the genre(s); if not, display nothing */}
                    {props.genre.length > 0
                        ? <p className="showGenre">Genre: {props.genre.join(", ")}</p>
                        : null}
                    
                    <div className="showButtons">
                        <button className="showDesc"
                            onClick={toggleShowDesc}>More information</button>
                        <button onClick={() => props.clickHandler(props.id)}>Add to Watchlist</button>
                    </div>
                </div>
            </li>

            {/* if descOpen is true, show the expanded info */}
            {descOpen ?
                <ExtraDetails content={
                    <>
                        <div className="expandedShow">
                            <div className="expandedImage">
                                <img src={props.image ? props.image.original : null}
                                    alt={`Poster for ${props.name}`}
                                />
                            </div>
                            <div className="showInfo">
                                <div className="shoInfoWrapper">
                                    <h3>{props.name}</h3>
                                    <p className="episodeName">Episode: {props.episodeName}</p>
                                    <h3 className="expandedSumTitle">Summary</h3>
                                    
                                    {/* Received text in props.summary is in HTML format, can't remove the tags from text */}
                                    <p className="summaryDesc">{props.summary}</p>
                                    {props.genre.length > 0
                                        ? <p className="showGenre">Genre: {props.genre.join(", ")}</p>
                                        : null}
                                    <p>Language: {props.language}</p>
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
}

export default ShowListing;