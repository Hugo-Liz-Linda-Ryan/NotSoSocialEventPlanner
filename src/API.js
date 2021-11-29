import './App.css';
import axios from "axios";
import { useState } from 'react';
import ShowListing from './components/ShowListing';

function API() {
    const [date, setDate] = useState("2021-11-25")
  
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
  
            setAllListing(response.data)
  
  
          })
  
    }
    return (
      <div className="App">
        <ul className="filmList">
            <button id=""onClick={hello}>US</button>
            <button onClick={lolo}>Fuck me All</button>
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
      </div>
    );
  }
  
  export default API;