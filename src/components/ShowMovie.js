// NPM Modules
import { Link } from "react-router-dom"


function ShowFilm({ movies }) {

    return (
        <ul className="filmList">
            {
                movies.map((props) => {
                    return (
                        <li key={props.key}>
                            <Link>
                            <div className="movieContainer">
                                <div className="image">
                                    <img src={props.image} alt={`Poster of ${props.name}`} />
                                </div>
                                <div className="info">
                                    <h3 className="showName">{props.name}</h3>
                                    <p className="showRuntime">Runtime: {props.runtime} minutes</p>
                                    <p className="showGenre">Genre: {props.genre}</p>
                                </div>
                            </div>
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}




