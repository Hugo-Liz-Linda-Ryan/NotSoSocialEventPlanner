import "./App.css";
import axios from "axios";
import { useState } from "react";
import ShowListing from "./components/ShowListing";
import "./API.css";

function API() {
  const [allListings, setAllListing] = useState([]);
  
  const today = new Date()
  // Returns "Mon Nov 29 2021 14:47:24 GMT-0500 (Eastern Standard Time)"
  const todayDayName = today.getDay()
  // gets today's weekday as a numerical value
  // Ex. Sunday=0, Monday=1, Tuesday=2 etc.
  const todayISODate = today.toISOString().substr(0,10)
  // Returns "2021-11-29"

  const endOfWeek = new Date(today)
  endOfWeek.setDate(endOfWeek.getDate()+7)
  const endOfWeekISODate = endOfWeek.toISOString().substr(0,10)

  
  const [showDate, setShowDate] = useState({todayISODate});


  function handleDateChange (e) {
    setShowDate(e.target.value)
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
    <div className="APISection">
      <h2>Select A Movie Section</h2>
      <div className="contentAPISectionContainer">
        <nav className="NavAids">
          <ul>
            <div className="selectShowDate">
              <label htmlFor="chooseDate">Choose show date:</label>
              <input 
                type="date" 
                id="chooseDate" 
                name="searchDate"
                value={showDate}
                min={todayISODate}
                max={endOfWeekISODate}
                onChange =  {handleDateChange}
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
                  genre={show._embedded.show.genre}
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
        </div>
      </div>
    </div>
  );
}

export default API;
