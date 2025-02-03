import { useContext, useState, useEffect } from 'react';
import { SearchContext } from '../../Context/SearchContext';
import { AuthContext } from '../../Context/AuthContext';
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
  const { user } = useContext(AuthContext);
  const hotelData = { ...searchParams, ...selectedHotel, ...selectedRoom };
  const checkInData = hotelData.checkIn ? new Date(hotelData.checkIn) : null;
  const checkOutData = hotelData.checkOut ? new Date(hotelData.checkOut) : null;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  console.log('Received in Confirm', selectedRoom);

  const checkboxInfo = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setFirstName(user?.firstName || '');
      setLastName(user?.lastName || '');
      setEmail(user?.email || '');
    } else {
      setFirstName('');
      setLastName('');
      setEmail('');
    }
  };
  //console.log(authData.isAuthenticated);
  if (!selectedHotel) {
    return <p>No room selected</p>;
  }
  return (
    <div>
      <div className='flex flex-col justify-center items-center border-2 rounded m-2'>
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
        <div className='flex flex-col items-center justify-center '>
          <div className=' gap-3 p-4'>
            <img
              className='w-32 h-auto '
              src={`http://localhost:3002${hotelData.hotelImages} `}
              alt={hotelData.hotelName}
            />
            <div className='ml-1'>
              <p>
                <FontAwesomeIcon icon={faLocationDot} className='mr-1 ' />
                {hotelData.location}
              </p>
              <p className='border-2 rounded border-blue-800 p-1 mt-2 w-20  '>
                <FontAwesomeIcon
                  icon={faStar}
                  className='mr-2 text-sm text-yellow-500'
                />
                {hotelData.rating}
              </p>
            </div>
          </div>
          <div className='bg-blue-100 rounded  gap-3 p-5 mb-3'>
            <img
              className='w-32 h-auto '
              src={`http://localhost:3002${selectedRoom.roomImages} `}
              alt={hotelData.hotelName}
            />
            <div className='ml-1'>
              <p>
                <FontAwesomeIcon icon={faBed} className='mr-1' />
                {selectedRoom.roomType}
              </p>
              <p>
                <FontAwesomeIcon icon={faPerson} className='mr-2 text-lg' />
                {hotelData.people} people
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center m-2 border-2 rounded p-5'>
        <h1 className='m-2 text-2xl'>Who is the lead guest?</h1>
        <form className=' flex flex-col items-center mt-2 '>
          <input
            className='border-2 rounded my-4'
            type='name'
            placeholder='First name *'
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className='border-2 rounded '
            type='name'
            placeholder='Last name * '
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            className='border-2 rounded my-4'
            type='email'
            placeholder='Email *'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className='border-2 rounded '
            type='number'
            placeholder='Phone number(optional)'
          />

          <label className='text-sm flex gap-2'>
            <input type='checkbox' value={user} onChange={checkboxInfo} />
            Same information as a user
          </label>

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
