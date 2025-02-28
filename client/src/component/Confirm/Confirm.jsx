import { useContext, useState } from 'react';

import { AuthContext } from '../../Context/AuthContext.jsx';
import { SearchContext } from '../../Context/SearchContext.jsx';

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
import { useLocation } from 'react-router-dom';
import BACKEND_URL from '../../config.js';
//import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
const Confirm = () => {
  const { user } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const location = useLocation();
  const { searchParams, selectedHotel } = useContext(SearchContext);
  const hotelData = { ...searchParams, ...selectedHotel };
  const checkInData = hotelData.checkIn ? new Date(hotelData.checkIn) : null;
  const checkOutData = hotelData.checkOut ? new Date(hotelData.checkOut) : null;
  const locationRoom = location.state?.selectedRoom;

  const handleSubmit = async () => {
    //*Since I use test mode, I don't need to use key.
    // const stripe = await new loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    // console.log(stripe);
    const body = {
      hotelData: hotelData,
      selectedRoom: locationRoom,
    };
    try {
      const response = await axios.post(
        `${BACKEND_URL}/create-checkout-session`,
        body
      );
      const session = await response.data;
      console.log(session);

      if (!setFirstName || !setEmail || !lastName) {
        return alert('Please fill in your information');
      }
      if (session.url) {
        window.location.href = session.url;
      } else {
        console.error('No session URL receive ');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

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

  if (!selectedHotel) {
    return <p>No room selected</p>;
  }
  return (
    <div className=' max-w-[1200px] m-auto '>
      <div className='flex flex-col mt-10 justify-center items-center xl:flex-row gap-5'>
        <div className='flex flex-col justify-center items-center m-2 border-2 rounded md:w-[650px] lg:w-[800px] xl:m-0 xl:h-[600px] leading-5'>
          <div className='flex justify-center items-center m-3 border-3 rounded p-1'>
            <div className=' flex text-center'>
              <p className='sm:mr-3 md:text-lg'>
                <FontAwesomeIcon icon={faCalendarDays} className='mx-1 mt-1' />
                Check In{' '}
                {checkInData ? checkInData?.toLocaleDateString() : 'null'}
              </p>
            </div>

            <FontAwesomeIcon icon={faArrowRight} className='mx-1' />
            <div className='flex text-center'>
              <p className='sm:mr-3 ml-3 md:text-lg'>
                <FontAwesomeIcon icon={faCalendarDays} className='mx-1 mt-1' />
                Check Out{' '}
                {checkOutData ? checkOutData?.toLocaleDateString() : 'null'}
              </p>
            </div>
            <div className='flex flex-col text-center sm:mx-3 md:text-lg '>
              <p>Night</p>
              <p>{differenceInDays(checkOutData, checkInData)}</p>
            </div>
          </div>
          <h1 className='text-3xl mb-1'>{hotelData.hotelName}</h1>
          <div className='flex flex-col items-center justify-center lg:flex-row lg:items-start'>
            <div className=' gap-3 p-4'>
              <img
                className='w-56  lg:w-[300px] lg:h-[250px] '
                src={`${BACKEND_URL}${hotelData.hotelImages} `}
                alt={hotelData.hotelName}
              />

              <div className='text-lg md:text-lg'>
                <p>
                  <FontAwesomeIcon icon={faLocationDot} className='mr-1 ' />
                  {hotelData.location}
                </p>
                <p className='border-2 rounded border-blue-800 p-1 mt-2 w-20  '>
                  <FontAwesomeIcon
                    icon={faStar}
                    className='mr-2 text-sm text-blue-800 md:text-lg'
                  />
                  {hotelData.rating}
                </p>
              </div>
            </div>

            <div className=' flex flex-col mb-5 justify-center bg-blue-100 gap-3 p-4 lg:mr-5'>
              <img
                className='w-56 h-auto lg:w-[300px]'
                src={`${BACKEND_URL}${locationRoom?.roomImages} `}
                alt={hotelData.hotelName}
              />
              <div className='ml-1'>
                <p className='lg:text-lg mb-1'>
                  <FontAwesomeIcon icon={faBed} className='mr-1 lg:text-lg' />
                  {locationRoom?.roomType}
                </p>
                <p className='lg:text-lg mb-1'>
                  <FontAwesomeIcon
                    icon={faPerson}
                    className='mr-2 text-lg lg:text-lg '
                  />
                  {hotelData.people} people
                </p>
                <p className='lg:text-lg mb-1'>
                  {differenceInDays(checkOutData, checkInData)} night
                </p>
                <p className='lg:text-xl mb-1'>
                  Total {locationRoom.adjustedPrice} SEK
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center border-2 rounded w-4/5 md:w-[650px] lg:w-[800px] xl:m-2 h-[600px] leading-10 mt-2'>
          <h1 className='m-2 text-2xl'>Who is the lead guest?</h1>
          <form className=' flex flex-col items-center mt-2 '>
            <input
              className='border-2 rounded my-4 lg:pr-8 pl-2'
              type='name'
              placeholder='First name *'
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className='border-2 rounded lg:pr-8 pl-2'
              type='name'
              placeholder='Last name * '
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              className='border-2 rounded my-4 lg:pr-8 pl-2'
              type='email'
              placeholder='Email *'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className='border-2 rounded lg:pr-8 pl-2 mb-5'
              type='number'
              placeholder='Phone number(optional)'
            />

            <label className='text-sm flex gap-2'>
              <input type='checkbox' value={user} onChange={checkboxInfo} />
              Same information as a user
            </label>

            <button
              onClick={handleSubmit}
              className='btn btn-primary px-4 py-1 m-2 text-sm drop-shadow-sm mt-4 lg:text-lg mb-5'
              type='button'
            >
              Next Step
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
