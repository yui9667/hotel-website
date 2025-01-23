import { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { SearchContext } from '../../SearchContext';
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
          // style={{ backgroundColor: 'rgba(110, 110, 110, 0.53)' }}
        >
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

          <div className='text-sm mt-3'>
            <DatePicker
              className='rounded w-28 mr-5 text-center'
              selectsStart
              placeholderText='Check In'
              selected={checkIn}
              onChange={(data) => setCheckIn(data)}
              startDate={checkIn}
              minDate={new Date()}
              required
            />
            <DatePicker
              className='rounded w-28 mr-5 text-center'
              selectsEnd
              placeholderText='Check Out'
              selected={checkOut}
              onChange={(data) => setCheckOut(data)}
              endDate={checkOut}
              startDate={checkOut}
              minDate={checkIn}
              required
            />
          </div>

          <select
            className='w-28 rounded text-sm mt-2'
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
