import { useContext, useEffect, useState } from 'react';

import { SearchContext } from '../../Context/SearchContext.jsx';

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
import BACKEND_URL from '../../config.js';
const Room = () => {
  const { searchParams, selectedHotel } = useContext(SearchContext);
  const hotelData = { ...selectedHotel, ...searchParams };
  const selectedHotel1 = location.state?.selectedHotel;
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  console.log(selectedHotel1);
  const checkInData = hotelData.checkIn ? new Date(hotelData.checkIn) : null;
  const checkOutData = hotelData.checkOut ? new Date(hotelData.checkOut) : null;

  //*navigation and pass a prop to use in confirm component
  const handleRoomSelection = async (rooms) => {
    navigate('/confirm', { state: { selectedRoom: rooms } });
  };

  useEffect(() => {
    if (hotelData?.rooms) {
      console.log('Updated searchParams:', searchParams);
      console.log('Updated selectedHotel:', selectedHotel);
      setRooms(hotelData.rooms);
    }
  }, [hotelData]);

  console.log('Updated selectedHotel:', selectedHotel);
  if (!rooms || rooms.length === 0) {
    return (
      <div className='text-center flex flex-col justify-center items-center p-3 h-dvh  '>
        <p className=' mb-5 text-xl'>
          Loading hotel information.. Try it again
        </p>
        <div
          className='inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]'
          role='status'
        ></div>
      </div>
    );
  }
  return (
    <div className='max-w-[1200px] m-auto'>
      <div className='flex flex-col justify-center items-center text-center mt-5 mx-3'>
        <img
          className='w-56 h-full sm:w-5/6 md:w-96 '
          src={`${BACKEND_URL}${hotelData.hotelImages} `}
          alt={hotelData.hotelName}
        />
        <h1 className='text-3xl my-3'>{hotelData.hotelName}</h1>
        <h4 className=' text-lg md:text-2xl'>
          <FontAwesomeIcon
            icon={faLocationDot}
            className='mr-2 text-lg md:text-2xl'
          />
          {hotelData.location}
        </h4>
        <div className='border-2 bg-gray-100  border-gray-200 p-3 my-4 md:w-sm '>
          <p className='mb-3 md:text-lg'>{hotelData.description}</p>
          <div className='border-2 border-gray-200 p-2 mb-3'>
            <p className='font-semibold mb-2'>Facilities</p>

            <p className='mb-2 md:text-lg'>
              {hotelData.facilities.join(' , ')}
            </p>
          </div>

          <div className='flex justify-center items-center gap-8 md:gap-20'>
            <div>
              <p className='flex md:text-lg '>
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className='mr-1 mt-1 md:text-lg'
                />
                CheckIn
              </p>
              <p className='md:text-lg'>
                {' '}
                {checkInData ? checkInData?.toLocaleDateString() : 'null'}
              </p>
            </div>

            <div>
              <p className='flex md:text-lg '>
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className='mr-1 mt-1 md:text-lg '
                />
                CheckOut
              </p>
              <p className='md:text-lg'>
                {checkOutData ? checkOutData?.toLocaleDateString() : 'null'}
              </p>
            </div>
          </div>

          <p className='my-2 md:text-lg'>
            <FontAwesomeIcon icon={faPerson} className='mr-2 text-lg' />
            {hotelData.people} people
          </p>
        </div>
      </div>
      <div>
        {rooms.map((room, index) => (
          <div
            key={index}
            className='flex flex-col justify-center items-center w-3/4 border-2 m-20 p-1 lg:flex-row  mb-3 justify-between m-auto'
          >
            <div className=' overflow-hidden flex items-center justify-center lg:w-1/2'>
              <motion.img
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 1 }}
                className='w-full h-full object-cover'
                src={`${BACKEND_URL}${room.roomImages}`}
                alt={`${selectedHotel.hotelName} ${index + 1}`}
              />
            </div>

            <div className='text-center md:w-1/2'>
              <h2 className='mt-2 text-lg lg:text-2xl mb-4'>
                <FontAwesomeIcon icon={faBed} className='mr-2' />
                {room.roomType} bed
              </h2>
              <p className='mx-3 md:text-lg mb-2'>{room.description}</p>
              <p className='lg:text-xl mb-2 text-red-400'>
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
