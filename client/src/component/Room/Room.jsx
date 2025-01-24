import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../../SearchContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPerson,
  faCalendarDays,
  faLocationDot,
  faBed,
} from '@fortawesome/free-solid-svg-icons';
const Room = () => {
  const { searchParams, selectedHotel } = useContext(SearchContext);
  const hotelData = { ...searchParams, ...selectedHotel };
  const [rooms, setRooms] = useState([]);

  console.log('selected', selectedHotel);
  console.log('searchParams', searchParams);
  useEffect(() => {
    if (hotelData && selectedHotel) {
      setRooms(selectedHotel.rooms);
    }
  }, [hotelData, selectedHotel]);
  if (!rooms || rooms.length === 0) {
    return <div>Loading hotel information..</div>;
  }
  return (
    <div>
      <div className='flex flex-col justify-center items-center text-center mx-2'>
        <img
          className='w-56 h-full '
          src={`http://localhost:3002${hotelData.hotelImages} `}
          alt={hotelData.hotelName}
        />
        <h1 className='text-3xl my-3'>{hotelData.hotelName}</h1>
        <h4 className=' text-lg'>
          <FontAwesomeIcon icon={faLocationDot} className='mr-2 text-lg' />
          {hotelData.location}
        </h4>
        <div className='border-2 p-3 my-4'>
          <p className='mb-3'>{hotelData.description}</p>
          <p className='border-2 p-2 mb-3'>
            {hotelData.facilities.join(' , ')}
          </p>

          <div className='flex gap-3'>
            <p>
              <FontAwesomeIcon icon={faCalendarDays} className='mr-1 ' />
              Check In {hotelData.checkIn?.toLocaleDateString()}
            </p>
            <p>
              <FontAwesomeIcon icon={faCalendarDays} className='mr-1 ' />
              Check Out {hotelData.checkOut?.toLocaleDateString()}
            </p>
          </div>

          <p>
            <FontAwesomeIcon icon={faPerson} className='mr-2 text-lg' />
            {hotelData.people} people
          </p>
        </div>
      </div>
      <div>
        {rooms.map((room, index) => (
          <div
            key={index}
            className='flex flex-col justify-center items-center border-2 m-4'
          >
            <img
              className='w-full h-56'
              src={`http://localhost:3002${room.roomImages}`}
              alt={`${selectedHotel.hotelName} ${index + 1}`}
            />
            <h2 className='mt-2 text-lg'>
              <FontAwesomeIcon icon={faBed} className='mr-2' />
              {room.roomType} bed
            </h2>
            <p className='mx-3'>{room.description}</p>
            <p>Per person {room.pricePerNight}kr</p>
            <p>{room.adjustedPrice}kr</p>
            <button
              type='button'
              className='btn btn-primary px-4 py-1 m-2 text-sm drop-shadow-lg'
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Room;
