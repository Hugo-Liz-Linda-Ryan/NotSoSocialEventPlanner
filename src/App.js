import './App.css';
import SiteOpeningPage from './components/LandingPage/LandingPage'
import About from './components/About/About';
import MovieSectionF from './components/MovieSection';
import WeeklyEvents from './components/WeeklyEvents';


function App() {
  

 

  return (

    <div className="App">
      <header>
        <SiteOpeningPage/>
      </header>
      
      <main>
        <WeeklyEvents/>
        <MovieSectionF/>
        <About/>
      </main>
      <footer>
        <p>Made at <a href="https://www.junocollge.com">Juno College</a> © 2021</p>
      </footer>
    </div>

  );


}

export default App;
