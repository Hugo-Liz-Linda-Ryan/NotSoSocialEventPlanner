// NPM Modules
import { useState } from 'react';
import ExtraDetails from './ExtraDetails';

function ShowListing( props ) {

    const [descOpen, setDescOpen] = useState(false);

    // Toggles the descOpen from true to false or vice versa every time the button is clicked
    const toggleShowDesc = () => {
        setDescOpen(!descOpen);
    }

    return (
            
        <li key={props.key}>
            <div className="showContainer product">
                <div className="image">

                    <img src={props.image ? props.image.original:null} alt={`Poster of ${props.name}`} />

                </div>
                <div className="info content">
                    <h3 className="showName">{props.name}</h3>
                    <p className="episodeName">{props.episodeName}</p>
                    <p className="showRuntime">Runtime: {props.runtime} minutes</p>
                    {/* 🚨🚨🚨 This conditional does not work, will need to find alternative */}
                    <p className="showGenre">Genre: {props.genre ? props.genre: "No genre listed"}</p>
                    {/* 🚨 change onClick from button to div*/}
                    <button className="showDesc"
                        onClick={toggleShowDesc}>More information</button>
                    <button onClick={() => props.clickHandler(props.id)}>Click to Add to Favourites</button>
                </div>
            </div>

            {/* if descOpen is true, show the expanded info */}
            {descOpen ?
                <ExtraDetails content={
                    <>
                        <div className="expandedShow">
                            <div className="poster-image">

                                <img src={props.image ? props.image.original:null}
                                    alt={`Movie poster for ${props.name}`}
                                />

                            </div>
                            <div className="filmInfo">
                                <div className="description">
                                    <h2>{props.name}</h2>
                                    <p className="episodeName">{props.episodeName}</p>
                                    <p>{props.summary}</p>
                                </div>
                                <div className="info">
                                    <p>Genre: {props.genre? props.genre: "No genre listed"}</p>
                                    <p>Language: {props.language}</p>
                                </div>
                                <div className="dates">
                                    <p>Runtime: {props.runtime}</p>
                                </div>
                            </div>
                        </div>
                    </>
                }
                    handleClose={toggleShowDesc}
                />
                : null // basically show nothing if it isn't clicked
            }

        </li>
    )
}

export default ShowListing;


