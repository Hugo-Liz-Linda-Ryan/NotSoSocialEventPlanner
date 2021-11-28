import './App.css';
import axios from "axios";
import { useState, useEffect } from 'react';
import SiteOpeningPage from './components/LandingPage/LandingPage'
import Navigation from './components/Navigation/Navigation';
import MovieSection from './components/Movielist/MoviesSection';
import WeeklyEvents from './components/WeeklyEvents';

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
        <MovieSection/>
      </main>
    </div>
  );
}

export default App;
