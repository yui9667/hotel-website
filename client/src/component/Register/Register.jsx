import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => {
    navigate('/login');
    setIsModal(false);
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3002/user/register', {
        firstName,
        lastName,
        email,
        password,
      });
      console.log('Registration successfully', response);
      console.log('information3', response.data.user);
      console.log('information3', response.data.user.firstName);
      console.log('information3', response.data.user.lastName);
      setIsModal(true);
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
            <h5 className='mr-2'>First name: </h5>
            <input
              className='border-2'
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className='flex items-center mb-4'>
            <h5 className='mr-2'>Last name</h5>
            <input
              className='border-2'
              type='text'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
      {isModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
          <div className='bg-white p-6 rounded shadow-md'>
            <div className='flex flex-col justify-center items-center my-5 '>
              <div className='flex flex-col '>
                <h1 className='text-2xl'>Thank you for Registration</h1>
                <img
                  src='/animeImages/HappyEarth.svg'
                  alt='Happy Earth anime holding heart with smile'
                  style={{ width: '100%', maxWidth: '250px' }}
                />
                <button
                  type='button'
                  onClick={closeModal}
                  className='btn btn-primary px-3 py-1 my-2 w-32 m-auto text-sm drop-shadow-sm'
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
