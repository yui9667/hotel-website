import { useContext } from 'react';
import { SearchContext } from '../../Context/SearchContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPerson,
  faCalendarDays,
  faLocationDot,
  faBed,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
const Confirm = () => {
  const { searchParams, selectedHotel, selectedRoom } =
    useContext(SearchContext);
  const hotelData = { ...searchParams, ...selectedHotel, ...selectedRoom };
  const checkInData = hotelData.checkIn ? new Date(hotelData.checkIn) : null;
  const checkOutData = hotelData.checkOut ? new Date(hotelData.checkOut) : null;
  console.log('Received in Confirm', selectedRoom);
  if (!selectedHotel) {
    return <p>No room selected</p>;
  }
  return (
    <div>
      <div className='flex flex-col justify-center items-center border-2 p-3 rounded m-2'>
        <div className='flex justify-center items-center gap-8 m-3 border-3 rounded p-3'>
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
        <div className=' flex flex-row items-center gap-3'>
          <img
            className='w-28 h-28 mb-3'
            src={`http://localhost:3002${hotelData.hotelImages} `}
            alt={hotelData.hotelName}
          />
          <div className='ml-1'>
            <p>
              <FontAwesomeIcon icon={faLocationDot} className='mr-1 ' />
              {hotelData.location}
            </p>
            <p className='border-2 rounded border-blue-800 p-1 mt-2'>
              <FontAwesomeIcon
                icon={faStar}
                className='mr-2 text-lg text-yellow-500'
              />
              Rating {hotelData.rating}
            </p>
          </div>
        </div>
        <div className='bg-blue-100 flex justify-center items-center gap-3 p-3'>
          <img
            className='w-28 h-28 '
            src={`http://localhost:3002${selectedRoom.roomImages} `}
            alt={hotelData.hotelName}
          />
          <div>
            <p>
              <FontAwesomeIcon icon={faBed} className='mr-1' />
              {selectedRoom.roomType}
            </p>
            <p>
              <FontAwesomeIcon icon={faPerson} className='mr-2 text-lg' />
              {hotelData.people} people
            </p>
          </div>
        </div>{' '}
      </div>
      <div className='flex flex-col items-center m-2 border-2 rounded p-5'>
        <h1 className='m-2 text-2xl'>Who is the lead guest?</h1>
        <form action='' className=' flex flex-col items-center mt-2 '>
          <input
            className='border-2 rounded my-4'
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
            className='border-2 rounded my-4'
            type='email'
            placeholder='Email *'
            required
          />
          <input
            className='border-2 rounded '
            type='phone number'
            placeholder='Phone number(optional)'
          />
          <button
            className='btn btn-primary px-4 py-1 m-2 text-sm drop-shadow-sm mt-4'
            type='button'
          >
            Next Step
          </button>
        </form>
      </div>
    </div>
  );
};

export default Confirm;
