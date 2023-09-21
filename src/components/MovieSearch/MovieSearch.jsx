import './MovieSearch.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';

export const MovieSearch = () => {
  /* Consts */
  const API_URL = 'https://api.themoviedb.org/3';
  const API_KEY = '6d5c35b1318a5613327bf5a4c07f2e1d';
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/original';

  /* Endpoint to Images */
  const URL_IMAGE = 'https://image.tmdb.org/t/p/original';

  /* States */
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: 'Loeading Movies...' });
  const [playing, setPlaying] = useState(false);

  /* Handles */
  const handleInputChange = (e) => {
    setSearchKey(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
    setSearchKey('');
  };

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? 'search' : 'discover';
    try {
      const {
        data: { results },
      } = await axios.get(`${API_URL}/${type}/movie`, {
        params: {
          api_key: API_KEY,
          query: searchKey,
        },
      });
      setMovies(results);
      setMovie(results[0]);
    } catch (error) {
      console.error('Error fetching movies: ', error);
    }
  };

  /* USE EFFECT */
  useEffect(() => {
    fetchMovies();
  }, []);

  /* CONTAINER TO SHOW MOVIES */
  return (
    <div className='body container'>
      <form onSubmit={handleSubmit} className='form'>
        <input
          className='input'
          type='text'
          placeholder='Search a Movie'
          value={searchKey}
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
              src={`${IMAGE_PATH}/${movie.poster_path}`}
              alt={movie.title}
            />
            <div className='cardText'>
              <h4>{movie.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* 

  /* Fetch */
/* const fetchMovies = async () => {
    try {
      const response = await fetch(
        `${API_URL}?query=${search}&api_key=${API_KEY}`
      );
      const data = await response.json();
      console.log(data.results);
      setMovies(data.results);
    } catch (error) {
      console.error('The following error has occurred:', error);
    }
  }; */

/*
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
              src={`${IMAGE_PATH}/${movie.poster_path}`}
              alt={movie.title}
            />
            <div className='cardText'>
              <h2>{movie.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div> */
