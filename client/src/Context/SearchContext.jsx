import { createContext, useState, useEffect } from 'react';

const SearchContext = createContext();

//*Used localStorage for each searchParams and selectedHotel
const SearchProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState(() => {
    if (typeof window === 'undefined') return {};
    const savedData = window.localStorage.getItem('hotelStorageData');
    const parsedData = savedData ? JSON.parse(savedData).searchParams : {};
    console.log('searchParams:', savedData);
    return {
      ...parsedData,
      checkIn: parsedData.checkIn ? new Date(parsedData.checkIn) : null,
      checkOut: parsedData.checkOut ? new Date(parsedData.checkOut) : null,
    };
  });
  const [selectedHotel, setSelectedHotel] = useState(() => {
    const savedData = window.localStorage.getItem('hotelStorageData');
    return savedData ? JSON.parse(savedData).selectedHotel : {};
  });

  // const [selectedRoom, setSelectedRoom] = useState(() => {
  //   const savedData = window.localStorage.getItem('hotelStorageData');
  //   return savedData ? JSON.parse(savedData).selectedHotel : {};

  // });

  useEffect(() => {
    console.log(searchParams);
    console.log(selectedHotel);
    window.localStorage.setItem(
      'hotelStorageData',
      JSON.stringify({ searchParams, selectedHotel })
    );
  }, [searchParams, selectedHotel]);
  return (
    <SearchContext.Provider
      value={{
        searchParams,
        setSearchParams,
        selectedHotel,
        setSelectedHotel,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export { SearchContext, SearchProvider };
