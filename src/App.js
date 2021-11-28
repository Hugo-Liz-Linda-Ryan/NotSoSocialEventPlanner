import './App.css';
import axios from "axios";
import { useState, useEffect } from 'react';
import SiteOpeningPage from './components/LandingPage/LandingPage'
import Navigation from './components/Navigation/Navigation';
import MovieSection from './components/Movielist/MoviesSection';
import WeeklyEvents from './components/WeeklyEvents';
import ShowListing from './components/ShowListing';


function App() {

  // Holding presented date 
  const [date, setDate] = useState("2021-11-25")
  // Holding Country
  const [country, setCountry] = useState("US")

  const [allListings, setAllListing] = useState([])

  useEffect(() => {
    // Calling the API using Axios
    axios({
      method: "GET",
      url: ` https://api.tvmaze.com/schedule/web`,
      responseType: "json",
      params: {
        date: `${date}`,
        country: `${country}`
      }
    })
      .then((response) => {

        // console.log(response.data)
        // console.log(response.data[0]._embedded.show)
        setAllListing(response.data)


      })
    // We want API call to be made with every category change
  }, [])

  
  return (
    <div className="App">
      <header>
        <Navigation/>
        <SiteOpeningPage />
      </header>
      <main>
        // <ul className="filmList">
     {/* Rendering products to the page */}
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

