import { IMAGE_PATH } from '../../constants/config';
import PropTypes from 'prop-types';

export const CardMovie = ({ movie, selectMovie }) => {
  return (
    <div key={movie.id} className='card' onClick={() => selectMovie(movie)}>
      <img
        className='imgMovie'
        src={`${IMAGE_PATH}/${movie.poster_path}`}
        alt={movie.title}
      />
      <div className='cardText'>
        <h4>{movie.title}</h4>
      </div>
    </div>
  );
};

CardMovie.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    poster_path: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  selectMovie: PropTypes.func.isRequired,
};
