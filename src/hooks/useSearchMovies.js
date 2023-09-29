import axios from 'axios';
import { useState, useEffect } from 'react';
import { API_KEY, API_URL } from '../constants/config';

export const useSearchMovies = () => {
  /* States */
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  /* useEffect */
  useEffect(() => {
    /* Fetch */
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
        if (results.length > 0) {
          /* Actualiza lista de películas */
          setMovies(results);
        }
      } catch (error) {
        console.log(`Error fetching movies: `, error);
      }
    };
    fetchMovies();
  }, [searchKey]);

  /* Función que busca con el handleClick */
  const handleSearchMovies = (key) => {
    setSearchKey(key);
  };
  return { movies, handleSearchMovies, searchKey };
};
