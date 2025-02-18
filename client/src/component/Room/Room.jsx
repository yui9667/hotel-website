import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../../Context/SearchContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPerson,
  faCalendarDays,
  faLocationDot,
  faBed,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { differenceInDays } from 'date-fns';
const Room = () => {
  const { searchParams, selectedHotel } = useContext(SearchContext);
  const hotelData = { ...searchParams, ...selectedHotel };

  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const checkInData = hotelData.checkIn ? new Date(hotelData.checkIn) : null;
  const checkOutData = hotelData.checkOut ? new Date(hotelData.checkOut) : null;

  //*navigation and pass a prop to use in confirm component
  const handleRoomSelection = async (rooms) => {
    navigate('/confirm', { state: { selectedRoom: rooms } });
  };

  useEffect(() => {
    if (hotelData?.rooms) {
      setRooms(hotelData.rooms);
    }
  }, [hotelData]);
  if (!rooms || rooms.length === 0) {
    return <div>Loading hotel information..</div>;
  }
  return (
    <div>
      <div className='flex flex-col justify-center items-center text-center mx-2'>
        <img
          className='w-56 h-full sm:w-5/6 md:w-2xl 
          
          '
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

          <div className='flex justify-center items-center gap-8 '>
            <div>
              <p className='flex '>
                <FontAwesomeIcon icon={faCalendarDays} className='mr-1 mt-1' />
                CheckIn
              </p>
              <p> {checkInData ? checkInData?.toLocaleDateString() : 'null'}</p>
            </div>

            <div>
              <p className='flex '>
                <FontAwesomeIcon icon={faCalendarDays} className='mr-1 mt-1' />
                CheckOut
              </p>
              <p>
                {checkOutData ? checkOutData?.toLocaleDateString() : 'null'}
              </p>
            </div>
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
            className='flex flex-col justify-center items-center border-2 m-4 md:flex-row '
          >
            <motion.img
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 1 }}
              className='w-full h-56 sm:h-56 md:h-80'
              src={`http://localhost:3002${room.roomImages}`}
              alt={`${selectedHotel.hotelName} ${index + 1}`}
            />
            <div className='md:flex flex-col justify-center text-center'>
              <h2 className='mt-2 text-lg md:text-2xl mb-4'>
                <FontAwesomeIcon icon={faBed} className='mr-2' />
                {room.roomType} bed
              </h2>
              <p className='mx-3 md:text-lg mb-2'>{room.description}</p>
              <p className='md:text-xl mb-2 text-red-400'>
                {room.pricePerNight}
                kr
              </p>

              <p className='text-sm text-gray-400 '>
                Total amount {room.adjustedPrice} kr for{' '}
                {differenceInDays(checkOutData, checkInData)} night
              </p>

              <button
                className='btn btn-primary px-5 py-1 m-3  text-sm drop-shadow-sm'
                type='button'
                onClick={() => handleRoomSelection(room)}
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Room;
