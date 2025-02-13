import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SearchContext } from '../../Context/SearchContext';
import { AuthContext } from '../../Context/AuthContext';
import { differenceInDays } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPerson,
  faCalendarDays,
  faLocationDot,
  faBed,
  faStar,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

const Confirm = () => {
  const { searchParams, selectedHotel } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const hotelData = { ...searchParams, ...selectedHotel };
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const checkInData = hotelData.checkIn ? new Date(hotelData.checkIn) : null;
  const checkOutData = hotelData.checkOut ? new Date(hotelData.checkOut) : null;

  const location = useLocation();
  const { selectedRoom } = location.state || 'not found';

  //  console.log(selectedRoom);
  const checkboxInfo = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
    } else {
      setFirstName('');
      setLastName('');
      setEmail('');
    }
    console.log(user);
  };

  const btn = (rooms) => {
    if (!setFirstName || !setEmail || !lastName) {
      alert('Please fill in your information');
    } else {
      navigate('/payment', { state: { selectedRoom: rooms } });
    }
  };
  if (!selectedHotel) {
    return <p>No room selected</p>;
  }
  return (
    <div>
      <div className='flex flex-col justify-center items-center border-2 rounded m-2'>
        <div className='flex justify-center items-center m-3 border-3 rounded p-2'>
          <div className=' flex text-center'>
            <p>
              <FontAwesomeIcon icon={faCalendarDays} className='mx-1 mt-1' />
              Check In{' '}
              {checkInData ? checkInData?.toLocaleDateString() : 'null'}
            </p>
          </div>

          <FontAwesomeIcon icon={faArrowRight} className='mx-1' />
          <div className='flex text-center'>
            <p>
              <FontAwesomeIcon icon={faCalendarDays} className='mx-1 mt-1' />
              Check Out{' '}
              {checkOutData ? checkOutData?.toLocaleDateString() : 'null'}
            </p>
          </div>
          <div className='flex flex-col text-center'>
            <p>Night</p>
            <p>{differenceInDays(checkOutData, checkInData)}</p>
          </div>
        </div>
        <h1 className='text-3xl mb-3'>{hotelData.hotelName}</h1>
        <div className='flex flex-col items-center justify-center '>
          <div className=' gap-3 p-4'>
            <img
              className='w-56 h-auto '
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

          <div className='bg-blue-100 mb-2 gap-3 p-5'>
            <img
              className='w-56 h-auto '
              src={`http://localhost:3002${selectedRoom?.roomImages} `}
              alt={hotelData.hotelName}
            />
            <div className='ml-1'>
              <p>
                <FontAwesomeIcon icon={faBed} className='mr-1' />
                {selectedRoom?.roomType}
              </p>
              <p>
                <FontAwesomeIcon icon={faPerson} className='mr-2 text-lg' />
                {hotelData.people} people
              </p>
              <p>{differenceInDays(checkOutData, checkInData)} night</p>
              <p>Total {selectedRoom.adjustedPrice} SEK</p>
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
            onClick={() => btn(selectedRoom)}
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
