import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
  return (
    <div className='bg-[#3A3A98]'>
      <nav>
        <ul>
          <li>
            <a href=''>Home</a>
          </li>
          <li>
            <a href=''>Account</a>
          </li>
          <li>
            <FontAwesomeIcon icon={faGlobe} />
          </li>
        </ul>
        <div>
          <span className=''></span>
          <span className=''></span>
          <span className=''></span>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
