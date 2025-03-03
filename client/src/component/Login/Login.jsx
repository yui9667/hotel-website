import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { SearchContext } from '../../Context/SearchContext';
import axios from 'axios';
import BACKEND_URL from '../../config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { selectedHotel } = useContext(SearchContext);
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const loginUser = async (email, password) => {
    try {
      console.log(email, password);
      const response = await axios.post(`${BACKEND_URL}/user/login`, {
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
        window.sessionStorage.setItem('token', response.data.token);
        window.sessionStorage.setItem(
          'userLocalStorage',
          JSON.stringify(response.data.user)
        );
        // navigate('/', {
        //   state: { user: response.data.user, token: response.data.token },
        // });
      }
    } catch (error) {
      console.log(error.message);
      setError('Login failed. Try again ');
    }
  };
  useEffect(() => {
    const storedUser = window.sessionStorage.getItem('userLocalStorage');
    const storedToken = window.sessionStorage.getItem('token');
    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-3xl my-3 md:font-semibold'>Login</h1>
      {error && <p className='text-red-500'>{error}</p>}
      <form
        onSubmit={handleLogin}
        className='border-3 border-blue-700 rounded flex flex-col items-center p-4 '
      >
        <div className='items-center flex flex-col md:flex-row '>
          <img
            src='/animeImages/Login-bro.svg'
            alt='Login image'
            className='w-60 md:w-96'
          />

          <div>
            <h5 className='md:text-lg'>Email: </h5>
            <input
              className='border-2 my-2 text-start md:py-1 px-3'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <h5 className='md:text-lg'>Password: </h5>
            <input
              className='border-2 text-start md:py-1 px-3'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          type='submit'
          className='btn btn-primary px-4 py-1 m-3 text-sm drop-shadow-sm md:text-lg col-5 '
        >
          Log In
        </button>

        <Link to='/register'>
          {' '}
          <p className='text-sm md:text-base'>
            Create an{' '}
            <strong className='text-green-600 text-sm md:text-base'>
              account
            </strong>
          </p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
