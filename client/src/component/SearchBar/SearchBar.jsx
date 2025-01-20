import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const SearchBar = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
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
            //    onChange={(e) => setLocation(e.target.value)}
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
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              startDate={startDate}
              required
            />
            <DatePicker
              className='rounded w-28 mr-5 text-center'
              selectsEnd
              placeholderText='Check Out'
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              endDate={endDate}
              startDate={endDate}
              minDate={startDate}
              required
            />
          </div>
          <select className='w-28 rounded text-sm mt-2' id='guests' required>
            <option value=''>Guests</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
          </select>
          <button
            className='btn btn-primary px-4 py-1 m-2 text-sm'
            type='button'
            //    onChange={(e) => setLocation(e.target.value)}
          >
            Search
          </button>
        </div>
      </header>
    </div>
  );
};

export default SearchBar;
