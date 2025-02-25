import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SearchContext } from './SearchContext';

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const { setSelectedHotel, selectedHotel } = useContext(SearchContext);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const loginUser = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3002/user/login', {
        email,
        password,
      });
      if (response.status === 200) {
        setUser(response.data.user);
        setToken(response.data.token);
        console.log(response.data.user);
        if (selectedHotel) {
          window.sessionStorage.setItem(
            'hotelStorageData',
            JSON.stringify(selectedHotel)
          );
        }
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.setItem(
          'userLocalStorage',
          JSON.stringify(response.data.user)
        );
        navigate('/hotel/room');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const logOutUser = () => {
    setUser(null);
    setToken(null);
    setSelectedHotel(null);
    //*Removed data as keys
    window.localStorage.removeItem('userLocalStorage');
    window.localStorage.removeItem('token');
    window.sessionStorage.removeItem('hotelStorageData');
    navigate('/');
  };
  useEffect(() => {
    const storedUser = window.localStorage.getItem('userLocalStorage');
    const storedToken = window.localStorage.getItem('token');
    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ logOutUser, loginUser, user, token }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
