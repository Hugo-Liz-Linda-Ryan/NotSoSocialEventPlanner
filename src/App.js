import './App.css';
import SiteOpeningPage from './components/LandingPage/LandingPage'
import Navigation from './components/Navigation/Navigation';
import MovieSection from './components/Movielist/MoviesSection';

function App() {
  
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
