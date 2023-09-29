import PropTypes from 'prop-types';

export const Form = ({ handleSearchMovies, searchKey }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchMovies(searchKey);
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <input
        className='input'
        type='text'
        placeholder='Search a Movie'
        value={searchKey}
        onChange={(e) => handleSearchMovies(e.target.value)}
      />
      <button type='submit' className='searchButton'>
        SEARCH
      </button>
    </form>
  );
};

Form.propTypes = {
  handleSearchMovies: PropTypes.func,
  searchKey: PropTypes.string,
};
