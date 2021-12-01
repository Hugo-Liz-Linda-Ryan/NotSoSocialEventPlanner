// import {useState} from "react";
import "./calendar.css"
import { useState } from "react";
import axios from "axios";

function Calendar() {


  const [allListings, setAllListing] = useState([]);
  const [genreChoice, setGenreChoice] = useState("placeholder");
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

    // 🚨🚨🚨 need to add error handling for blank, also switching filters
    // 🚨🚨🚨 also need to add "current filter" display
    // setFilteredShows(filteredShows)
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


  // const [todayDate, setTodayDate] = useState("")
  // const [thisWeek, setThisWeek] = useState([])

  // const weekArray = []

  // goes to Wednesday again as it iterates +7 to the array, on Saturday going to array[14]
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  const todayDayName = today.getDay()
  // gets today's weekday as a numerical value
  // Ex. Sunday=0, Monday=1, Tuesday=2 etc.
  const todayISODate = today.toISOString().substr(0, 10)
  // Returns "2021-11-29"


  const day02 = new Date(today)
  day02.setDate(day02.getDate() + 1)
  const day02ISODate = day02.toISOString().substr(0, 10)

  const day03 = new Date(day02)
  day03.setDate(day03.getDate() + 1)
  const day03ISODate = day03.toISOString().substr(0, 10)

  const day04 = new Date(day03)
  day04.setDate(day04.getDate() + 1)
  const day04ISODate = day04.toISOString().substr(0, 10)

  const day05 = new Date(day04)
  day05.setDate(day05.getDate() + 1)
  const day05ISODate = day05.toISOString().substr(0, 10)

  const day06 = new Date(day05)
  day06.setDate(day06.getDate() + 1)
  const day06ISODate = day06.toISOString().substr(0, 10)

  const day07 = new Date(day06)
  day07.setDate(day07.getDate() + 1)
  const day07ISODate = day07.toISOString().substr(0, 10)


  return (
    <>
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

      <div className="calendar">
        <div className="day">
          <h2 className="dayName">{weekdays[todayDayName]}</h2>
          <p className="date">{todayISODate}</p>
        </div>
        <div className="day">
          <h2 className="dayName">{weekdays[todayDayName + 1]}</h2>
          <p className="date">{day02ISODate}</p>
        </div>
        <div className="day">
          <h2 className="dayName">{weekdays[todayDayName + 2]}</h2>
          <p className="date">{day03ISODate}</p>
        </div>
        <div className="day">
          <h2 className="dayName">{weekdays[todayDayName + 3]}</h2>
          <p className="date">{day04ISODate}</p>
        </div>
        <div className="day">
          <h2 className="dayName">{weekdays[todayDayName + 4]}</h2>
          <p className="date">{day05ISODate}</p>
        </div>
        <div className="day">
          <h2 className="dayName">{weekdays[todayDayName + 5]}</h2>
          <p className="date">{day06ISODate}</p>
        </div>
        <div className="day">
          <h2 className="dayName">{weekdays[todayDayName + 6]}</h2>
          <p className="date">{day07ISODate}</p>
        </div>
      </div>
    </>
  )
}

export default Calendar;



