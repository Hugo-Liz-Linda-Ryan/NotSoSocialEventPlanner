import "../../App.css";
import axios from "axios";
import { useState } from "react";
import ShowListing from "../ShowListing";
import "./API.css";
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
    console.log(selectedItems);
    selectedItems.shift();
    setSelectedItems([...selectedItems]);
  }



  const today = new Date()
  // Returns "Mon Nov 29 2021 14:47:24 GMT-0500 (Eastern Standard Time)"
  // const todayDayName = today.getDay()
  // gets today's weekday as a numerical value
  // Ex. Sunday=0, Monday=1, Tuesday=2 etc.
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
    console.log(genreChoice)
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
      url: ` https://api.tvmaze.com/schedule/web`,
      responseType: "json",
      params: {
        country: `${country}`,
        date: `${showDate}`,
      },
    }).then((response) => {
      setAllListing(response.data);
      setOriginalListing(response.data);
      console.log(response.data)

    });
  }

  function USSearch() {
    const userchoice1 = document.getElementById("us").value;
    let country = userchoice1;
    let date = "";

    axios({
      method: "GET",
      url: ` https://api.tvmaze.com/schedule/web`,
      responseType: "json",
      params: {
        country: `${country}`,
        date: `${date}`,
      },
    }).then((response) => {
      setAllListing(response.data);
      setOriginalListing(response.data);
    });
  }

  function All() {
    axios({
      method: "GET",
      url: ` https://api.tvmaze.com/schedule/web`,
      responseType: "json",
      params: {},
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
          <button className="removeFavourites" onClick={remove}>Remove Favourites</button>
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
              {/* <form action="submit"> */}
              <label htmlFor="genreList">Please select which genre to filter by:</label>
              <select
                className="genreListSelect"
                name="genreList"
                id="genreList"
                value={genreChoice}
                onChange={handleGenreChoice}
              >

                {/* We need to clear the genre choice value before another one is selected!! */}
                <option value="" disabled >Pick a genre:</option>
                <option value="Action">Action</option>
                <option value="Anime">Anime</option>
                <option value="Adventure">Adventure</option>
                <option value="Children">Children</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Food">Food</option>
                <option value="Music"> Music</option>
                <option value="Romance">Romance</option>
                <option value="Supernatural">Supernatural</option>
                <option value="Thriller">Thriller</option>
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
          {/* </ genreFilter> */}

          <p className ="openButton">Other Search Methods:</p>
          <button className ="openButton" onClick={USSearch}>All U.S. Shows</button>
          <button className ="openButton" onClick={All}>International</button>
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
                  // time = {show.schedule.time}
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