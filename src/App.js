import './App.css';
import axios from "axios";
import { useState, useEffect } from 'react';
import SiteOpeningPage from './components/LandingPage/LandingPage'
import Navigation from './components/Navigation/Navigation';
import ShowListing from './components/ShowListing';
import Calendar from './components/Calendar';


function App() {
  const [date, setDate] = useState("2021-11-25")
  // Holding Country
  

  const [allListings, setAllListing] = useState([])
  
  function lolo() {
  
    let country = "";

    axios({
        
        method: "GET",
        url: ` https://api.tvmaze.com/schedule/web`,
        responseType: "json",
        params: {
          country: `${country}`
        }
      })
        .then((response) => {

          // console.log(response.data)
          // console.log(response.data[0]._embedded.show)
          setAllListing(response.data)


        })


}
  function hello() {

    let country = "US";

    axios({
        
        method: "GET",
        url: ` https://api.tvmaze.com/schedule/web`,
        responseType: "json",
        params: {
          country: `${country}`
        }
      })
        .then((response) => {

          // console.log(response.data)
          // console.log(response.data[0]._embedded.show)
          setAllListing(response.data)
        })


  }
  return (
    <div className="App">
      <header>
        <Navigation/>
        <SiteOpeningPage />
      </header>
        <Calendar/>
      <main>
      <ul className="filmList">
          <button id=""onClick={hello}>US</button>
          <button onClick={lolo}>All</button>
       {allListings.map((show) => {
        return (
            // console.log(show._embedded.show.image)
            // console.log(show._embedded.show.image.original)
          <ShowListing 
            key={show.id}
            name={show.name}
            genre={show._embedded.show.genre}
            runtime={show.runtime}
            image = {show._embedded.show.image}
            site={show.url}
            language={show._embedded.show.language}
            // schedule = {show.schedule.days}
            // time = {show.schedule.time}
            summary={show._embedded.show.summary}
          />
        )
      })}

    </ul>
      </main>
    </div>
  );
}

export default App;

