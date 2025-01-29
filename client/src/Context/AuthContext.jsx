import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  //* Uses lazy initialization. React will run this function to initialize the state only when the component first render
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    //* it is saved in the localStorage
    const savedData = window.localStorage.getItem('userStorageData');
    if (savedData) {
      try {
        //*Convert to JavaScript object
        const parsedData = JSON.parse(savedData);
        //*return false if isAuthenticated is undefined OR operator can also show all false, 0 and '' to false
        return parsedData.isAuthenticated || false;
      } catch (error) {
        console.error('Error parsing JSON from localStorage', error);
        return false;
      }
    }
    return false;
  });

  useEffect(() => {
    console.log('storage', isAuthenticated);
    window.localStorage.setItem(
      'userStorageData',
      JSON.stringify({ isAuthenticated })
    );
  }, [isAuthenticated]);
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
