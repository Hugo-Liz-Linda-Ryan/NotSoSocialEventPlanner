import './App.css';
import Calendar from './components/Calendar';
import SiteOpeningPage from './components/LandingPage/LandingPage'
import Navigation from './components/Navigation/Navigation';
import About from './components/About/About';
import MovieSectionF from './MovieSection';
import WeeklyEvents from './components/WeeklyEvents';


function App() {

  return (
    
    <div className="App">
      <header>
        <Navigation/>
        <SiteOpeningPage />
        </header>
      <main>
    <WeeklyEvents/>
      <Calendar/>
        <About/>
        <MovieSectionF />
      </main>
    </div>
   
  );


}

export default App;
