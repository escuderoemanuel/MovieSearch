import './Header.css';
import appIcon from '../../img/popcorn.png';
export const Header = () => {
  return (
    <div className='header'>
      <div className='titleHeader'>
        <img className='appIcon' src={appIcon} alt='App Icon' />
        <h1 className='titleApp'>
          <span className='bigLetter'>M</span>OVIE
          <span className='bigLetter'>S</span>EARCH
          <span className='sign'>!</span>
        </h1>
      </div>
    </div>
  );
};
