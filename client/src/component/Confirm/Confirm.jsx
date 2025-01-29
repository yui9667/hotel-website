import { useContext, useState, useEffect } from 'react';
import { SearchContext } from '../../Context/SearchContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPerson,
  faCalendarDays,
  faLocationDot,
  faBed,
} from '@fortawesome/free-solid-svg-icons';
const Confirm = () => {
  const { searchParams, selectedHotel } = useContext(SearchContext);
  const hotelData = { ...searchParams, ...selectedHotel };
  const [isConfirm, setIsConfirm] = useState('');

  const checkInData = hotelData.checkIn ? new Date(hotelData.checkIn) : null;
  const checkOutData = hotelData.checkOut ? new Date(hotelData.checkOut) : null;
  useEffect(() => {
    if (hotelData) {
      setIsConfirm(hotelData.isConfirm);
    }
    console.log(hotelData);
  }, [hotelData]);
  return (
    <div>
      <div className='flex flex-col justify-center items-center border-2 p-3 rounded m-2'>
        <div className='flex justify-center items-center gap-10 m-3 border-3 rounded p-3'>
          <p className=' flex '>
            <FontAwesomeIcon icon={faCalendarDays} className='mx-1 mt-1' />
            Check In {checkInData ? checkInData?.toLocaleDateString() : 'null'}
          </p>

          <p className='flex '>
            <FontAwesomeIcon icon={faCalendarDays} className='mx-1 mt-1' />
            Check Out{' '}
            {checkOutData ? checkOutData?.toLocaleDateString() : 'null'}
          </p>
        </div>
        <h1 className='text-3xl mb-3'>{hotelData.hotelName}</h1>
        <img
          className='w-56 h-full mb-3'
          src={`http://localhost:3002${hotelData.hotelImages} `}
          alt={hotelData.hotelName}
        />

        <p>
          <FontAwesomeIcon icon={faLocationDot} className='mr-1 ' />
          {hotelData.location}
        </p>

        <p>
          <FontAwesomeIcon icon={faPerson} className='mr-2 text-lg' />
          {hotelData.people} people
        </p>
      </div>
      <div>
        {/* <img
          className='w-56 h-full '
          src={`http://localhost:3002${hotelData.rooms.roomImages} `}
          alt={hotelData.hotelName}
        /> */}
      </div>
      <div className='flex flex-col  items-center m-2'>
        <h1 className='m-2 text-2xl'>Who is the lead guest?</h1>
        <form action='' className=' flex flex-col items-center mt-2 '>
          <input
            className='border-2 rounded my-2'
            type='name'
            placeholder='First name *'
            required
          />
          <input
            className='border-2 rounded '
            type='name'
            placeholder='Last name * '
            required
          />
          <input
            className='border-2 rounded my-2'
            type='email'
            placeholder='Email *'
            required
          />
          <input
            className='border-2 rounded'
            type='phone number'
            placeholder='Phone number(optional)'
          />
        </form>
      </div>
    </div>
  );
};

export default Confirm;
