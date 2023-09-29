import './Header.css';
import appIcon from '../../assets/img/popcorn.png';
import faces from '../../assets/img/faces.png';
export const Header = () => {
  return (
    <div className='header'>
      <div className='titleHeader'>
        <img className='appIcon' src={faces} alt='Faces Icon' />
        <h1 className='titleApp'>
          <span className='bigLetter'>M</span>OVIE
          <span className='bigLetter'>S</span>EARCH
          <span className='sign'>!</span>
        </h1>
        <img className='appIcon' src={appIcon} alt='Popcorn Icon' />
      </div>
    </div>
  );
};
