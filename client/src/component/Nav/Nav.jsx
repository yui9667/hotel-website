import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import './Nav.css';
import { Link } from 'react-router-dom';
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <nav className='nav-bar'>
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className='nav-item'>
            <Link to='/' className='nav-link' onClick={handleClick}>
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/login' className='nav-link' onClick={handleClick}>
              Account
            </Link>
          </li>
          <li className='nav-item text-white sm:text-black'>
            <FontAwesomeIcon icon={faGlobe} className='nav-item ' />
          </li>
        </ul>
        <div
          className={`hamburger ${isOpen ? 'active' : ''}`}
          onClick={handleClick}
        >
          <span className='bar'></span>
          <span className='bar'></span>
          <span className='bar'></span>
        </div>
      </nav>
    </>
  );
};

export default Nav;
