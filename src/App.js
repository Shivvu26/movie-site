import logo from './logo.svg';
import './App.scss';
import GenreList from './containers/GenreList';
import MovieList from './containers/MovieList';

function App() {
  return (
    <div className="App">
      <header className='header'>
        <h1 style={{ textAlign: 'center', color: 'red' }}>MOVIEFIX</h1>
        <GenreList />
        <MovieList />
      </header>
    </div>
  );
}

export default App;
