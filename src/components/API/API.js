import "../../App.css";
import "./API.css";
import axios from "axios";
import { useState } from "react";
import ShowListing from "../ShowListing";
import FavouriteShowGallery from "../AddToFavourites/FavouriteShowGallery";

function API() {
  const [allListings, setAllListing] = useState([]);
  const [genreChoice, setGenreChoice] = useState("placeholder");
  const [selectedItems, setSelectedItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [currentGenreSearch, setCurrentGenreSearch] = useState(false);
  const [originalListing, setOriginalListing] = useState([]);

  const addToShowGallery = (id) => {
    // Pushes the id parameter into  an array and returns the object with the matching ID from the allListings state
    const ids = [];
    ids.push(id);
    let filteredArray = allListings.filter((showObject) => {
      return ids.includes(showObject.id)
    });
    setSelectedItems([...selectedItems, ...filteredArray]);
  }

  // empties out "favourites" section by removing everything in state
  const remove = () => {
    selectedItems.shift();
    setSelectedItems([...selectedItems]);
  }

  const today = new Date()
  // Returns in format "Mon Nov 29 2021 14:47:24 GMT-0500 (Eastern Standard Time)"
  const timeOffset = today.getTimezoneOffset() * 50000;
  //offset in milliseconds
  const localISODate = (new Date(Date.now() - timeOffset)).toISOString().substr(0, 10);
  // Returns format "YYYY-MM-DD"
  const [showDate, setShowDate] = useState(localISODate);

  function handleDateChange(e) {
    setShowDate(e.target.value);
  }

  function handleGenreChoice(e) {
    setGenreChoice(e.target.value);
  }

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
      setCurrentGenreSearch(true)
    }
    setAllListing(filteredShows)
  }

  function clearFilter() {
    setAllListing(originalListing);
  }

  function searchByDate() {
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
  }
  
  return (
    <div className="contentAPISectionContainer">
      <h2>Don't want to make any plans? </h2>
      <h2>Find a show to watch instead!</h2>

      <div className="favouritesGallery">
          <button className="removeFavourites" onClick={remove}>Remove First Added</button>
          <FavouriteShowGallery
            className="lookbookGallery"
            selectedItems={selectedItems}
          />
      </div>
      <div className="APISection">
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
            <button onClick={searchByDate}>Search by date</button>
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
              <button className="genreFilterButton" type="submit">Genre Filter!</button>
            </form>
            <button className="clearResults" onClick={clearFilter}>Clear Filter</button>

            {/* render to the page the user's current genre search*/}
            {currentGenreSearch === true
              ?
              <div>
                <p>You're currently searching for: {genreChoice}</p>
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
                  summary={show._embedded.show.summary}
                  clickHandler={addToShowGallery}
                />
              );
            })}
          </ul>
          {/* if there are no results from the genre filter, render error message to the page */}
          {errorMessage === true
            ? <p>Sorry, looks like there's nothing to watch. Try another genre!</p>
            : null}
        </div>
      </div>
    </div>
  );
}

export default API;