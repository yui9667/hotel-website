import { useState } from 'react';
import axios from 'axios';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3002/user/register', {
        username: name,
        email,
        password,
      });
      console.log('Registration successfully', response);
      alert('Registration successfully!');
    } catch (error) {
      console.error(error.message);
      alert(
        error.response?.data?.message ||
          'Registration failed. Please try again!'
      );
    }
  };
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='my-3 text-2xl'>Register</h1>
      <form
        onSubmit={handleRegister}
        className='flex flex-col border-2 border-blue-700 p-3 m-2'
      >
        <div
          className='flex flex-col items-end
        my-2'
        >
          <div className='flex items-center my-4'>
            <h5 className='mr-2'>Name: </h5>
            <input
              className='border-2'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='flex items-center'>
            <h5 className='mr-2'>Email: </h5>
            <input
              className='border-2 '
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='flex items-center my-4'>
            <div className='flex flex-col text-center'>
              <h5 className='mr-'>Password:</h5>

              <p className='text-sm mr-1 '> (6 Characters)</p>
            </div>
            <input
              className='border-2'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='flex items-center'>
            <h5 className='mr-2'>Confirm Password: </h5>
            <input
              className='border-2'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          type='submit'
          className='btn btn-primary px-3 py-1 my-2 w-32 m-auto text-sm drop-shadow-sm'
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
