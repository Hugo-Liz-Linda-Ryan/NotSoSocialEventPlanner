import './App.css';
import SiteOpeningPage from './components/LandingPage/LandingPage'
import Navigation from './components/Navigation/Navigation';
import MovieSectionF from './MovieSection';


function App() {

  return (
    <div className="App">
      <header>
        <Navigation/>
        <SiteOpeningPage />
      </header>
      <main>
        <MovieSectionF/>    
      </main>
    </div>
  );
}

export default App;

