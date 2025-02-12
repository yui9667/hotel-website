import { useContext } from 'react';
import { SearchContext } from '../../Context/SearchContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPerson,
  faCalendarDays,
  faLocationDot,
  faBed,
  faStar,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { differenceInDays } from 'date-fns';
import { useLocation } from 'react-router-dom';
const Payment = () => {
  const { searchParams, selectedHotel } = useContext(SearchContext);
  const hotelData = { ...searchParams, ...selectedHotel };
  const checkInDate = hotelData?.checkIn ? new Date(hotelData.checkIn) : null;
  const checkOutDate = hotelData?.checkOut
    ? new Date(hotelData.checkOut)
    : null;
  console.log(hotelData);

  //* Room
  const location = useLocation();
  const { selectedRoom } = location.state || 'not found';
  console.log(selectedRoom);
  return (
    <div>
      <div>
        <h1>here is payment </h1>
      </div>
      <div className='flex justify-center items-center m-3 border-3 rounded p-2'>
        <div className=' flex text-center'>
          <p>
            <FontAwesomeIcon icon={faCalendarDays} className='mx-1 mt-1' />
            Check In {checkInDate?.toLocaleDateString()}
          </p>
        </div>

        <FontAwesomeIcon icon={faArrowRight} className='mx-1' />
        <div className='flex text-center'>
          <p>
            <FontAwesomeIcon icon={faCalendarDays} className='mx-1 mt-1' />
            Check Out {checkOutDate?.toLocaleDateString()}
          </p>
        </div>
        <div className='flex flex-col text-center ml-2'>
          <p>Night</p>
          <p>{differenceInDays(checkOutDate, checkInDate)}</p>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center rounded border-2 m-2 '>
        <img
          className='w-80 h-auto mt-2 rounded'
          src={`http://localhost:3002${hotelData.hotelImages}`}
          alt={hotelData.hotelName}
        />
        <h2 className='text-xl'>{hotelData.hotelName}</h2>
        <p className='text-lg'>
          <FontAwesomeIcon icon={faLocationDot} className='mr-1 ' />
          {hotelData.location}
        </p>
        <p className='rounded border-2 border-blue-700 p-1 mb-5'>
          <FontAwesomeIcon icon={faStar} className='text-yellow-400 mr-1' />
          {hotelData.rating}
        </p>

        <div className='bg-blue-100 p-7 flex flex-col justify-center items-center'>
          <img
            className='w-80 rounded'
            src={`http://localhost:3002${selectedRoom?.roomImages}`}
            alt={selectedRoom?.roomType}
          />
          <p className='my-2'>
            <FontAwesomeIcon icon={faBed} className='mr-2 text-lg' />

            {selectedRoom.roomType}
          </p>
          <p>
            {' '}
            <FontAwesomeIcon icon={faPerson} className='mr-2 text-lg' />
            {hotelData.people} People
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
