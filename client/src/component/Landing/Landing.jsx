import { useContext, useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { useNavigate } from 'react-router-dom';
import './Landing.css';
import { SearchContext } from '../../Context/SearchContext.jsx';
import { motion } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';
import BACKEND_URL from '../../config.js';
const Landing = () => {
  const [hotels, setHotels] = useState([]);
  const [resetLanding, setResetLanding] = useState([]);
  const { setSelectedHotel } = useContext(SearchContext);
  const navigate = useNavigate();

  //*this is for showing data from server side
  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://hotel-website-1-r5kh.onrender.com/api/hotels';

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setHotels(data);
        console.log(data);
      } catch (error) {
        console.error('Error message:', error);
      }
    };
    fetchData();
  }, []);
  const displayFromSearchBar = resetLanding.length > 0 ? resetLanding : hotels;
  //console.log('resetLanding in LandingPage:', resetLanding);

  //* navigate room page

  const clickRoom = (rooms, hotel) => {
    if (resetLanding.length === 0) {
      alert(
        'Please fill all required fields: location, check-in, check-out, and number of people.'
      );
      return;
    } else {
      navigate('/hotel/room', { state: { selectedRoom: rooms } });
      setSelectedHotel(hotel);
    }
  };
  return (
    <div>
      <SearchBar setResetLanding={setResetLanding} />

      <div>
        <h1 className='text-2xl mb-20 '></h1>
        {displayFromSearchBar.length > 0 ? (
          displayFromSearchBar.map((hotel, index) => (
            <div
              key={hotel._id}
              className='flex flex-col justify-center text-center leading-5'
            >
              <motion.div
                className=' hotel-container'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 1 }}
              >
                <img
                  className='w-full h-56 object-cover md:h-80 w-96 xl:w-[600px]'
                  key={index}
                  src={`${BACKEND_URL}${hotel.hotelImages}`}
                  alt={hotel.hotelName}
                  loading='lazy'
                />
                <div className='flex flex-col text-center items-center'>
                  <p
                    className='border-2 border-indigo-500 text-base rounded-lg mt-3 p-1 ml-40 px-2 md:text-lg '
                    style={{ color: 'var( --main-color)' }}
                  >
                    <FontAwesomeIcon
                      icon={faStar}
                      className='pr-1 md:text-lg'
                    />
                    {hotel.rating}
                  </p>
                  <div className='flex justify-between '>
                    <h2 className='text-xl mt-3 md:text-2xl '>
                      {hotel.hotelName}
                    </h2>
                  </div>
                  <p className='my-2 md:text-xl'>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className='pr-1 text-green-800 md:text-xl'
                    />
                    {hotel.location}
                  </p>
                  <p className='text-rose-700 md:text-2xl'>{hotel.price} kr</p>

                  <button
                    onClick={() => clickRoom(hotel)}
                    type='button'
                    className='btn btn-primary px-4 py-1 m-2 text-sm drop-shadow-lg  md:text-lg  '
                  >
                    Select
                  </button>
                </div>
              </motion.div>
            </div>
          ))
        ) : (
          <div className='text-center p-3'>
            <p className=' border-2 w-50 py-5 m-auto border-blue-800 rounded text-xl'>
              No hotels found. Please search hotels!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
