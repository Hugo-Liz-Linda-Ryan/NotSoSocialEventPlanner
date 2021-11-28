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
                    <img src={props.image} alt={`Poster of ${props.name}`} />
                    {/* <img src={null} alt={`Poster of ${props.name}`} /> */}
                </div>
                <div className="info content">
                    <h3 className="showName">{props.name}</h3>
                    <p className="showRuntime">Runtime: {props.runtime} minutes</p>
                    <p className="showGenre">Genre: {props.genre}</p>
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
                                <img src={props.image}
                                    alt={`Movie poster for ${props.name}`}
                                />
                            </div>
                            <div className="filmInfo">
                                <div className="description">
                                    <h2>{props.name}</h2>
                                    <p>{props.summary}</p>
                                </div>
                                <div className="info">
                                    <p>Genre: {props.genre}</p>
                                    <p>Language: {props.language}</p>
                                </div>
                                <div className="dates">
                                    <p>Runtime: {props.runtime}</p>
<<<<<<< HEAD
                                    <p>Air date: {props.schedule}</p> 
                                 <p>Air time: {props.time}</p>
                                 </div>
=======
                                    {/* <p>Air date: {props.schedule}</p> */}
                                    {/* <p>Air time: {props.time}</p> */}
                                </div>
>>>>>>> main
                            </div>
                        </div>
                    </>
                }
                    handleClose={toggleShowDesc}
                />
                : null // basically show nothing if it isn't clicked
<<<<<<< HEAD
            }  
=======
            }
>>>>>>> main

        </li>
    )
}

<<<<<<< HEAD
export default ShowListing;
=======
export default ShowListing;


>>>>>>> main
