import './MovieSearch.css';
import { useState } from 'react';

export const MovieSearch = () => {
  const urlBase = 'https://api.themoviedb.org/3/search/movie';
  const API_KEY = '6d5c35b1318a5613327bf5a4c07f2e1d';

  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovie();
    setSearch('');
  };

  const fetchMovie = async () => {
    try {
      const response = await fetch(
        `${urlBase}?query=${search}&api_key=${API_KEY}`
      );
      const data = await response.json();
      console.log(data.results);
      setMovies(data.results);
    } catch (error) {
      console.error('The following error has occurred:', error);
    }
  };

  return (
    <div className='body container'>
      <form onSubmit={handleSubmit} className='form'>
        <input
          className='input'
          type='text'
          placeholder='Search a Movie'
          value={search}
          onChange={handleInputChange}
        />
        <button type='submit' className='searchButton'>
          SEARCH
        </button>
      </form>

      <div className='movieList'>
        {movies.map((movie) => (
          <div key={movie.id} className='card'>
            <img
              className='imgMovie'
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className='cardText'>
              <h2>{movie.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
