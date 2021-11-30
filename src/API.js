import "./App.css";
import axios from "axios";
import { useState } from "react";
import ShowListing from "./components/ShowListing";
import "./API.css";

function API() {
  const [allListings, setAllListing] = useState([]);
  const [genreChoice, setGenreChoice] = useState("placeholder");
  const [errorMessage, setErrorMessage] = useState(false);
  const [currentGenreSearch, setCurrentGenreSearch] = useState(false);
  // const [filteredShows, setFilteredShows] = useState([]);



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

  const endOfWeek = new Date(today)
  endOfWeek.setDate(endOfWeek.getDate() + 7)
  const endOfWeekISODate = endOfWeek.toISOString().substr(0, 10)


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

    // setFilteredShows(filteredShows)

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
    });
  }


  function hello() {
    let country = "";
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
    });
  }

  function lolo() {
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
    });
  }


  return (

    <div className="contentAPISectionContainer">

      {/* Genre filter */}
        <form onSubmit={(e) => {filterByGenre(e,genreChoice)}} className="genreFilter">
          <label htmlFor="genreList">Please select which genre to filter by:</label>
          <select 
            name="genreList" 
            id="genreList"
            value = {genreChoice}
            onChange = {handleGenreChoice}
          >
            <option value="placeholder" disabled>Pick a genre:</option>
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
          <button type="submit">Genre Filter!</button>
        </form>

      {/* render to the page the user's current genre search*/}
        {currentGenreSearch === true
        ?
        <div>
          <p>You're currently searching for: {genreChoice}</p>
        </div>
        : null}
        
      <div className="APISection">

        {/* <h2>Select A Movie Section</h2> */}
        <nav className="NavAids">
          <ul>
            <div className="selectShowDate">
              <label htmlFor="chooseDate">Choose show date:</label>
              <input
                type="date"
                id="chooseDate"
                name="searchDate"
                value={showDate}
                min={localISODate}
                max={endOfWeekISODate}
                onChange={handleDateChange}
              />
              <button onClick={searchByDate}>Search by date</button>
            </div>

            <button id="us" onClick={hello} value="US">All Movies In All Countries/Date</button>
            <button onClick={lolo}>All Movies in U.S/Date</button>
            <button onClick={All}>No Params</button>
            <button onClick={hello}>Same As First</button>
            <button onClick={hello}>Same As First</button>
          </ul>
        </nav>

        <div className="MovieGallery">
          <ul className="filmList">
            {allListings.map((show) => {
              return (
                <ShowListing
                  key={show.id}
                  name={show._embedded.show.name}
                  episodeName={show.name}
                  genre={show._embedded.show.genres}
                  runtime={show.runtime}
                  image={show._embedded.show.image}
                  site={show.url}
                  language={show._embedded.show.language}
                  // schedule = {show.schedule.days}
                  // time = {show.schedule.time}
                  summary={show._embedded.show.summary}
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
