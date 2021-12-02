// NPM Modules
import { useState } from 'react';
import ExtraDetails from '../ExtraDetails';

function ShowItem(props) {

    const [descOpen, setDescOpen] = useState(false);

    // Toggles the descOpen from true to false or vice versa every time the button is clicked
    const toggleShowDesc = () => {
        setDescOpen(!descOpen);
    }

    return (
        <>
            <li key={props.key} className="descContainer product">
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
                    {/* 🚨 change onClick from button to div*/}
                        <button className="faveDesc"
                            onClick={toggleShowDesc}>More information</button>
                </div>
            </li>

            {/* if descOpen is true, show the expanded info */}
            {descOpen ?
                <ExtraDetails content={
                    <>
                        <div className="expandedShow">
                            <div className="topExpanded">
                                <div className="expandedImage">
                                    <img src={props.image ? props.image.original : null}
                                        alt={`Poster for ${props.name}`}
                                    />
                                </div>
                                <div className="description">
                                    <h3>{props.name}</h3>
                                    <p className="episodeName">Episode: {props.episodeName}</p>
                                    {props.genre.length > 0
                                        ? <p className="showGenre">Genre: {props.genre.join(", ")}</p>
                                        : null}

                                </div>
                            </div>

                            <div className="showInfo">
                                <div className="info">
                                    <h3 className="expandedSumTitle">Summary</h3>
                                    <p>{props.summary}</p>
                                    <p>Language: {props.language}</p>
                                </div>
                                <div className="dates">
                                    <p>{props.runtime ? `Runtime:${props.runtime} minutes` : null}</p>
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


export default ShowItem;


