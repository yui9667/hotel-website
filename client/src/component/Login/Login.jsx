import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-3xl my-3 md:font-semibold'>Login</h1>

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
