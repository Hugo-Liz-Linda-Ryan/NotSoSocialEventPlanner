import "../stylesheets/App.css";
import "../stylesheets/GetMovies.css"
import axios from "axios";
import { useState, useEffect } from "react";
import ShowListing from "./ShowListing";
import Watchlist from "./Watchlist";
import firebase from './firebase';

// Component makes API call and holds FavouritesList component (saved movies) and the ShowListing component (shows results)
function GetMovies() {
  const [allListings, setAllListing] = useState([]);
  const [genreChoice, setGenreChoice] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [watchlistClassActive, setWatchlistClassActive] = useState(true);
  const [watchlistOpen, setWatchlistOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [currentGenreSearch, setCurrentGenreSearch] = useState(false);
  const [originalListing, setOriginalListing] = useState([]);
  // Preparing for showDate useState
  const today = new Date()
  // Returns in format "Mon Nov 29 2021 14:47:24 GMT-0500 (Eastern Standard Time)"
  const timeOffset = today.getTimezoneOffset() * 50000;
  //offset in milliseconds
  const localISODate = (new Date(Date.now() - timeOffset)).toISOString().substr(0, 10);
  // Returns format "YYYY-MM-DD"
  const [showDate, setShowDate] = useState(localISODate);

  // Function searches tvMaze API using axios
  useEffect(() => {
    let country = "US";
    axios({
      method: "GET",
      url: `https://api.tvmaze.com/schedule/web`,
      responseType: "json",
      params: {
        country: `${country}`,
        date: `${showDate}`,
      },
    }).then((response) => {
      setAllListing(response.data);
      setOriginalListing(response.data);
    });
  }, [showDate])


  // stores selected date
  function handleDateChange(e) {
    setShowDate(e.target.value);
  }

  // Stores selected genre
  function handleGenreChoice(e) {
    console.log(e.target.value)
    setGenreChoice(e.target.value);
  }
  
  // Function filters search results by genre
  function filterByGenre(e, genreChoice) {
    e.preventDefault()
    const copyOfListings = [...allListings];
    const filteredShows = copyOfListings.filter(show => show._embedded.show.genres.some((g) => g === genreChoice))

    // error handling: if there are no results from the genre filter
    if (filteredShows.length === 0) {
      setErrorMessage(true)
    }

    // if the genre filter is running, display what genre the user is currently searching for
    if (genreChoice) {
      setCurrentGenreSearch(genreChoice)
    }
    setAllListing(filteredShows)
  }

  // Clears the genre filter from the search
  function clearFilter() {
    setErrorMessage(false)
    setGenreChoice("")
    setAllListing(originalListing);
  }


  // useEffect for watchlist
  useEffect(() => {
    // variable that refers to database
    const watchlistDbRef = firebase.database().ref('Watchlist');
    // event listener to get our data from the database ('response')
    watchlistDbRef.on('value', (response) => {
      // variable to store the new state
      const newWatchlist = [];
      // store the response from Firebase inside of a variable
      const data = response.val();
      for (let key in data) {
        // push each item to an array 
        newWatchlist.push({ key: key, name: data[key] });
      }
      // Only displays the last 10 events submitted to the calendar
      setWatchlist(newWatchlist)
    })
  }, [])


  // Adds the selected show to the watchlist
  const addToWatchlist = (id) => {
    // Pushes the id parameter into  an array and returns the object with the matching ID from the allListings state
    const ids = [];
    ids.push(id);
    let filteredArray = allListings.filter((showObject) => {
      return ids.includes(showObject.id)
    });

    // make a reference to firebase
    const watchlistDbRef = firebase.database().ref('Watchlist');
    // pushes the selected item into the firebase array
    watchlistDbRef.push(...filteredArray)
  }


  // Opens the watchlist and toggles the class
  const toggleWatchlist = () => {
    setWatchlistOpen(!watchlistOpen)
    setWatchlistClassActive(!watchlistClassActive)

  }


  return (
    <section className="apiResponse">
      <h2>Don't want to make any plans? </h2>
      <h2>Find a show to watch instead!</h2>
      {/* Setting a ternary conditional to hide watchlist section if there are no items in it */}
      {watchlist.length > 0 ?
        <>
          <button
            className={watchlistClassActive ? "watchlistButton watchlist" : "toggledWatchlistButton watchlist"}
            onClick={toggleWatchlist}>
            {watchlistOpen ?
              "Close Watchlist"
              : "Open Watchlist"
            }
          </button>
          {watchlistOpen ?
            <div className="watchlist">
              <Watchlist
                watchlist={watchlist}
              />
            </div>
            : null
          }
        </>
        : null
      }
      <div className="apiShows">
        <nav className="showNav">

          <div className="selectShowDate">
            <label htmlFor="chooseDate">Choose show date:</label>
            <input
              className="dateSearch"
              type="date"
              id="chooseDate"
              name="searchDate"
              value={showDate}
              min={localISODate}
              onChange={handleDateChange}
            />
          </div>

          <div className="genreFilter">
            {/* Genre filter */}
            <form onSubmit={(e) => { filterByGenre(e, genreChoice) }} className="genreFilter">
              <label htmlFor="genreList">Please select which genre to filter by:</label>
              <select
                className="genreListSelect"
                name="genreList"
                id="genreList"
                value={genreChoice}
                onChange={handleGenreChoice}
              >

                <option value="" disabled >Pick a genre:</option>
                <option value="Action">Action</option>
                <option value="Anime">Anime</option>
                <option value="Adventure">Adventure</option>
                <option value="Children">Children</option>
                <option value="Comedy">Comedy</option>
                <option value="Crime">Crime</option>
                <option value="Drama">Drama</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Food">Food</option>
                <option value="Music">Music</option>
                <option value="Mystery">Mystery</option>
                <option value="Romance">Romance</option>
                <option value="Science-Fiction">Science-Fiction</option>
                <option value="Sports">Sports</option>
                <option value="Supernatural">Supernatural</option>
                <option value="Thriller">Thriller</option>
                <option value="Travel">Travel</option>
              </select>
              <button className="genreFilterButton" type="submit">Filter by genre</button>
            </form>
            <button className="clearResults" onClick={clearFilter}>Clear Filter</button>

            {/* render to the page the user's current genre search*/}
            {currentGenreSearch ?
              <div>
                <p>You're currently searching for: {currentGenreSearch}</p>
              </div>
              : null}
          </div>
        </nav>

        <div className="showGallery">
          <ul className="showList">
            {allListings.map((show) => {
              return (
                <ShowListing
                  key={show.id}
                  id={show.id}
                  name={show._embedded.show.name}
                  episodeName={show.name}
                  genre={show._embedded.show.genres}
                  runtime={show.runtime}
                  image={show._embedded.show.image}
                  site={show.url}
                  language={show._embedded.show.language}
                  // summaries come with HTML tags included, removing them before passing through as component
                  summary={show._embedded.show.summary.replace(/(<([^>]+)>)/gi, "")}
                  clickHandler={addToWatchlist}
                />
              );
            })}
          </ul>
          {/* if there are no results from the genre filter, render error message to the page */}
          {errorMessage
            ? <p>Sorry, looks like there's nothing to watch. Try another genre!</p>
            : null}
        </div>
      </div>
    </section>
  );
}

export default GetMovies;