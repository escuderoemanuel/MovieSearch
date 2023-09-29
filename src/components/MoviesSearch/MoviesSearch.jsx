import { useState } from 'react';
import { useSearchMovies } from '../../hooks/useSearchMovies';
import { useSearchMovie } from '../../hooks/useSearchMovie';
import { Form } from './Form';
import { CardTrailer } from './CardTrailer';
import { CardMovie } from './CardMovie';
import './MoviesSearch.css';

export const MoviesSearch = () => {
  const { movies, handleSearchMovies } = useSearchMovies();
  const { movie, trailer } = useSearchMovie();
  const [playing, setPlaying] = useState(false);
  const [searchKey, setSearchKey] = useState('');

  const selectMovie = () => {
    setPlaying(false);
    handleSearchMovies('');
  };

  return (
    <div className='body container'>
      <Form handleSearchMovies={handleSearchMovies} searchKey={searchKey} />
      <CardTrailer
        movie={movie}
        trailer={trailer}
        playing={playing}
        setPlaying={setPlaying}
      />
      <div className='movieList'>
        {movies ? ( // Verifica si 'movies' tiene datos antes de mapearlo
          movies.map((movie) => (
            <CardMovie key={movie.id} movie={movie} selectMovie={selectMovie} />
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
};
