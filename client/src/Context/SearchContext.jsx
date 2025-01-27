import { createContext, useState } from 'react';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({});
  const [selectedHotel, setSelectedHotel] = useState(null);
  return (
    <SearchContext.Provider
      value={{ searchParams, setSearchParams, selectedHotel, setSelectedHotel }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export { SearchContext, SearchProvider };
