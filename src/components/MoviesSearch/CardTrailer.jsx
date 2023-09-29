import YouTube from 'react-youtube';
import { IMAGE_PATH } from '../../constants/config';
import PropTypes from 'prop-types';

export const CardTrailer = ({ movie, trailer, playing, setPlaying }) => {
  return (
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
                    Play Trailer
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
  );
};

CardTrailer.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    poster_path: PropTypes.string,
    title: PropTypes.string,
    backdrop_path: PropTypes.string,
    overview: PropTypes.string,
  }).isRequired,
  trailer: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }),
  playing: PropTypes.bool.isRequired,
  setPlaying: PropTypes.func.isRequired,
};
