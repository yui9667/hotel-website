import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../../Context/SearchContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPerson,
  faCalendarDays,
  faLocationDot,
  faBed,
} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Room = () => {
  const { searchParams, selectedHotel, selectedRoom, setSelectedRoom } =
    useContext(SearchContext);
  const hotelData = { ...searchParams, ...selectedHotel, ...selectedRoom };
  const { isAuthenticated } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  console.log('searchParams: location ,checkin/out and people. ', searchParams);
  // console.log('selectedHotel : hotel information', selectedHotel);
  // console.log('selectedRoom: a user selected', selectedRoom);
  const checkInData = hotelData.checkIn ? new Date(hotelData.checkIn) : null;
  const checkOutData = hotelData.checkOut ? new Date(hotelData.checkOut) : null;

  // console.log('searchParams', searchParams);
  //*navigation and pass a prop to use in confirm component
  const handleRoomSelection = (room) => {
    if (isAuthenticated) {
      setSelectedRoom(room);
      console.log('Selected Room in RoomSelection:', room);
      navigate('/confirm');
    } else {
      navigate('/login');
    }
  };

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
            <p>Per Night {room.pricePerNight}kr</p>

            <button
              className='btn btn-primary px-4 py-1 m-2 text-sm drop-shadow-sm'
              type='button'
              onClick={() => handleRoomSelection(room)}
            >
              Select
            </button>
          </div>
        ))}
        {/* {selectedRoom && <Confirm selectedRoom={selectedRoom} />} */}
      </div>
    </div>
  );
};

export default Room;
