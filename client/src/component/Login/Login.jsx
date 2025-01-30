import axios from 'axios';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/user/login', {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      setIsAuthenticated(true);
      console.log('Login successfully', response);
      alert('login successfully!');
      navigate('/confirm');
    } catch (error) {
      alert('Login failed. Please try again.');
      console.error(error.message);
    }
  };
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-3xl my-3'>Login</h1>

      <form
        onSubmit={handleLogin}
        className='border-3 border-blue-700 rounded flex flex-col items-center p-4'
      >
        <div>
          <img
            src='/animeImages/Login-bro.svg'
            alt='Login image'
            style={{ maxWidth: '100%', width: '250px', maxHeight: '100%' }}
          />
        </div>
        <div className='items-end flex flex-col'>
          <div className='flex flex-row items-center gap-2'>
            <h5>Email: </h5>
            <input
              className='border-2 my-2 text-start'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='flex flex-row items-center gap-2'>
            <h5>Password: </h5>
            <input
              className='border-2 text-start'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          type='submit'
          className='btn btn-primary px-4 py-1 m-3 text-sm drop-shadow-sm '
        >
          Log In
        </button>

        <Link to='/register'>
          {' '}
          <p className='text-sm'>Create an account</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
