import { useEffect, useState } from 'react';
import './Landing.css';

//*Select city

const Landing = () => {
  const [hotels, setHotels] = useState([]);
  const [location, setLocation] = useState('');
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
        console.log(data);
      } catch (error) {
        console.error('Error message:', error);
      }
    };
    fetchData();
  }, [location]);

  return (
    <div>
      <header className='header'>
        <div
          className='flex flex-col justify-center item-centers text-center p-3'
          style={{ backgroundColor: 'var(--second-color)' }}
        >
          <select
            id=''
            name='Select City'
            className='w-28 rounded text-sm'
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value=''>Select City</option>
            <option value='Malmö'>Malmö</option>
            <option value='Gothenburg'>Gothenburg</option>
            <option value='Stockholm'>Stockholm</option>
          </select>
        </div>
      </header>
      <div>
        {hotels.length > 0 ? (
          hotels.map((hotel, index) => (
            <div
              key={hotel._id}
              className='flex flex-col justify-center text-center  '
            >
              <div className=' hotel-container'>
                <img
                  className='w-full h-56'
                  key={index}
                  src={`http://localhost:3002${hotel.hotelImages}`}
                  alt={hotel.hotelName}
                />
                <div className='flex justify-between leading-7'>
                  <h2 className='text-xl'>{hotel.hotelName}</h2>
                  <p>{hotel.rating}</p>
                </div>
                <p>{hotel.location}</p>
                <p className=''>{hotel.price} kr</p>
                <p>{hotel.facilities.join(' , ')}</p>

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
