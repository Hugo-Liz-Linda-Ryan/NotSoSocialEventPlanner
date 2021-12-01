import './App.css';
import SiteOpeningPage from './components/LandingPage/LandingPage'
import Navigation from './components/Navigation/Navigation';
import About from './components/About/About';
import MovieSectionF from './components/MovieSection';
import WeeklyEvents from './components/WeeklyEvents';


function App() {
  
  startingUpTheme();

  function startingUpTheme() {
    const theme = localStorage.getItem('body');
    document.getElementsByClassName('body').value = theme;
    let htmlElement = document.documentElement;
    htmlElement.setAttribute("data-theme", "theme");

  }
 

  return (

    <div className="App">
      <header>
        <Navigation />
        <SiteOpeningPage />
        <About />
      </header>
      <main>
      <About/>
    <WeeklyEvents/>
        <MovieSectionF />
      </main>
    </div>

  );


}

export default App;
