import './MovieSearch.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
//import { API_URL, API_KEY, IMAGE_PATH } from '../../constants/config.js';
import { API_KEY, API_URL, IMAGE_PATH } from '../../../environmentVariables';

export const MovieSearch = () => {
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

  const handleSearchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
    setSearchKey('');
  };

  /* Fetch to List Movie */
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

      if (results.length) {
        await fetchMovie(results[0].id);
      }
    } catch (error) {
      console.error('Error fetching movies: ', error);
    }
  };

  /* Fetch to Trailer Movie*/
  const fetchMovie = async (id) => {
    try {
      const { data } = await axios.get(`${API_URL}/movie/${id}`, {
        params: {
          api_key: API_KEY,
          append_to_response: 'videos',
        },
      });

      if (data.videos && data.videos.results) {
        const trailer = data.videos.results.find(
          (vid) => vid.name === 'Official Trailer'
        );
        setTrailer(trailer ? trailer : data.videos.results[0]);
      }
      setMovie(data);
    } catch (error) {
      console.error('Error fetching trailer movie: ', error);
    }
  };

  const selectMovie = async (movie) => {
    fetchMovie(movie.id);
    setMovie(movie);
    window.scrollTo(0, 0);
  };

  /* USE EFFECT */
  useEffect(() => {
    fetchMovies();
  }, []);

  /* CONTAINER TO SHOW MOVIES */
  return (
    <div className='body container'>
      {/* Form to Search Movie */}
      <form onSubmit={handleSearchMovies} className='form'>
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

      {/* Movie Banner & Trailer  */}
      <div className='bannerTrailer'>
        {movie ? (
          <div
            className='viewtrailer'
            style={{
              backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
            }}>
            {playing ? (
              <>
                <YouTube
                  videoId={trailer.key}
                  className='reproductor container'
                  containerClassName={'youtube-container amru'}
                  opts={{
                    width: '100%',
                    height: '100%',
                    playerVars: {
                      autoplay: 1,
                      controls: 1,
                      cc_load_policy: 0,
                      fs: 0,
                      iv_load_policy: 0,
                      modestbranding: 0,
                      rel: 0,
                      showinfo: 0,
                    },
                  }}
                />
                <button
                  onClick={() => setPlaying(false)}
                  className='closeTrailerButton'>
                  Close
                </button>
              </>
            ) : (
              <div className='container'>
                <div className=''>
                  {trailer ? (
                    <button
                      className='playTrailerButton'
                      onClick={() => setPlaying(true)}
                      type='button'>
                      Play Trailer!
                    </button>
                  ) : (
                    'Sorry, no trailer available'
                  )}
                  <div className='glass'>
                    <div className='descriptionMovie'>
                      <h2 className='text-white'>{movie.title}</h2>
                      <p className='text-white'>{movie.overview}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* Movies List */}
      <div className='movieList'>
        {movies.map((movie) => (
          <div
            key={movie.id}
            className='card'
            onClick={() => selectMovie(movie)}>
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
