import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
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
        window.sessionStorage.setItem('Token :', response.data.token);
        window.sessionStorage.setItem(
          'userLocalStorage',
          JSON.stringify(response.data.user)
        );
        navigate('/confirm');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const logOutUser = () => {
    setUser(null);
    setToken(null);
    //*Removed data as keys
    window.sessionStorage.removeItem('userLocalStorage');
    window.sessionStorage.removeItem('token');
    navigate('/');
  };
  useEffect(() => {
    const storedUser = window.sessionStorage.getItem('userLocalStorage');
    const storedToken = window.sessionStorage.getItem('token');
    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  });
  return (
    <AuthContext.Provider value={{ logOutUser, loginUser, user, token }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
