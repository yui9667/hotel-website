import { useEffect, useState } from 'react';
import './Landing.css';
const Landing = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/hotels');
        if (!response.ok) {
          throw new Error('Failed tp fetch data');
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
  return (
    <div>
      <h1>Hotel Listings </h1>
      <div>
        {hotels.length > 0 ? (
          hotels.map((hotel, index) => (
            <div
              key={hotel._id}
              className='flex flex-col justify-center text-center  '
            >
              <div className=' hotel-container'>
                <img
                  className='w-full h-full'
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
