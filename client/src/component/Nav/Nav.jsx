import { useState, useContext, useEffect } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const { user, token, logOutUser } = useContext(AuthContext);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
  return (
    <>
      <nav className={`${sticky ? 'nav-bar sticky' : 'nav-bar'}`}>
        <Link to='/'>
          {<img src='/logo.png' alt='logo' className='w-24 mt-2 ' />}
        </Link>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className='nav-item '>
            <Link to='/' className='nav-link' onClick={handleClick}>
              Home
            </Link>
          </li>
          {token && user ? (
            <li className='nav-item'>
              <button className='nav-link m-auto' onClick={logOutUser}>
                Logout
              </button>
            </li>
          ) : (
            <li className='nav-item'>
              <Link to='/login' className='nav-link' onClick={handleClick}>
                Account
              </Link>
            </li>
          )}
          {token && user ? (
            <li className='nav-item text-white '>
              <p className='nav-item text-sm sm:text-black'>
                Welcome, {user.lastName}
              </p>
            </li>
          ) : (
            ''
          )}
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
