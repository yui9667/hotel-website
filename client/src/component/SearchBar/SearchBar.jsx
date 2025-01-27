import { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { SearchContext } from '../../Context/SearchContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faCalendar,
  faPerson,
} from '@fortawesome/free-solid-svg-icons';
const SearchBar = ({ setResetLanding }) => {
  //*passing props by context provider
  const { setSearchParams } = useContext(SearchContext);
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [people, setPeople] = useState(1);

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3002/api/hotel/search',
        { location, checkIn, checkOut, people }
      );
      // console.log(response);
      setResetLanding(response.data);

      setSearchParams({ location, checkIn, checkOut, people });
      console.log(response.data);
    } catch (error) {
      console.error('Failed to fetch data', error.message);
    }
  };
  return (
    <div>
      <header className='header'>
        <div
          className='flex flex-col justify-center items-center text-center'
          // style={{ backgroundColor: 'var(--second-color)' }}
        >
          <div>
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{ color: '#fff' }}
              className='mr-1'
            />
            <select
              className='w-28 rounded text-sm mt-3'
              required
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value=''>Select City</option>
              <option value='Malmö'>Malmö</option>
              <option value='Gothenburg'>Gothenburg</option>
              <option value='Stockholm'>Stockholm</option>
            </select>
          </div>

          <div className='text-sm my-3 flex flex-col justify-center items-center'>
            <div>
              <FontAwesomeIcon icon={faCalendar} className='mr-1 text-white ' />
              <DatePicker
                className='rounded w-28 mb-3 text-center '
                selectsStart
                placeholderText='Check In'
                selected={checkIn}
                onChange={(data) => setCheckIn(data)}
                startDate={checkIn}
                minDate={new Date()}
                required
              />
            </div>
            <div>
              <FontAwesomeIcon icon={faCalendar} className='mr-1 text-white ' />
              <DatePicker
                className='rounded w-28 text-center'
                selectsEnd
                placeholderText='Check Out'
                selected={checkOut}
                onChange={(data) => setCheckOut(data)}
                endDate={checkOut}
                startDate={checkOut}
                minDate={checkIn + 2}
                required
              />
            </div>
          </div>

          <div>
            <FontAwesomeIcon
              icon={faPerson}
              className='mr-1 text-white text-lg'
            />
            <select
              className='w-28 rounded text-sm '
              id='guests'
              value={people}
              //change to number
              onChange={(e) => setPeople(Number(e.target.value))}
              required
            >
              <option value=''>Guests</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
            </select>
          </div>
          <button
            className='btn btn-primary px-4 py-1 m-2 text-sm'
            type='button'
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </header>
    </div>
  );
};

export default SearchBar;
