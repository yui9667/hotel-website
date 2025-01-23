import { useContext } from 'react';
import { SearchContext } from '../../SearchContext';

const Room = () => {
  const { searchParams, selectedHotel } = useContext(SearchContext);
  if (!selectedHotel) {
    return <div>No hotels selected</div>;
  }
  return (
    <div>
      <div>
        {selectedHotel.rooms.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${selectedHotel.hotelName} ${index + 1}`}
          />
        ))}
      </div>
      <h1>{selectedHotel.hotelName}</h1>

      <p>{selectedHotel.location}</p>
      <p>{selectedHotel.checkIn}</p>
      <p>{selectedHotel.checkOut}</p>
      <p>{searchParams.people}</p>
    </div>
  );
};

export default Room;
