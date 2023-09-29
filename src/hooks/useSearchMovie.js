import axios from 'axios';
import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from '../constants/config';
// import { movies } from './useSearchMovies';

export const useSearchMovie = (movies) => {
  /* Constantes */
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: 'Loading Movies...' });

  useEffect(() => {
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

    if (movies) {
      fetchMovie(movies[0].id);
    }
  }, [movie, trailer]);

  return { movie, trailer };
};
