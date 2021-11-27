// NPM Modules
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

function MovieDetails() {
    const movieID = useParams()
    // console.log(movieID) console logs the endpoint of the URL (as an object with movieID in it), making it accessible to us
    // Holding presented date 
    const [date, setDate] = useState("2021-11-25")
    // Holding Country
    const [country, setCountry] = useState("US")

    const [individualMovie, setIndividualMovie] = useState({})

    useEffect(() => {
        axios({
            method: "GET",
            url: ` https://api.tvmaze.com/schedule/web`,
            responseType: "json",
            params: {
                date: `${date}`,
                country: `${country}`
            }
        }).then((response) => {
                console.log(response.data)
                console.log(response.data[0]._embedded.show)
                setIndividualMovie(response.data)
            })
    }, [movieID.movieID])



    return (
        <div className="expandedFilm">
            <div className="poster-image">
                <img src={individualMovie.image.original}
                    alt={`Movie poster for ${individualMovie.name}`}
                />
            </div>
            <div className="filmInfo">
                <div className="description">
                    <h2>{individualMovie.name}</h2>
                    <p>{individualMovie.summary}</p>
                </div>
                <div className="info">
                    <p>Genre: {individualMovie.genre}</p>
                    <p>Language: {individualMovie.language}</p>
                </div>
                <div className="dates">
                    <p>Runtime: {individualMovie.runtime}</p>
                    <p>Air date: {individualMovie.schedule.days}</p>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails;