import { createContext, useState, useEffect } from 'react';

const SearchContext = createContext();

//*Used localStorage for each searchParams and selectedHotel
const SearchProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState(() => {
    const savedData = window.localStorage.getItem('hotelStorageData');
    const parsedData = savedData ? JSON.parse(savedData).searchParams : {};

    return {
      ...parsedData,
      checkIn: parsedData.checkIn
        ? new Date(parsedData.checkIn).toISOString()
        : null,
      checkOut: parsedData.checkOut
        ? new Date(parsedData.checkOut).toISOString()
        : null,
    };
  });
  const [selectedHotel, setSelectedHotel] = useState(() => {
    const savedData = window.localStorage.getItem('hotelStorageData');
    return savedData ? JSON.parse(savedData).selectedHotel : null;
  });

  useEffect(() => {
    window.localStorage.setItem(
      'hotelStorageData',
      JSON.stringify({ searchParams, selectedHotel })
    );
  }, [searchParams, selectedHotel]);
  return (
    <SearchContext.Provider
      value={{ searchParams, setSearchParams, selectedHotel, setSelectedHotel }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export { SearchContext, SearchProvider };
