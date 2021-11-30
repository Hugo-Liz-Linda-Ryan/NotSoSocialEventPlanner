import './App.css';
import Calendar from './components/Calendar';
import SiteOpeningPage from './components/LandingPage/LandingPage'
import Navigation from './components/Navigation/Navigation';
import MovieSectionF from './MovieSection';


function App() {

  return (
    <div className="App">
      <header>
        <Navigation/>
        <SiteOpeningPage />
        <Calendar/>
      </header>
      <main>
        <MovieSectionF/>    
      </main>
    </div>
  );
}

export default App;

