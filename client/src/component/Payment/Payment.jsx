import { useContext } from 'react';
import { SearchContext } from '../../Context/SearchContext';

const Payment = () => {
  const { searchParams, selectedHotel } = useContext(SearchContext);
  const hotelData = { ...searchParams, ...selectedHotel };
  console.log(hotelData);
  return (
    <div>
      <div>
        <h1>here is payment </h1>
      </div>
      <div></div>
    </div>
  );
};

export default Payment;
