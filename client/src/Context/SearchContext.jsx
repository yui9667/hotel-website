import { createContext, useState, useEffect } from 'react';

const SearchContext = createContext();

//*Used localStorage for each searchParams and selectedHotel
const SearchProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState(() => {
    if (typeof window === 'undefined') return {};
    const savedData = window.sessionStorage.getItem('hotelStorageData');
    const parsedData = savedData ? JSON.parse(savedData).searchParams : {};
    console.log('searchParams:', savedData);
    return {
      ...parsedData,
      checkIn: parsedData?.checkIn ? new Date(parsedData.checkIn) : null,
      checkOut: parsedData?.checkOut ? new Date(parsedData.checkOut) : null,
    };
  });
  const [selectedHotel, setSelectedHotel] = useState(() => {
    const savedData = window.sessionStorage.getItem('hotelStorageData');
    return savedData ? JSON.parse(savedData) : {};
  });

  const [selectedRoom, setSelectedRoom] = useState(() => {
    const savedData = window.sessionStorage.getItem('hotelStorageData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      return parsedData.selectedHotel?.rooms || [];
    }
    return [];
  });
  console.log(selectedRoom);
  useEffect(() => {
    console.log(searchParams);
    console.log(selectedHotel);
    window.sessionStorage.setItem(
      'hotelStorageData',
      JSON.stringify({ searchParams, selectedHotel, selectedRoom })
    );
  }, [searchParams, selectedHotel, selectedRoom]);
  return (
    <SearchContext.Provider
      value={{
        searchParams,
        setSearchParams,
        selectedHotel,
        setSelectedHotel,
        selectedRoom,
        setSelectedRoom,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export { SearchContext, SearchProvider };
