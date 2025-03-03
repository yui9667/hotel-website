import { useState, useEffect } from 'react';
import './Nav.css';
import { Link, useNavigate } from 'react-router-dom';

const Nav = ({ user, token, setUser, setToken }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const logOutUser = () => {
    //*Removed data as keys
    window.sessionStorage.removeItem('userLocalStorage');
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('hotelStorageData');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

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
            <>
              <li className='nav-item'>
                <button className='nav-link m-auto' onClick={logOutUser}>
                  Logout
                </button>
              </li>
              <li className='nav-item text-white '>
                <p className='nav-item text-sm sm:text-black'>
                  Welcome, {user.lastName}
                </p>
              </li>
            </>
          ) : (
            <li className='nav-item'>
              <Link to='/login' className='nav-link' onClick={handleClick}>
                Account
              </Link>
            </li>
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
