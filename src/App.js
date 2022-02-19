import './stylesheets/App.css';
import About from './components/About';
import GetMovies from './components/GetMovies';
import WeeklyEvents from './components/WeeklyEvents';
import LandingPage from './components/LandingPage';

function App() {
  
  return (

    <div className="App">
      <header>
        <LandingPage/>
      </header>
      <main>
        <WeeklyEvents/>
        <GetMovies/>
        <About/>
      </main>
      <footer>
        <p>Made at <a href="https://www.junocollge.com">Juno College</a> © 2021</p>
      </footer>
    </div>
  );
}

export default App;
