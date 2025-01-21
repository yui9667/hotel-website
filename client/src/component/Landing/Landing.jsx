import { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import './Landing.css';

const Landing = () => {
  const [hotels, setHotels] = useState([]);
  // const [location, setLocation] = useState('');

  //*this is for showing data from server side
  useEffect(() => {
    const fetchData = async () => {
      const url = location
        ? `http://localhost:3002/api/hotel/location/${location}`
        : 'http://localhost:3002/api/hotels';

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setHotels(data);
        // console.log(data);
      } catch (error) {
        console.error('Error message:', error);
      }
    };
    fetchData();
  }, [location]);

  return (
    <div>
      <SearchBar />
      <div>
        <h1
          className='text-2xl mb-20 '
          // onChange={(e) => setLocation(e.target.value)}
        ></h1>
        {hotels.length > 0 ? (
          hotels.map((hotel, index) => (
            <div
              key={hotel._id}
              className='flex flex-col justify-center text-center leading-5'
            >
              <div className=' hotel-container'>
                <img
                  className='w-full h-56'
                  key={index}
                  src={`http://localhost:3002${hotel.hotelImages}`}
                  alt={hotel.hotelName}
                />
                <div className='flex justify-between '>
                  <h2 className='text-xl mt-3 '>{hotel.hotelName}</h2>
                  <p
                    className='border-2 border-indigo-500 rounded-lg mt-3 p-1 px-2'
                    style={{ color: 'var( --main-color)' }}
                  >
                    {hotel.rating}
                  </p>
                </div>
                <p className='my-2'>{hotel.location}</p>
                <p className='text-rose-700'>{hotel.price} kr</p>
                {/* <p className='border-2 border-black '>
                  {' '}
                  facilities:{hotel.facilities.join(' , ')}
                </p> */}

                <button
                  type='button'
                  className='btn btn-primary px-4 py-1 m-2 text-sm drop-shadow-lg'
                >
                  Price
                </button>
                {/* <div>
                  {hotel.rooms.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${hotel.hotelName} ${index + 1}`}
                    />
                  ))}
                </div> */}
              </div>
            </div>
          ))
        ) : (
          <p>No hotels</p>
        )}
      </div>
    </div>
  );
};

export default Landing;
