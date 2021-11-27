
function ShowFilm(props) {
 
    return (
        <div className="movieContainer" key={props.key}>
            <div className="image">
                <img src={props.image} alt={`Poster of ${props.name}`} />
            </div>
            <div className="info">
                <h3 className="showName">{props.name}</h3>
                <p className="showRuntime">Runtime: {props.runtime} minutes</p>
                <p className="showGenre">Genre: {props.genre}</p>
                
            </div>


        </div>

    )
}



