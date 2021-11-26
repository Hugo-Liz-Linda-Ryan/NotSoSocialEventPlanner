import './App.css';
import axios from "axios";
import { useState, useEffect } from 'react';

function App() {

  // Holding presented date 
  const [date, setDate] = useState("2021-11-25")
  // Holding Country
  const [country, setCountry] = useState("US")

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
        
        console.log(response.data)
        console.log(response.data[0]._embedded.show)
      })
    // We want API call to be made with every category change
  }, [])


  return (
    <div className="App">

      <header>
        <h1>Not So <span>Social</span> Planner</h1>
        <div className="imageTriangle"></div>
      </header>


      <section className="creditSocials">
        <p>
          Made at <a href="https://junocollege.com/">Juno College</a>
        </p>
      </section>

      {/* </App> */}
    </div>
  );
}

export default App;
