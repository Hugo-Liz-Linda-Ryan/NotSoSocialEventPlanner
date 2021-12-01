import './App.css';
import SiteOpeningPage from './components/LandingPage/LandingPage'
import Navigation from './components/Navigation/Navigation';
import About from './components/About/About';
import MovieSectionF from './components/MovieSection';
import WeeklyEvents from './components/WeeklyEvents';


function App() {

  return (

    <div className="App">
      <header>
        <Navigation />
        <SiteOpeningPage />
        <About />
      </header>
      <main>
        <WeeklyEvents />
        <MovieSectionF />
      </main>
    </div>

  );


}

export default App;
