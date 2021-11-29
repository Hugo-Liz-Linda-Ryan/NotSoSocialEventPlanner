import "./App.css";
import axios from "axios";
import { useState } from "react";
import ShowListing from "./components/ShowListing";
import "./API.css";

function API() {
  const [allListings, setAllListing] = useState([]);
  
    
  
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
                // console.log(show._embedded.show.image)
                // console.log(show._embedded.show.image.original)
                <ShowListing
                  key={show.id}
                  name={show.name}
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
